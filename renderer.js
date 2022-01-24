// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const { localStorage } = window

const ta = document.querySelector('textarea')
ta.style.height = `${window.innerHeight}px`
ta.focus()

ta.value = localStorage.getItem('drop-editor')
ta.style.setProperty('opacity', '0.4')

ta.addEventListener('drop', function (e) {
  e.preventDefault()

  const { dataTransfer } = e
  const text = dataTransfer.getData('text/plain')
  const value = `${ta.value}\n${currentDateTime()}\n${text}\n\n`

  ta.value = value
  localStorage.setItem('drop-editor', value)

  setTimeout(function () {
    // タイマー使わないと反映されない
    const len = ta.value.length
    ta.selectionStart = len
    ta.selectionEnd = len
  })

  ta.scroll({
    top: ta.scrollHeight,
  })
})

function disableOpacity() {
  ta.style.setProperty('opacity', '1.0')
}

function enableOpacity() {
  ta.style.setProperty('opacity', '0.4')
}

ta.addEventListener('dragenter', disableOpacity)
ta.addEventListener('mouseenter', disableOpacity)

ta.addEventListener('dragleave', enableOpacity)
ta.addEventListener('mouseleave', enableOpacity)

function currentDateTime() {
  const now = new Date()

  const month = String(now.getMonth() + 1)
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')

  return `${month}/${day} ${hour}:${minute}`
}
