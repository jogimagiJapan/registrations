/**
 * Workshop Reservation System Backend (GAS)
 * Timezone: Asia/Tokyo
 */

const CONFIG_SHEET_NAME = "Config";
const TIMEZONE = "Asia/Tokyo";
const SLOTS_PER_HOUR = 3;
const SLOT_MINUTES = 20;
const START_HOUR = 12;
const END_HOUR = 19;

/**
 * ONE-CLICK SETUP:
 * 1. Run initConfig() - Creates the Config sheet with default values.
 * 2. Edit Config sheet (Dates, ApiKey, etc.)
 * 3. Run autoSetup() - Automatically creates sheets for all dates listed in Config.
 */

function initConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (sheet) return "Config sheet already exists";
  
  sheet = ss.insertSheet(CONFIG_SHEET_NAME);
  const defaults = [
    ["Key", "Value"],
    ["ApiKey", "your-secret-key"],
    ["EventName", "ワークショップ 2024"],
    ["Dates", "2024-04-20, 2024-04-21"],
    ["AdminEmail", "admin@example.com"],
    ["EmailTemplateUser", "{{name}}様、予約ありがとうございます。\n日時：{{date}} {{time}}\n人数：{{people}}名\nアイテム：{{item}}"],
    ["NoticeText", "当日は開始10分前にお越しください。"],
    ["RewardText", "参加者にはオリジナルステッカーをプレゼント！"],
    ["InstagramUrl", "https://instagram.com/"],
    ["HPUrl", "https://example.com/"]
  ];
  sheet.getRange(1, 1, defaults.length, 2).setValues(defaults);
  sheet.getRange(1, 1, 1, 2).setBackground("#f3f3f3").setFontWeight("bold");
  return "Config sheet created. Please edit it and then run autoSetup().";
}

function autoSetup() {
  const config = getConfig();
  if (!config.Dates) return "No dates found in Config sheet.";
  
  const dates = config.Dates.split(",").map(d => d.trim());
  const results = [];
  
  dates.forEach(date => {
    const res = initEventSheet(date);
    results.push(res);
  });
  
  return results.join("\n");
}

/**
 * Endpoint for GET requests.
 * Query Parameters:
 * - apiKey: string
 * - action: "getSlots"
 * - date: "YYYY-MM-DD"
 */
function doGet(e) {
  try {
    const config = getConfig();
    const apiKey = e.parameter.apiKey || e.headers["x-api-key"];
    
    if (apiKey !== config.ApiKey) {
      return createResponse({ error: "Unauthorized" }, 403);
    }

    const action = e.parameter.action;
    if (action === "getSlots") {
      const date = e.parameter.date;
      if (!date) return createResponse({ error: "Missing date" }, 400);
      
      const slots = getHourlySlots(date);
      return createResponse({ slots, config });
    }

    return createResponse({ error: "Invalid action" }, 400);
  } catch (err) {
    return createResponse({ error: err.toString() }, 500);
  }
}

/**
 * Endpoint for POST requests.
 * Body: { apiKey, date, time, name, email, peopleCount, item }
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // 10 seconds timeout
    
    const data = JSON.parse(e.postData.contents);
    const config = getConfig();
    
    if (data.apiKey !== config.ApiKey) {
      return createResponse({ error: "Unauthorized" }, 403);
    }

    const result = reserveSlots(data);
    if (result.success) {
      sendConfirmationEmails(data, config);
      return createResponse({ success: true, message: "Reservation confirmed" });
    } else {
      return createResponse({ error: result.error }, 409);
    }
  } catch (err) {
    return createResponse({ error: err.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Initialize a new event sheet.
 * @param {string} dateStr - In "YYYY-MM-DD" format.
 */
function initEventSheet(dateStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(dateStr);
  if (sheet) {
    // Optionally clear or handle existing sheet
    return "Sheet already exists";
  }
  
  sheet = ss.insertSheet(dateStr);
  sheet.appendRow(["Time", "Status", "Name", "Email", "People", "Item", "Timestamp"]);
  
  // Generate slots from 12:00 to 18:40 (19:00 is the end of the last slot)
  for (let h = START_HOUR; h < END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      sheet.appendRow([timeStr, "Available", "", "", "", "", ""]);
    }
  }
  
  // Formatting
  sheet.getRange(1, 1, 1, 7).setBackground("#f3f3f3").setFontWeight("bold");
  sheet.setFrozenRows(1);
  return `Sheet ${dateStr} created successfully`;
}

/**
 * Read Config sheet.
 */
function getConfig() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (!sheet) throw new Error("Config sheet not found");
  
  const data = sheet.getDataRange().getValues();
  const config = {};
  for (let i = 1; i < data.length; i++) {
    const key = data[i][0];
    const value = data[i][1];
    if (key) config[key] = value;
  }
  return config;
}

/**
 * Get hourly availability.
 * Requirement: 1 hour = 3 slots. If ANY slot is filled, hour is unavailable.
 */
function getHourlySlots(dateStr) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(dateStr);
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  // Time, Status, Name...
  // Skip header
  const rows = data.slice(1);
  const hourlySlots = [];
  
  for (let i = 0; i < rows.length; i += SLOTS_PER_HOUR) {
    const hourData = rows.slice(i, i + SLOTS_PER_HOUR);
    if (hourData.length === 0) break;
    
    const time = hourData[0][0]; // Initial slot time (e.g. 12:00)
    // Check if ALL 3 slots are "Available"
    const isAvailable = hourData.every(row => row[1] === "Available");
    
    hourlySlots.push({
      time: time,
      available: isAvailable
    });
  }
  
  return hourlySlots;
}

/**
 * Reserve slots.
 */
function reserveSlots(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(data.date);
  if (!sheet) return { success: false, error: "Date not found" };
  
  const values = sheet.getDataRange().getValues();
  const rows = values.slice(1);
  
  // Find index of the starting slot
  const startIndex = rows.findIndex(row => row[0] === data.time);
  if (startIndex === -1) return { success: false, error: "Invalid time slot" };
  
  // Check if requested slots are available
  const peopleCount = parseInt(data.peopleCount);
  const slotsNeeded = peopleCount; // 1 person = 1 slot, 2 = 2, 3 = 3
  
  // Verify availability
  for (let i = 0; i < slotsNeeded; i++) {
    const rowIndex = startIndex + i;
    if (rowIndex >= rows.length || rows[rowIndex][1] !== "Available") {
      return { success: false, error: "Slot already taken" };
    }
  }
  
  // Perform reservation
  const timestamp = new Date();
  for (let i = 0; i < slotsNeeded; i++) {
    const sheetRowIndex = startIndex + i + 2; // +1 for header, +1 for 1-based index
    sheet.getRange(sheetRowIndex, 2, 1, 6).setValues([[
      "Reserved",
      data.name,
      data.email,
      data.peopleCount,
      data.item,
      timestamp
    ]]);
  }
  
  return { success: true };
}

/**
 * Send emails.
 */
function sendConfirmationEmails(data, config) {
  const userBody = config.EmailTemplateUser
    .replace("{{name}}", data.name)
    .replace("{{date}}", data.date)
    .replace("{{time}}", data.time)
    .replace("{{people}}", data.peopleCount)
    .replace("{{item}}", data.item);
    
  MailApp.sendEmail({
    to: data.email,
    bcc: config.AdminEmail,
    subject: `【予約確定】${config.EventName}`,
    body: userBody
  });
}

function createResponse(data, status = 200) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
