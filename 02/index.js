// console.log(__dirname);

// console.log(__filename);

// console.log(process.argv);

// console.log(process.env);
// process.exit()// for ex stop server

// todo to bookmark: request to entering text
const readline = require('readline');
const fs = require('fs').promises;
const { program } = require('commander');
require('colors');

program.option('-f, --file [type]', 'file for saving results', 'game_results.txt');
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* rl.on('line', (txt) => {
    console.log(`You entered this text: ${txt}`);
    // process.exit();
}) */

let counter = 0;
const mind = Math.ceil(Math.random() * 10);
const logFile = program.opts().file;

/**
 * Simple input data validator
 * @param {number} val
 * @returns {boolean}
 */
const isValid = (val) => {
  if (!Number.isNaN(val) && val >= 1 && val <= 10) return true;

  if (Number.isNaN(val)) console.log('Please, enter a number'.red);
  if (val < 1 || val > 10) console.log('nimber must be between 1 and 10'.red);

  return false;
};

/**
 * Log game results to the txt file
 * @param {string} msg - message to log
 * @returns {Promise<void>}
 */
const logger = async (msg) => {
  try {
    await fs.appendFile(logFile, `${msg}\n`);

    console.log(`game results successfully saved to ${logFile}`.yellow);
  } catch (err) {
    console.log(err.message);
  }
};

/**
 * Main game process
 */
const game = () => {
  rl.question(
    'Please enter any whole number between 1 and 10!\n'.blue,
    (val) => {
      const number = +val;

      if (!isValid(number)) return game();

      counter += 1;

      if (number !== mind) {
        console.log(' oh no, try again'.red);

        return game();
        // OR:
        // if(number !== mind) return game();
      }

      console.log(
        `Congrats! you guessed the number in ${counter} step(s) =^^=`.magenta
      );
      logger(`${new Date().toLocaleString('uk-UA')} Congrats! you guessed the number in ${counter} step(s) =^^=`);

      rl.close();
    }
  );
};

game();

// console.log(":CL: ~ file: index.js:27 ~ mind:", mind);
