const getFinalStates = (af, finalStates, initialState) => {
  const afWithFinals = {};
  Object.keys(af).forEach((key) => {
    afWithFinals[key] = {
      ...af[key],
      _final: finalStates.some((f) => key.includes(f)) ? '*' : ' ',
      _initial: key === initialState ? '<-' : '  ',
    }
  });
  return afWithFinals;
}

module.exports = { getFinalStates };