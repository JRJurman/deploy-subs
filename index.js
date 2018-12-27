#!/usr/bin/env node

const options = require('commander')
const deploySubs = require('./deploy-subs')

options
  .option('-d, --directory <value>', 'Directory of packages in project')
  .option('-f, --filter <value>', '[optional] Filter of directoreis to keep')
  .option('-v, --verbose', '[optional] Flag to enable verbose logging')
  .parse(process.argv)

deploySubs(options)
