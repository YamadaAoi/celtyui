#!/usr/bin/env node
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Command } from 'commander'
import { z } from 'zod'
import { readJson, pathExists, createReadStream } from 'fs-extra'
import Koa from 'koa'
import serve from 'koa-static'
import open from 'open'
import { log } from './util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const demoOptionsSchema = z.object({
  cwd: z.string(),
  port: z.string().optional(),
  lang: z.string().optional()
})
let config: any

async function handleDemo(opts: any) {
  const options = demoOptionsSchema.parse({
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
  const port = Number(options.port ?? config?.port ?? '3210')
  const lang = options.lang ?? config?.lang ?? 'vue'
  const app = new Koa()
  const demoPath = path.resolve(__dirname, lang, 'demo')
  app.use(serve(demoPath))
  app.use(async ctx => {
    ctx.type = 'html'
    ctx.body = createReadStream(path.join(demoPath, 'index.html'))
  })
  app.listen(port, () => {
    log.success(`启动demo页面 [http://localhost:${port}] 成功！`)
    open(`http://localhost:${port}`)
  })
}

export const demo = new Command()
  .name('demo')
  .description('启动本地服务器打开 [celtyui] 内置 demo 页面')
  .option('-c, --cwd <cwd>', '工作目录，默认当前位置', process.cwd())
  .option('-p, --port <port>', 'demo页面监听端口，默认3210')
  .option('-l, --lang <lang>', '框架类型（vue or react），默认vue')
  .action(opts => {
    handleDemo(opts).catch(err => {
      log.error('启动本地服务 ', err)
      process.exit(1)
    })
  })
