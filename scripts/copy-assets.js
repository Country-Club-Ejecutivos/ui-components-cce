const fs = require('fs')
const path = require('path')

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to   = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

copyDir('src/assets', 'dist/assets')
copyDir('src/styles',  'dist/styles')
fs.copyFileSync('src/styles/tokens.css', 'dist/tokens.css')

console.log('Assets copiados a dist/')
