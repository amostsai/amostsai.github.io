# amostsai.github.io

學創科技有限公司（metalearning）官網。

## 聯絡表單為什麼會顯示紅字？
在瀏覽器中使用 `mailto:` 表單（且網頁不是 HTTPS 或無法判定安全性）時，Chrome 可能顯示：
`This form is not secure. Autofill has been turned off.`

這是瀏覽器的安全提示，不是程式錯誤。

## 想把聯絡表單送到 Discord 頻道（建議做法）
GitHub Pages 是靜態網站，**不應直接把 Discord Webhook URL 寫在前端**（會外洩被濫用）。

建議流程：
1. 建立一個中繼 API（Cloudflare Worker / Vercel Function / Netlify Function）
2. Webhook URL 放在中繼 API 的環境變數
3. 網站表單送到中繼 API，再由 API 發到 Discord 頻道

可選加強：
- hCaptcha / Cloudflare Turnstile 防垃圾訊息
- Rate limit（同 IP 限速）
- 欄位長度限制與關鍵字過濾

如果需要，我可以下一版直接幫你把前端改成 `fetch('/api/contact')` 的格式，並附上 Cloudflare Worker 可直接部署的範本。
