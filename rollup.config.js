import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { version, author } from './package.json';

const banner =
  `${'/*!\n * Hubspot Client API v'}${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */';

export default {
  input: './src/index.js',
  external: [
    'axios',
    '@babel/runtime/regenerator',
    '@babel/runtime/helpers/asyncToGenerator'
  ],
  output: {
    file: './dist/bundle.min.js',
    format: 'cjs',
    name: 'bundle',
    banner,
    globals: {
      axios: 'axios',
      '@babel/runtime/regenerator': '_regeneratorRuntime',
      '@babel/runtime/helpers/asyncToGenerator': '_asyncToGenerator',
    },
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: true,
      runtimeHelpers: true,
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: false,
      preferBuiltins: true
    }),
    commonjs(),
    json(),
    globals(),
    builtins()
  ]
};
