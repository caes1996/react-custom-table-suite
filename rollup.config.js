const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');

const packageJson = require('./package.json');

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      name: 'react-custom-table-suite'
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      dedupe: ['react', 'react-dom']
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      exclude: 'node_modules/**'
    }),
    commonjs(),
    postcss({
      extract: true,
      minimize: true
    }),
    terser()
  ],
  external: [
    'react',
    'react-dom',
    'react-table',
    'react-csv',
    'jspdf',
    'jspdf-autotable',
    'xlsx',
    'lucide-react',
    'prop-types'
  ]
};