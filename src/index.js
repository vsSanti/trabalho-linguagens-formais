const entry = require('./entry.json');

const { final, ...table } = entry;

console.table(table)
console.log({ final })
