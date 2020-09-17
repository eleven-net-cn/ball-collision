import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import babel from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import alias from '@rollup/plugin-alias'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import banner from 'rollup-plugin-banner'
import filesize from 'rollup-plugin-filesize'
import cleaner from 'rollup-plugin-cleaner'
import eslint from '@rbnlffl/rollup-plugin-eslint'
import pkg from './package.json'

const isProd = process.env.NODE_ENV === 'production'

const pluginsProd = isProd
  ? [
      sourceMaps(),
      terser({
        compress: {
          drop_debugger: true,
        },
        output: {
          comments: false,
          ascii_only: true,
          beautify: false,
        },
      }),
      banner(
        `${pkg.name} v${pkg.version}` +
          `\n` +
          `Author: ${pkg.author}` +
          `\n` +
          `Date: ${new Date()}`
      ),
      filesize(),
      cleaner({
        targets: ['./dist/'],
      }),
    ]
  : []

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: 'BallCollision', format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    alias({
      entries: {
        '@': path.resolve(__dirname, 'src'),
      },
    }),
    json(),
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
      exclude: /node_modules/,
    }),
    commonjs(),
    nodeResolve({
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.json'],
    }),
    eslint({
      extensions: ['.js', '.ts'],
      filterInclude: ['src/**'],
      filterExclude: ['node_modules/**'],
    }),
    ...pluginsProd,
  ],
}
