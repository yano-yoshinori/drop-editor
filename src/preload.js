// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const fs = require('fs')
const { clipboard } = require('electron')

const backupDir = 'storage'

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  const ta = document.querySelector('textarea')

  // clipboard operation
  ta.addEventListener('keydown', (e) => {
    const { key, ctrlKey, metaKey } = e

    if (ctrlKey || metaKey) {
      let start = ta.selectionStart

      const left = ta.value.substring(0, start)
      const right = ta.value.substring(start)

      switch (key) {
        case 'c':
          clipboard.writeText(ta.value.substring(ta.selectionStart, ta.selectionEnd))
          break
        case 'v':
          const text = clipboard.readText()
          ta.value = `${left}${text}${right}`
          ta.selectionStart = start + text.length
          ta.selectionEnd = start + text.length
          break
      }
    }
  })
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
