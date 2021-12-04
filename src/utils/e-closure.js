const getECLOSURE = (table, states) => {
  const eCLOSURE = {};
  states.forEach((state) => {
    eCLOSURE[state] = [...(new Set([state, ...(table[state].void || [])]))];
    console.log(`ε-CLOSURE(${state}) = { ${eCLOSURE[state].join(', ')} }`);
  });

  return eCLOSURE;
}

module.exports = { getECLOSURE };