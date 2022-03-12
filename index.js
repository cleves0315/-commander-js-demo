const { Command } = require('commander');
const program = new Command();

function defaultValue() {
  return '•᷄ࡇ•᷅'
}

function collect(value, previous) {
  return [...previous, value]
}

program
  .option('-d, --debug', 'output extra debugging')
  .option('-de, --default', 'default value', defaultValue)
  .option('-c, --cheese [type]', 'add the specified type of cheese')
  .option('-co, --collect <n>', 'small pizza size', collect, []);

program.version('0.0.1', '-v --vers', 'output the current version');
// process.argv
program.parse();

const options = program.opts();
if (options.debug) console.log(options);
if (options.default) console.log(options.default);
if (options.pizzaType) console.log(`- ${options.pizzaType}`);
if (options.collect.length > 0) console.log(options.collect);
