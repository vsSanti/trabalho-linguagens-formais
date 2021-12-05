const getFinalStates = (af, finalStates) => {
  const afWithFinals = {};
  Object.keys(af).forEach((key) => {
    afWithFinals[key] = {
      ...af[key],
      _final: finalStates.some((f) => key.includes(f)) ? '*' : "",
    }
  });
  return afWithFinals;
}

module.exports = { getFinalStates };