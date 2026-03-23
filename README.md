## 1. Google Sheets & GAS Setup

1.  **Create a New Spreadsheet**: Name it (e.g., `Workshop Reservations`).
2.  **Open Script Editor**: Extensions > Apps Script.
3.  **Copy Code**: Copy the contents of `backend/Code.gs` into the editor.
4.  **One-Click Setup**:
    -   Apps Scriptエディタで **`initConfig`** を選択して実行。
    -   スプレッドシートに戻り、新しくできた **「Config」** シートを編集（日付やApiKeyなど）。
    -   エディタに戻り、 **`autoSetup`** を選択して実行。これだけで全日程のシートが自動生成されます。
5.  **Deploy as Web App**:
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
