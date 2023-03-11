// console.log(__dirname);

// console.log(__filename);

// console.log(process.argv);

// console.log(process.env);
// process.exit()// for ex stop server

//todo to bookmark: request to entering text
const readline = require("readline");
const fs = require("fs").promices;
const commander = require("commander");
require("colors");

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

/* Gussied number */
const game = () => {
  rl.question(
    "Please enter any whole number between 1 and 10!\n".blue,
    (val) => {
      const number = +val;

      counter += 1;

      if()
    }
  );
};

game();

console.log(":C:L:G: ~ file: index.js:27 ~ mind:", mind);
