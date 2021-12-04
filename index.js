const entry = require('./src/data/AFNDe-2.json');
const { getAFType } = require('./src/utils/af-type');
const { getECLOSURE } = require('./src/utils/e-closure');
const { removeVoidTransition } = require('./src/utils/remove-void-transition');

const { table } = entry;
let newTable = JSON.parse(JSON.stringify(table));
const states = Object.keys(table);

const afType = getAFType(table, states);
console.log(`O AF é um: ${afType}`);
console.table(table);

if (afType === 'AFNDe') {
  // criação da lista de eCLOSURE
  const eCLOSURE = getECLOSURE(table, states);
  
  // remoção das transições vazias
  newTable = removeVoidTransition(table, states, eCLOSURE);
  console.log('\nTabela sem os movimentos vazios:');
  console.table(newTable)
}

