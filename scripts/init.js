#!/usr/bin/env node
/**
 * @countryclub/ui init
 * Copies brand assets (logos, fonts) to the consuming project's public/ folder.
 * Run once after installing: node node_modules/@countryclub/ui/scripts/init.js
 */
const fs   = require('fs')
const path = require('path')

const pkgDir  = path.join(__dirname, '..')
const destDir = path.join(process.cwd(), 'public', 'countryclub')

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to   = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else {
      fs.copyFileSync(from, to)
      console.log(`  ✓ public/countryclub/${path.relative(dest, to).replace(/\\/g, '/')}... copied`)
    }
  }
}

console.log('\n@countryclub/ui — copying brand assets to public/countryclub/\n')
copyDir(path.join(pkgDir, 'dist', 'assets'), destDir)
console.log('\nDone. Add public/countryclub/ to .gitignore if preferred.\n')
