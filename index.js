const entry = require('./src/data/AFNDe-1.json');
const { getAFType } = require('./src/utils/af-type');
const { convertAFNDintoAFD } = require('./src/utils/convert-afnd-into-afd');
const { flatArraysOfProperties } = require('./src/utils/flat-arrays-of-properties');
const { getECLOSURE, removeVoidTransition } = require('./src/utils/remove-void-transition');

const { table: originalTable } = entry;
let af = JSON.parse(JSON.stringify(originalTable));
const states = Object.keys(originalTable);

// faz a verificação inicial do tipo do AF
let afType = getAFType(originalTable, states);
console.log(`O AF é um: ${afType}`);

if (afType === 'AFD') {
  af = flatArraysOfProperties(af, states[0], af);
}

console.table(af);

if (afType === 'AFNDe') {
  // criação da lista de eCLOSURE
  const eCLOSURE = getECLOSURE(originalTable, states);

  // remoção das transições vazias
  af = removeVoidTransition(originalTable, states, eCLOSURE);
  console.log('\nTabela sem os movimentos vazios:');
  console.table(af);

  // verifica novamente o tipo do AF após a remoção das transições vazias
  afType = getAFType(af, Object.keys(af));
  console.log(`\nTipo do AF após remoção das transições vazias: ${afType}`);
}

if (afType === 'AFND') {
  // faz a equivalência de AFND para AFD
  const afd = convertAFNDintoAFD(af, states[0]);
  af = flatArraysOfProperties(af, states[0], afd);
  console.table(af);
}
