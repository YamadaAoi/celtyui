/*
 * @Author: zhouyinkui
 * @Date: 2022-02-23 18:12:06
 * @LastEditors: zhouyinkui
 * @LastEditTime: 2024-12-27 16:57:17
 * @Description: vite配置
 */
import path from 'path'
import { defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import pxtorem from 'postcss-pxtorem'
import postcssPresetEnv from 'postcss-preset-env'
import checker from 'vite-plugin-checker'

/**
 * @description: 获取Browsers配置
 * @param {*} command
 * @return {*}
 */
function getBrowsers(command: 'build' | 'serve') {
  return command === 'serve'
    ? [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version'
      ]
    : ['ie > 8', '>1%', 'not dead', 'not op_mini all']
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  loadEnv(mode, process.cwd())
  const config: UserConfig = {
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src')
      }
    },
    css: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 100,
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 1
          }),
          postcssPresetEnv({
            browsers: getBrowsers(command)
          }) as any
        ]
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "./src/assets/vars.scss" as vars;'
        }
      }
    }
  }
  if (config.plugins?.length) {
    if (command === 'serve') {
      config.server = {
        open: true
      }
      config.plugins?.push(
        checker({
          vueTsc: true
        })
      )
    }
  }
  return config
})
