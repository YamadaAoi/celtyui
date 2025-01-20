/*
 * @Author: zhouyinkui
 * @Date: 2024-12-23 10:31:55
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2024-12-25 11:48:59
 * @Description:
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { copy, mkdir, writeFile } from 'fs-extra'
import madge from 'madge'
import { ComponentInfo } from '../src/commands/util'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
/**
 * es目录
 */
const esDir = path.resolve(__dirname, '../es')
/**
 * es源码目录
 */
const compDir = path.resolve(esDir, 'components')
/**
 * 组件配置文件
 */
const compJson = path.resolve(esDir, 'components.json')
/**
 * 源码目录
 */
const sourceDir = path.resolve(__dirname, '../src/components')
/**
 * ts配置文件
 */
const tsJson = path.resolve(__dirname, '../tsconfig.json')

/**
 * 递归组装组件依赖的依赖
 * @param path
 * @param graph
 * @returns
 */
function getDependencies(
  path: string,
  graph: madge.MadgeModuleDependencyGraph
) {
  const dependencies: string[] = []
  function getdepnds(p: string) {
    dependencies.push(p)
    graph[p]?.forEach(d => {
      getdepnds(d)
    })
  }
  graph[path]?.forEach(d => {
    getdepnds(d)
  })
  return Array.from(new Set(dependencies))
}

/**
 * 获得组件信息，包含组件名、路径、依赖
 * @param path
 * @param graph
 * @returns
 */
function getComponent(path: string, graph: madge.MadgeModuleDependencyGraph) {
  let component: ComponentInfo | undefined
  const arr = path?.split('/')
  // index.vue才是暴露出去的组件
  if (arr?.length && arr.length > 2 && arr[arr.length - 1] === 'index.vue') {
    // 以组件所处文件夹名为组件名
    const folder = arr[arr.length - 2]
    const name = folder[0].toUpperCase() + folder.substring(1)
    component = {
      name,
      path,
      dependencies: getDependencies(path, graph)
    }
  }
  return component
}

async function main() {
  const res = await madge(sourceDir, {
    fileExtensions: ['ts', 'tsx', 'vue', 'scss'],
    excludeRegExp: [/demo/, /demoAble/],
    tsConfig: tsJson
  })
  const graph = res.obj()
  console.log(JSON.stringify(graph))
  const arr: ComponentInfo[] = []
  Object.keys(graph).forEach(key => {
    const component = getComponent(key, graph)
    if (component) {
      arr.push(component)
    }
  })
  await mkdir(esDir, { recursive: true })
  await writeFile(compJson, JSON.stringify(arr, null, 2))
  await copy(sourceDir, compDir, {
    filter: (src: string) => !src.includes('demo')
  })
}

main().catch(e => {
  console.error(e)
})
