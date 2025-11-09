const fs = require('fs')
const path = require('path')

const distFile = path.join(process.cwd(), 'dist', '404.html')
if (!fs.existsSync(distFile)) {
    console.error('dist/404.html not found — make sure you have run `vite build` first')
    process.exit(1)
}

// Read env var set during build/deploy
let base = process.env.VITE_FRONTEND_BASE_URL || '/'
if (base === './') base = ''
if (base !== '' && base.endsWith('/')) base = base.slice(0, -1)

let content = fs.readFileSync(distFile, 'utf8')
content = content.replace(/__BASE__/g, base)
fs.writeFileSync(distFile, content, 'utf8')
console.log('Updated dist/404.html with base:', base)

