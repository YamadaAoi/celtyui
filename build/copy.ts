import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { copy, pathExists } from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
/**
 * es目录
 */
const esDir = path.resolve(__dirname, '../es')
/**
 * packages目录
 */
const pkgDir = path.resolve(__dirname, '../packages')

async function copySource(type: string) {
  const source = path.resolve(pkgDir, type, 'es')
  const e1 = await pathExists(esDir)
  const e2 = await pathExists(source)
  if (e1 && e2) {
    const dest = path.resolve(esDir, type)
    await copy(source, dest)
  }
}

function main() {
  const types = ['vue', 'react']
  const promises = types.map(t => copySource(t))
  Promise.all(promises).catch(err => {
    console.error('copy failed!', err)
  })
}

main()
