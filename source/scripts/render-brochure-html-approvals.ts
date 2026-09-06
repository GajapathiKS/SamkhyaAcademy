import { chromium } from '@playwright/test'
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const htmlRoot = path.join(root, 'output', 'html-approval')
const renderRoot = path.join(root, 'output', 'approval-renders')
const ratio43 = new Set(['ai-engineering', 'fde-engineering', 'ai-leadership', 'entrepreneurship'])
const requested = process.argv.slice(2)
const slugs = requested.length ? requested : (await readdir(htmlRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name)

const browser = await chromium.launch({ headless: true })
try {
  for (const slug of slugs) {
    const viewport = ratio43.has(slug) ? { width: 1152, height: 864 } : { width: 1123, height: 794 }
    const page = await browser.newPage({ viewport })
    await page.goto(pathToFileURL(path.join(htmlRoot, slug, 'index.html')).href, { waitUntil: 'load' })
    const selector = await page.locator('.page').count() ? '.page' : '.sheet'
    const count = await page.locator(selector).count()
    const dir = path.join(renderRoot, slug)
    await mkdir(dir, { recursive: true })
    for (let index = 0; index < count; index += 1) {
      await page.locator(selector).nth(index).screenshot({ path: path.join(dir, `page-${String(index + 1).padStart(2, '0')}.png`) })
    }
    await page.close()
    console.log(`Rendered ${slug}: ${count} pages`)
  }
} finally {
  await browser.close()
}
