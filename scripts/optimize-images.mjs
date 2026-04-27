#!/usr/bin/env node
/**
 * Converts all PNGs in public/images/ to WebP recursively.
 * Also generates responsive hero widths for full-bleed images.
 * Run: npm run optimize-images
 *
 * Skips files where a same-named .webp already exists (idempotent).
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const publicImagesDir = path.join(projectRoot, 'public', 'images')

const WEBP_QUALITY = 82
const MAX_WIDTH = 1920

// Hero images get 4-step responsive variants
const HERO_IMAGES = ['hero-image.png']
const HERO_WIDTHS = [400, 800, 1200, 1920]

// Project/service images get 2-step responsive variants (400w, 800w)
// Skips client logos (already small) and hero (handled above)
const RESPONSIVE_WIDTHS = [400, 800]
const RESPONSIVE_SKIP_DIRS = ['clients']

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.error('Install sharp: npm install --save-dev sharp')
  process.exit(1)
}

function getAllPngs(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...getAllPngs(full))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      results.push(full)
    }
  }
  return results
}

async function convertToWebP(inputPath) {
  const outPath = inputPath.replace(/\.png$/i, '.webp')
  if (fs.existsSync(outPath)) {
    const inStat = fs.statSync(inputPath)
    const outStat = fs.statSync(outPath)
    if (outStat.mtimeMs >= inStat.mtimeMs) return null // already up to date
  }
  await sharp(inputPath)
    .resize(MAX_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath)
  const inSize = fs.statSync(inputPath).size
  const outSize = fs.statSync(outPath).size
  return { outPath, inSize, outSize }
}

async function generateHeroVariants(inputPath) {
  const baseName = path.basename(inputPath, '.png')
  const dir = path.dirname(inputPath)
  for (const w of HERO_WIDTHS) {
    const outPath = path.join(dir, `${baseName}-${w}w.webp`)
    await sharp(inputPath)
      .resize(w, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath)
    const stat = fs.statSync(outPath)
    console.log(`  ${baseName}-${w}w.webp  ${(stat.size / 1024).toFixed(1)} KB`)
  }
}

async function generateResponsiveVariants(webpPath) {
  const dir = path.dirname(webpPath)
  const rel = path.relative(publicImagesDir, dir)
  const parts = rel.split(path.sep)
  if (RESPONSIVE_SKIP_DIRS.some((skip) => parts.includes(skip))) return
  const baseName = path.basename(webpPath, '.webp')
  if (baseName.match(/-\d+w$/)) return // already a responsive variant
  for (const w of RESPONSIVE_WIDTHS) {
    const outPath = path.join(dir, `${baseName}-${w}w.webp`)
    if (fs.existsSync(outPath)) {
      const inStat = fs.statSync(webpPath)
      const outStat = fs.statSync(outPath)
      if (outStat.mtimeMs >= inStat.mtimeMs) continue
    }
    await sharp(webpPath)
      .resize(w, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath)
  }
}

function getAllWebps(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...getAllWebps(full))
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.webp')) {
      results.push(full)
    }
  }
  return results
}

async function main() {
  const pngs = getAllPngs(publicImagesDir)
  console.log(`Found ${pngs.length} PNG files. Converting to WebP...\n`)

  let converted = 0
  let skipped = 0
  let savedBytes = 0

  for (const inputPath of pngs) {
    const rel = path.relative(publicImagesDir, inputPath)
    const result = await convertToWebP(inputPath)
    if (result === null) {
      skipped++
    } else {
      converted++
      savedBytes += result.inSize - result.outSize
      const pct = (((result.inSize - result.outSize) / result.inSize) * 100).toFixed(0)
      console.log(`  ✔ ${rel}  ${(result.inSize / 1024 / 1024).toFixed(1)}MB → ${(result.outSize / 1024 / 1024).toFixed(1)}MB  (-${pct}%)`)
    }
  }

  console.log(`\nConverted: ${converted}, Skipped (up to date): ${skipped}`)
  console.log(`Total saved: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`)

  // Generate hero responsive variants
  console.log('\nGenerating hero responsive variants...')
  for (const heroName of HERO_IMAGES) {
    const heroPath = path.join(publicImagesDir, heroName)
    if (fs.existsSync(heroPath)) {
      console.log(heroName)
      await generateHeroVariants(heroPath)
    }
  }

  // Generate 400w/800w responsive variants for all project/service WebPs
  console.log('\nGenerating responsive variants for project/service images...')
  const webps = getAllWebps(publicImagesDir)
  let responsiveCount = 0
  for (const webpPath of webps) {
    await generateResponsiveVariants(webpPath)
    responsiveCount++
  }
  console.log(`  Processed ${responsiveCount} WebP files.`)

  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
