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

function getDependencies(
  path: string,
  graph: madge.MadgeModuleDependencyGraph
) {
  const arr = path?.split('/')
  // 组件所处文件夹路径
  const folderPath = arr.slice(0, arr.length - 1).join('/')
  // 默认把组件所处文件夹内所有内容均为该组件依赖
  const dependencies = Object.keys(graph).filter(
    p => p.startsWith(folderPath) && p !== path
  )
  function getdepnds(p: string) {
    if (!p.startsWith(folderPath)) {
      dependencies.push(p)
    }
    graph[p]?.forEach(d => {
      getdepnds(d)
    })
  }
  graph[path]?.forEach(d => {
    getdepnds(d)
  })
  return dependencies
}

function getComponent(path: string, graph: madge.MadgeModuleDependencyGraph) {
  let component: ComponentInfo | undefined
  const arr = path?.split('/')
  // index.vue才是暴露出去的组件
  if (arr?.length && arr.length > 2 && arr[arr.length - 1] === 'index.vue') {
    const folder = arr[arr.length - 2]
    // 以组件所处文件夹名为组件名
    const name = folder[0].toUpperCase() + folder.substring(1)
    component = {
      name,
      path,
      dependencies: getDependencies(path, graph)
    }
  }
  return component
}

function handleCompnentsDependencies(arr: ComponentInfo[]) {
  return arr.map(ar => {
    let { dependencies } = ar
    if (dependencies.length) {
      // 获得依赖中所有组件的路径
      const componentPaths = dependencies
        .filter(d => d.endsWith('index.vue'))
        .map(c => {
          const arr = c.split('/')
          return arr.slice(0, arr.length - 1).join('/')
        })
      if (componentPaths.length) {
        const rest = dependencies.filter(d =>
          componentPaths.every(c => !d.startsWith(c))
        )
        dependencies = [...componentPaths, ...rest]
      }
    }
    return {
      name: ar.name,
      path: ar.path,
      dependencies
    }
  })
}

async function main() {
  const res = await madge(sourceDir, {
    fileExtensions: ['ts', 'tsx', 'vue', 'scss'],
    excludeRegExp: [/demo/],
    tsConfig: tsJson
  })
  const graph = res.obj()
  console.log(graph)
  const arr: ComponentInfo[] = []
  Object.keys(graph).forEach(key => {
    const component = getComponent(key, graph)
    if (component) {
      arr.push(component)
    }
  })
  await mkdir(esDir, { recursive: true })
  await writeFile(
    compJson,
    JSON.stringify(handleCompnentsDependencies(arr), null, 2)
  )
  await copy(sourceDir, compDir)
}

main().catch(e => {
  console.error(e)
})
