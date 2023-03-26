const { english } = require('./english');

// const {french} = require('../01/languages/french')
// const {ukrainian} = require('../01/languages/ukrainian')

const { french, ukrainian/* , surjuk */ } = require('./languages');// index зазначати не потрібно
// const {/*french, ukrainian,*/ surjuk} = require('./languages');// index зазначати не потрібно

console.log('HW! )');
console.log(english());
console.log(french(), ukrainian()/* , surjuk() */);
// console.log(/*french(), ukrainian(),*/ surjuk());
