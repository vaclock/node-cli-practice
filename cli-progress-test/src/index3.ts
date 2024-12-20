import https from "node:https"
import fs from "node:fs"
import ProgressBar from "./ProgressBar.js"

const downloadUrl = {
  darwin: 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip',
}
let value = 0
https.get(downloadUrl.darwin, (response) => {
  const file = fs.createWriteStream('./chromium.zip');
  response.pipe(file);
  const total = parseInt(response.headers['content-length']!)
  const bar = new ProgressBar()
  bar.start(total, value)
  response.on('data', (chunk) => {
    value += chunk.length
    bar.update(value)
    if (value >= total) {
      bar.stop()
    }
  })
})