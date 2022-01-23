// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const ta = document.querySelector("textarea");
ta.style.height = `${window.innerHeight}px`;
ta.focus();

ta.addEventListener("drop", function (e) {
  e.preventDefault();

  ta.focus();

  const { dataTransfer } = e;
  const text = dataTransfer.getData("text/plain");
  ta.value = ta.value + text + "\n\n";

  const len = ta.value.length;

  ta.selectionStart = 0;
  ta.selectionEnd = 0;

  setTimeout(function () {
    // タイマー使わないと反映されない
    ta.selectionStart = len;
    ta.selectionEnd = len;
  });
});
