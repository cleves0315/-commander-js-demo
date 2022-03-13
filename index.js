#!/usr/bin/env node

const ora = require('ora')
const { promisify } = require('util')
const { Command } = require('commander');
const download = require('download-git-repo')
const program = new Command();

function defaultValue() {
  return '•᷄ࡇ•᷅'
}

function collect(value, previous) {
  return [...previous, value]
}

function myParseInt(value) {
  return Number(value)
}

const clone = async function (repo, desc) {
  const downloads = promisify(download) // download-git-repo: Download and extract a git repository (GitHub, GitLab, Bitbucket)
  const process = ora(`cloning => ${repo}`)

  process.start() // 进度条开始
  await downloads(repo, desc)
  //  download-git-repo导出的download方法，第一个参数repo是仓库地址，格式有三种：
  // GitHub - github:owner/name or simply owner/name
  // GitLab - gitlab:owner/name
  // Bitbucket - bitbucket:owner/name
  process.succeed()
}

program
  .option('-d, --debug', 'output extra debugging')
  .option('-de, --default', 'default value', defaultValue)
  .option('-c, --cheese [type]', 'add the specified type of cheese')
  .option('-co, --collect <n>', 'small pizza size', collect, []);

program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    console.log(`clone command called: ${source} to ${destination}`);
  })

program
  .command('add')
  .argument('<first>', 'number argument', myParseInt)
  .argument('[second]', 'number argument', myParseInt, 10)
  .action((first, second) => {
    console.log(`first: ${first}, second: ${second}: ${first + second}`)
  })

program
  .command('create')
  .argument('<name>', 'string argument')
  .action((name) => {
    clone('github:cleves0315/chrome-extension-cli', `${name}`)
  })

program.version('0.0.1', '-v --vers', 'output the current version');
// process.argv
program.parse();

const options = program.opts();
if (options.debug) console.log(options);
if (options.default) console.log(options.default);
if (options.pizzaType) console.log(`- ${options.pizzaType}`);
if (options.collect.length > 0) console.log(options.collect);
