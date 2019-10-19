#!/usr/bin/env node
const path = require('path');
const exec = require('child_process').exec;

const CWD = process.cwd();
const NODE_MODULES = path.resolve(CWD, './node_modules');
const NODE_MODULES_BIN = path.resolve(CWD, './node_modules/.bin');
const cmd = `${NODE_MODULES_BIN}/jsdoc -R ${CWD}/README.md -c ${CWD}/jsconf.json -t ${NODE_MODULES}/ink-docstrap/template -r ${CWD}/src -d ${CWD}/docs/`;
exec(cmd, (err, stdout) => {
  if (err) {
    console.log('err', err);
  }
  console.log('Docs generated', stdout);
});
