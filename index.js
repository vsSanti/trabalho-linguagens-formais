const entry = require('./src/data/AFND.json');
const { getAFType } = require('./src/utils/af-type');
const { getECLOSURE } = require('./src/utils/e-closure');
const { removeVoidTransition } = require('./src/utils/remove-void-transition');

const { table: originalTable } = entry;
let tableCopy = JSON.parse(JSON.stringify(originalTable));
const states = Object.keys(originalTable);

let afType = getAFType(originalTable, states);
console.log(`O AF é um: ${afType}`);
console.table(originalTable);

if (afType === 'AFNDe') {
  // criação da lista de eCLOSURE
  const eCLOSURE = getECLOSURE(originalTable, states);

  // remoção das transições vazias
  tableCopy = removeVoidTransition(originalTable, states, eCLOSURE);
  console.log('\nTabela sem os movimentos vazios:');
  console.table(tableCopy);

  afType = getAFType(tableCopy, Object.keys(tableCopy));
  console.log(`\nTipo do AF após remoção das transições vazias: ${afType}`);
}
