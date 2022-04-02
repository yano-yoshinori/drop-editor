// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require('fs')

const backupDir = 'storage'

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  if (fs.existsSync(`./${backupDir}/drop-editor.txt`)) {
    const text = fs.readFileSync(`./${backupDir}/drop-editor.txt`)
    const ta = document.querySelector('textarea')
    ta.value = text
  }
})

window.addEventListener('beforeunload', () => {
  const ta = document.getElementById('editor')
  window.localStorage.setItem('drop-editor', ta.value)

  // backup
  if (!fs.existsSync(`./${backupDir}`)) {
    fs.mkdirSync(`./${backupDir}`)
  }

  const now = new Date().toISOString()
  const [date] = now.split('T')
  fs.writeFileSync(`./${backupDir}/drop-editor-${date}.txt`, ta.value, { encoding: 'utf-8' })
})
