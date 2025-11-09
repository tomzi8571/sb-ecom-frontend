const fs = require('fs')
const path = require('path')

const distDir = path.join(process.cwd(), 'dist')
const indexFile = path.join(distDir, 'index.html')
const fourOhFourFile = path.join(distDir, '404.html')

if (!fs.existsSync(indexFile)) {
  console.error('dist/index.html not found — make sure you have run `vite build` first')
  process.exit(1)
}

try {
  // Copy index.html -> 404.html so GH Pages will serve the SPA for unknown paths
  fs.copyFileSync(indexFile, fourOhFourFile)
  console.log('Copied dist/index.html -> dist/404.html')
} catch (err) {
  console.error('Failed to copy index.html -> 404.html', err)
  process.exit(1)
}
