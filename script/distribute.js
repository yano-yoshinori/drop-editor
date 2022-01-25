const fs = require('fs')

function main() {
  if (process.argv.length !== 3) {
    console.error('invalid parameter')
    return
  }

  const dest = process.argv[2]

  if (!dest.endsWith('/app')) {
    console.error('invalid path')
    return
  }

  if (!fs.existsSync(`${dest}/src`)) {
    fs.mkdirSync(`${dest}/src`)
  }

  fs.copyFileSync('./package.json', `${dest}/package.json`)

  const files = fs.readdirSync('./src')

  files.forEach(function (file) {
    fs.copyFileSync(`./src/${file}`, `${dest}/${file}`)
    fs.copyFileSync(`./src/${file}`, `${dest}/src/${file}`)
  })
}

main()
