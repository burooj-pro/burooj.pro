#!/usr/bin/env node
/**
 * Generates WebP versions and responsive widths for hero/section images.
 * Run: npm run optimize-images
 *
 * Outputs:
 *   public/images/hero-image-400w.webp, hero-image-800w.webp, hero-image-1200w.webp, hero-image-1920w.webp
 *   (and optionally other configured images)
 *
 * Targets: hero ~250–500 KB, section images ~100–250 KB (via quality + widths).
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const publicDir = path.join(projectRoot, 'public', 'images')

// Hero/CTA full-bleed: multiple widths, quality for ~250–500 KB at 1920w
const HERO_WIDTHS = [400, 800, 1200, 1920]
const HERO_WEBP_QUALITY = 82

// Section images (e.g. about, project cards): smaller max width
const SECTION_WIDTHS = [400, 800]
const SECTION_WEBP_QUALITY = 80

const PRESETS = [
  {
    name: 'hero-image',
    widths: HERO_WIDTHS,
    quality: HERO_WEBP_QUALITY,
    description: 'Hero/CTA full-bleed',
  },
  // Add more entries as needed, e.g. about1.png, about2.png
]

async function optimizeImage(preset, ext = '.png') {
  const baseName = preset.name.replace(/\.[^.]+$/, '')
  const inputPath = path.join(publicDir, baseName + ext)
  if (!fs.existsSync(inputPath)) {
    console.warn('Skip (not found):', inputPath)
    return
  }

  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch (e) {
    console.error('Install sharp: npm install --save-dev sharp')
    process.exit(1)
  }

  const { widths, quality } = preset
  for (const w of widths) {
    const outName = `${baseName}-${w}w.webp`
    const outPath = path.join(publicDir, outName)
    await sharp(inputPath)
      .resize(w, null, { withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath)
    const stat = fs.statSync(outPath)
    console.log('  ', outName, `${(stat.size / 1024).toFixed(1)} KB`)
  }
}

async function main() {
  console.log('Optimizing images to WebP (responsive widths)...\n')
  for (const preset of PRESETS) {
    console.log(preset.name)
    await optimizeImage(preset)
    console.log('')
  }
  console.log('Done. Use <picture> + srcset in templates for these images.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
