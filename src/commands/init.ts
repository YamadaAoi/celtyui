#!/usr/bin/env node
import path from 'node:path'
import { Command } from 'commander'
import { z } from 'zod'
import { writeFile } from 'fs-extra'
import { log } from './util'

const initOptionsSchema = z.object({
  cwd: z.string(),
  path: z.string().optional(),
  port: z.string().optional(),
  lang: z.string().optional()
})

async function handleInit(opts: any) {
  const options = initOptionsSchema.parse({
    ...opts,
    cwd: path.resolve(opts.cwd)
  })
  await writeFile(
    path.resolve(options.cwd ?? '', 'celtyui.json'),
    JSON.stringify(
      {
        path: options.path,
        port: options.port,
        lang: options.lang
      },
      null,
      2
    )
  )
  log.success('初始化配置文件 [celtyui.json] 成功')
  log.info('建议将 celtyui.json 配置到 .gitignore 中')
}

export const init = new Command()
  .name('init')
  .description('初始化配置文件 [celtyui.json] 到您项目的根目录中')
  .option('-c, --cwd <cwd>', '工作目录，默认当前位置', process.cwd())
  .option(
    '-p, --path <path>',
    '组件存放路径，默认 src/components',
    'src/components'
  )
  .option('-t, --port <port>', 'demo页面监听端口', '3210')
  .option('-l, --lang <lang>', '框架类型（vue or react）', 'vue')
  .action(opts => {
    handleInit(opts).catch(err => {
      log.error('初始化异常 ', err)
      process.exit(1)
    })
  })
