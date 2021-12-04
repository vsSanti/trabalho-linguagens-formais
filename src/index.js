const entry = require('./data/AFNDe-2.json');

const { table } = entry;
const states = Object.keys(table);

const hasVoidMovement = states.some((state) => table[state].void?.length);
const isDeterministic = states.every((state) => {
  const transitionKeys = Object.keys(table[state]);
  if (table[state].void?.length > 0) return false;
  return transitionKeys.every((transition) => table[state][transition].length <= 1);
});

let afType = 'AFNDe';
if (!hasVoidMovement) {
  afType = isDeterministic ? 'AFD' : 'AFND';
}

console.log(`O AF é um: ${afType}`);
console.table(table);

const eCLOSURE = {};
states.forEach((state) => {
  eCLOSURE[state] = [...(new Set([state, ...(table[state].void || [])]))];
  console.log(`ε-CLOSURE(${state}) = { ${eCLOSURE[state].join(', ')} }`);
});

const newTable = JSON.parse(JSON.stringify(table));

states.forEach((state) => {
  const voidMovements = table[state].void || [];
  voidMovements.map((voidMovement) => {
    const eCLOSUREMovement = table[voidMovement];
    const eCLOSUREMovementKeys = Object.keys(eCLOSUREMovement);

    eCLOSUREMovementKeys.forEach((key) => {
      newTable[state][key] = [...(new Set([
        ...(newTable[state][key] || []),
        ...(eCLOSUREMovement[key] || []),
      ]))];
    });
  });

  const transitions = Object.keys(table[state]).filter((t) => t !== 'void');
  transitions.forEach((transition) => {
    newTable[state][transition] = newTable[state][transition].map((t) => eCLOSURE[t]).flat();
  });

  delete newTable[state].void;
});

console.log('\nTabela sem os movimentos vazios:');
console.table(newTable)
