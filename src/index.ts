#!/usr/bin/env node
import { Command } from 'commander'
import { init } from './commands/init'
import { add } from './commands/add'
import packageJson from '../package.json'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

function main() {
  const program = new Command()
    .name('vtscadd')
    .description('添加组件源码（vue3 + ts + scss）到您的项目中')
    .version(packageJson.version || '1.0.0', '-v, --version', '显式版本号')

  program.addCommand(init)
  program.addCommand(add)

  program.parse()
}

main()
