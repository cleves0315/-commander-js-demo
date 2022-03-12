const { Command } = require('commander');
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

program.version('0.0.1', '-v --vers', 'output the current version');
// process.argv
program.parse();

const options = program.opts();
if (options.debug) console.log(options);
if (options.default) console.log(options.default);
if (options.pizzaType) console.log(`- ${options.pizzaType}`);
if (options.collect.length > 0) console.log(options.collect);
