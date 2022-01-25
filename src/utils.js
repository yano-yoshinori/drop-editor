function currentDateTime() {
  const now = new Date()

  const month = String(now.getMonth() + 1)
  const day = String(now.getDate()).padStart(2, '0')
  const hour = String(now.getHours()).padStart(2, '0')
  const minute = String(now.getMinutes()).padStart(2, '0')

  return `${month}/${day} ${hour}:${minute}`
}

utils = {
  currentDateTime,
}
