const getECLOSURE = (table, states) => {
  const eCLOSURE = {};
  states.forEach((state) => {
    eCLOSURE[state] = [...(new Set([state, ...(table[state].void || [])]))];
    console.log(`ε-CLOSURE(${state}) = { ${eCLOSURE[state].join(', ')} }`);
  });

  return eCLOSURE;
}

const removeVoidTransition = (table, states, eCLOSURE) => {
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

  return newTable;
}

const getFinalStatesAfterRemovalOfVoidTransitions = (af, states, finalStates) => {
  const newFinalStates = [];
  states.forEach((state) => {
    Object.keys(af[state]).forEach((key) => {
      const hasFinalState = af[state][key].some((s) => ['q1'].includes(s));
      if (hasFinalState) {
        newFinalStates.push(state);
      }
    });
  });

  return [...(new Set([...newFinalStates, ...finalStates]))];

}

module.exports = {
  getECLOSURE,
  getFinalStatesAfterRemovalOfVoidTransitions,
  removeVoidTransition,
};