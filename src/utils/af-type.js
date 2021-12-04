const getAFType = (table, states) => {
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

  return afType;
}

module.exports = { getAFType };