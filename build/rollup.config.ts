import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import esbuild from 'rollup-plugin-esbuild'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const extensions = ['.mjs', '.js', '.json', '.ts']

export default defineConfig([
  {
    input: path.resolve(__dirname, '../src/index.ts'),
    output: {
      dir: 'es',
      format: 'es',
      entryFileNames: '[name].mjs',
      sourcemap: false
    },
    plugins: [
      commonjs(),
      resolve({
        extensions,
        preferBuiltins: true
      }),
      json(),
      typescript({
        compilerOptions: {
          outDir: 'es',
          target: 'esnext',
          module: 'esnext',
          skipLibCheck: true,
          strict: true,
          esModuleInterop: true,
          moduleResolution: 'node',
          allowSyntheticDefaultImports: true,
          forceConsistentCasingInFileNames: true,
          useDefineForClassFields: true,
          declaration: true,
          emitDeclarationOnly: true,
          declarationDir: 'es/types',
          sourceMap: false,
          resolveJsonModule: true,
          types: ['node'],
          lib: ['esnext', 'dom']
        },
        exclude: ['node_modules'],
        include: ['src/index.ts']
      }),
      esbuild({
        tsconfig: path.resolve(__dirname, '../tsconfig.json'),
        target: 'esnext',
        minify: true
      })
    ]
  }
])
