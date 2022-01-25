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

function handleDrop(e) {
  e.preventDefault()

  const { dataTransfer } = e
  const text = dataTransfer.getData('text/plain')
  const value = `${ta.value}\n${text}\n\n`

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
}

function disableOpacity() {
  ta.style.setProperty('opacity', '1.0')
}

function enableOpacity() {
  ta.style.setProperty('opacity', '0.4')
}

function handleKeyDown(e) {
  const { key, ctrlKey } = e

  // input date
  if (ctrlKey) {
    let start = ta.selectionStart

    const left = ta.value.substring(0, start)
    const right = ta.value.substring(start)

    if (key === 'd') {
      const now = utils.currentDateTime()
      ta.value = `${left}${now}\n${right}`
      start += now.length + 1
    } else if (key === 'h') {
      const bar = '---'
      ta.value = `${left}${bar}\n${right}`
      start += bar.length + 1
    }

    ta.selectionStart = start
    ta.selectionEnd = start
  }
}

ta.addEventListener('drop', handleDrop)

ta.addEventListener('dragenter', disableOpacity)
ta.addEventListener('mouseenter', disableOpacity)

ta.addEventListener('dragleave', enableOpacity)
ta.addEventListener('mouseleave', enableOpacity)

ta.addEventListener('keydown', handleKeyDown)
