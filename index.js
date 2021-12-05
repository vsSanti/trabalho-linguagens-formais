const entry = require('./src/data/AFND.json');
const { getAFType } = require('./src/utils/af-type');
const { convertAFNDintoAFD } = require('./src/utils/convert-afnd-into-afd');
const { flatArraysOfProperties } = require('./src/utils/flat-arrays-of-properties');
const { getFinalStates } = require('./src/utils/get-final-states');
const {
  getECLOSURE,
  getFinalStatesAfterRemovalOfVoidTransitions,
  removeVoidTransition
} = require('./src/utils/remove-void-transition');

const { finalStates: originalFinalStates, table: originalTable } = entry;
let finalStates = [...originalFinalStates];
let af = JSON.parse(JSON.stringify(originalTable));
const states = Object.keys(originalTable);

// faz a verificação inicial do tipo do AF
let afType = getAFType(originalTable, states);
console.log(`\nO AF é um: ${afType}`);

if (afType === 'AFD') {
  af = flatArraysOfProperties(af, states[0]);
  af = getFinalStates(af, finalStates);
}

console.table(af);

if (afType === 'AFNDe') {
  // criação da lista de eCLOSURE
  const eCLOSURE = getECLOSURE(originalTable, states);

  // remoção das transições vazias
  af = removeVoidTransition(originalTable, states, eCLOSURE);
  console.log('\nTabela sem os movimentos vazios:');
  console.table(af);

  finalStates = getFinalStatesAfterRemovalOfVoidTransitions(af, states, finalStates);

  // verifica novamente o tipo do AF após a remoção das transições vazias
  afType = getAFType(af, Object.keys(af));
  console.log(`Tipo do AF após remoção das transições vazias: ${afType}`);
}

if (afType === 'AFND') {
  // faz a equivalência de AFND para AFD
  const afd = convertAFNDintoAFD(af, states[0]);
  af = flatArraysOfProperties(afd, states[0]);

  console.log('\nApós conversão de AFND para AFD:')

  af = getFinalStates(af, finalStates);
  console.table(af);
}
