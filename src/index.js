const entry = require('./entry.json');

const { final, ...table } = entry;

const states = Object.keys(table);

const hasVoidMovement = states.some((state) => table[state].void?.length);
const isDeterministic = states.every((state) => {
  const transitionKeys = Object.keys(table[state]);
  if (table[state].void?.length > 0) return false;
  return transitionKeys.every((transition) => table[state][transition].length <= 1);
})

let afType = 'AFNDe';

if (!hasVoidMovement) {
  afType = isDeterministic ? 'AFD' : 'AFND';
}

console.log(`O AF é um: ${afType}`);
console.table(table);
