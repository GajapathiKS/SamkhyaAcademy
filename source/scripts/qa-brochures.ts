import { brochureCourses } from '@samkhya/catalog'
import { stat, readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
let failed = false
for (const course of brochureCourses) {
  const file = path.join(root, 'apps', 'web', 'public', 'brochures', `${course.slug}.pdf`)
  const info = await stat(file)
  const bytes = await readFile(file)
  const signature = bytes.subarray(0, 5).toString('ascii')
  const ok = signature === '%PDF-' && info.size > 15_000
  console.log(`${ok ? 'PASS' : 'FAIL'} ${course.slug}: ${info.size} bytes`)
  failed ||= !ok
}
if (failed) process.exitCode = 1
