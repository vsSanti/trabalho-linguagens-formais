const entry = require('./src/data/AFNDe-2.json');
const { getAFType } = require('./src/utils/af-type');
const { getECLOSURE } = require('./src/utils/e-closure');
const { removeVoidTransition } = require('./src/utils/remove-void-transition');

const { table } = entry;
// const newTable = JSON.parse(JSON.stringify(table));
const states = Object.keys(table);

console.log(`O AF é um: ${getAFType(table, states)}`);
console.table(table);

// criação da lista de eCLOSURE
const eCLOSURE = getECLOSURE(table, states);

// remoção das transições vazias
const newTable = removeVoidTransition(table, states, eCLOSURE);

console.log('\nTabela sem os movimentos vazios:');
console.table(newTable)
