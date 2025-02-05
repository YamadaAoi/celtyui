#!/usr/bin/env node
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Command } from 'commander'
import prompts from 'prompts'
import { z } from 'zod'
import { readJson, copy, pathExists } from 'fs-extra'
import { ComponentInfo, log } from './util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compDir = path.resolve(__dirname, '../components')
const compJson = path.resolve(__dirname, '../components.json')
const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
  overwrite: z.boolean(),
  cwd: z.string(),
  all: z.boolean(),
  path: z.string().optional()
})
let config: any

async function handleCopy(file: string, dest: string) {
  const source = path.resolve(compDir, file)
  await copy(source, dest)
  log.success(`复制文件到 [${dest}] 成功`)
}

async function copyFile(
  file: string,
  options: z.infer<typeof addOptionsSchema>
) {
  const dest = path.resolve(
    options.cwd,
    options.path ?? config?.path ?? 'src/components',
    file
  )
  if (!options.overwrite) {
    // 如果组件已存在，则不覆盖
    const exists = await pathExists(dest)
    if (exists) {
      log.warn(`文件 [${file}] 已存在！`)
    } else {
      await handleCopy(file, dest)
    }
  } else {
    await handleCopy(file, dest)
  }
}

async function copyComponents(
  components: ComponentInfo[],
  options: z.infer<typeof addOptionsSchema>
) {
  let files: string[] = []
  components.forEach(c => {
    files = files.concat([c.path]).concat(c.dependencies)
  })
  files = Array.from(new Set(files))
  const promises = files.map(f => copyFile(f, options))
  await Promise.all(promises)
}

async function copySelectedComponents(
  options: z.infer<typeof addOptionsSchema>
) {
  const components = options.components
  const json: ComponentInfo[] = await readJson(compJson)
  if (components?.length) {
    const allComponents = json.filter(c => components.includes(c.name))
    await copyComponents(allComponents, options)
  }
}

async function copyAllComponents(options: z.infer<typeof addOptionsSchema>) {
  const json: ComponentInfo[] = await readJson(compJson)
  if (Array.isArray(json) && json.length) {
    await copyComponents(json, options)
  }
}

async function handleAdd(components: any, opts: any) {
  const options = addOptionsSchema.parse({
    components,
    ...opts,
    cwd: path.resolve(opts.cwd)
  })
  const configPath = path.resolve(options.cwd, 'celtyui.json')
  const exists = await pathExists(configPath)
  if (exists) {
    // 读取配置文件
    config = await readJson(configPath)
    log.success(`读取配置文件 [${configPath}] 成功`)
  }
  if (options.components?.length) {
    // 复制选中的组件
    await copySelectedComponents(options)
  } else if (options.all) {
    // 复制所有组件
    await copyAllComponents(options)
  } else {
    // 列出组件供选择
    const json: ComponentInfo[] = await readJson(compJson)
    if (Array.isArray(json) && json.length) {
      log.info('请选择需要添加的组件：')
      const { components } = await prompts({
        type: 'multiselect',
        name: 'components',
        message: '请选择需要添加的组件：',
        hint: '使用空格键选中，上下键切换，回车键确认',
        instructions: false,
        choices: json.map(c => ({
          title: c.name,
          value: c.name
        }))
      })
      if (components?.length) {
        options.components = components
        await copySelectedComponents(options)
      } else {
        log.error('未选择任何组件！退出 celtyui 添加流程')
        process.exit(1)
      }
    }
  }
}

export const add = new Command()
  .name('add')
  .description('添加组件源码（vue3 + ts + scss）到您的项目中')
  .argument('[components...]', '需要添加的组件')
  .option('-c, --cwd <cwd>', '工作目录，默认当前位置', process.cwd())
  .option('-o, --overwrite', '覆盖已有的同名组件文件', false)
  .option('-a, --all', '添加库内所有组件到您的项目中', false)
  .option('-p, --path <path>', '组件存放路径，默认 src/components')
  .action((components, opts) => {
    handleAdd(components, opts).catch(err => {
      log.error('程序异常 ', err)
      process.exit(1)
    })
  })
