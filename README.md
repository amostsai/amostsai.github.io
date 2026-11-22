# amostsai.github.io

學創科技有限公司（metalearning）官網。

## 表單紅字原因（Chrome）
如果用 `mailto:` 直接送表單，瀏覽器可能顯示安全提示（紅字）。
這不是程式壞掉，而是瀏覽器提醒該提交方式不安全/不穩定。

## 改成送到 Discord（推薦做法）
GitHub Pages 是靜態站，不能安全地把 Discord Webhook 直接放前端。

### 架構
官網表單 → Cloudflare Worker（中繼）→ Discord Webhook

### 這個 repo 已包含
- 前端表單提交（`contact_us.html` + `static/site.js`）
- Worker 範本：`worker-discord-contact.js`

### 部署步驟（Cloudflare Worker）
1. 在 Discord 目標頻道建立 Webhook（可在**另一個伺服器**，只要 webhook 建在該頻道即可）
2. 建立 Worker，貼上 `worker-discord-contact.js`
3. 設定環境變數 `DISCORD_WEBHOOK_URL`（不要寫死在程式）
4. 部署後取得 URL，例如：
   - `https://metalearning-contact.example.workers.dev/contact`
5. 修改 `contact_us.html` 的 form 屬性：
   - `data-endpoint="你的 worker URL"`
6. commit + push

### 安全建議
- 加入 Turnstile/hCaptcha
- 針對 IP 做 rate limit
- 若可行，將 `Access-Control-Allow-Origin` 從 `*` 限制為你的網域

## 軟體隱私權政策

符合通用條件的產品可直接引用[通用軟體隱私權政策](https://www.metalearning.tw/privacy-policy.html)（`privacy-policy.html`）。適用條件：資料在本機處理，沒有自有帳號、後端收集使用者內容、雲端同步、付款、分析或廣告追蹤，且非以兒童為主要對象。上架前需確認實際功能、權限與第三方資料傳送符合政策；符合後再於產品或商店頁面明確連結。產品功能變更時需重新確認。

有不同資料處理需求的軟體使用獨立目錄：`apps/<軟體名稱>/privacy-policy.html`，目錄名稱使用小寫英文字母與連字號。

- GNimport：[隱私權政策](https://www.metalearning.tw/apps/gnimport/privacy-policy.html)

需要專屬政策時，建立對應目錄、放入該軟體的 `privacy-policy.html`，並更新此清單與 `sitemap.xml`。

## 公司產品清單

產品介紹集中在 `products.html`，桌面及手機版選單皆提供「公司產品」入口。新增產品時，在產品頁加入名稱、簡介、功能與官方安裝連結；符合通用條件的產品可引用根目錄的 `privacy-policy.html`，需要專屬政策者依 `apps/<軟體名稱>/privacy-policy.html` 獨立維護，並確認政策適用的平台。
