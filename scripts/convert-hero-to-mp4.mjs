#!/usr/bin/env node
/**
 * Converts public/videos/hero.MOV to public/videos/hero.mp4 for Chrome/Edge/Firefox.
 * Uses ffmpeg-static so no global ffmpeg install is required.
 * Run: npm run convert-hero-video
 */

import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const projectRoot = path.resolve(__dirname, '..')
const src = path.join(projectRoot, 'public/videos/hero.MOV')
const out = path.join(projectRoot, 'public/videos/hero.mp4')

const fs = await import('node:fs').then(m => m.default)
if (!fs.existsSync(src)) {
  console.error('Source not found:', src)
  process.exit(1)
}

let ffmpegPath
try {
  const ffmpegStatic = require('ffmpeg-static')
  ffmpegPath = typeof ffmpegStatic === 'string' ? ffmpegStatic : ffmpegStatic.path
} catch (e) {
  console.error('ffmpeg-static not found. Install with: npm install --save-dev ffmpeg-static')
  process.exit(1)
}

const args = [
  '-i', src,
  '-c:v', 'libx264',
  '-movflags', '+faststart',
  '-an',
  '-y',
  out
]

console.log('Converting hero.MOV to hero.mp4 (H.264) for Chrome...')
const proc = spawn(ffmpegPath, args, { stdio: 'inherit' })
proc.on('close', code => {
  if (code === 0) {
    console.log('Done:', out)
  } else {
    process.exit(code ?? 1)
  }
})
proc.on('error', err => {
  console.error(err)
  process.exit(1)
})
