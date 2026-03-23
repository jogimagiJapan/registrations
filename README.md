# Workshop Reservation System Setup Guide

## 1. Google Sheets & GAS Setup

1.  **Create a New Spreadsheet**: Name it (e.g., `Workshop Reservations`).
2.  **Create "Config" Sheet**: Add the following headers and values in column A and B:
    -   `ApiKey`: your-secret-key
    -   `EventName`: ワークショップ 2024
    -   `Dates`: 2024-04-20, 2024-04-21
    -   `AdminEmail`: admin@example.com
    -   `EmailTemplateUser`: {{name}}様、予約ありがとうございます...
    -   `NoticeText`: 当日は開始10分前にお越しください...
    -   `RewardText`: 参加者にはオリジナルステッカーをプレゼント！
    -   `InstagramUrl`: https://instagram.com/...
    -   `HPUrl`: https://example.com
3.  **Open Script Editor**: Extensions > Apps Script.
4.  **Copy Code**: Copy the contents of `backend/Code.gs` into the editor.
5.  **Initialize Event Sheets**:
    -   In the Apps Script editor, run the `initEventSheet("2024-04-20")` function manually to create the sheet for that date.
6.  **Deploy as Web App**:
    -   Deploy > New Deployment > Web App.
    -   Execute as: `Me`.
    -   Who has access: `Anyone`.
    -   Copy the **Web App URL**.

## 2. Next.js Frontend Setup

1.  **Environment Variables**:
    -   Update `.env.local` with your `GAS_API_URL` (the Web App URL) and `GAS_API_KEY`.
2.  **Installation**:
    ```bash
    npm install
    ```
3.  **Development**:
    ```bash
    npm run dev
    ```
4.  **Deployment**:
    -   Push to GitHub and connect to Vercel.
    -   **CRITICAL**: Set the Environment Variable `TZ=Asia/Tokyo` in the Vercel dashboard.

## Verification Checklist
- [ ] **1名予約**: スロットが1つ（20分）埋まることを確認。
- [ ] **3名予約**: 1時間分（3スロット）すべてが埋まることを確認。
- [ ] **当日枠表示**: 1枠でも埋まった時間が「当日枠あり」と表示されるか確認。
- [ ] **排他制御**: 同一スロットへの同時POSTでエラー（トースト）が出るか確認。
