const flatArraysOfProperties = (table, initialState, afd) => {
  const transitionKeys = Object.keys(table[initialState]);

  const response = {};
  Object.keys(afd).forEach((keys) => {
    const key = String(keys).replace(/,/g, '');
    response[key] = {};
    transitionKeys.forEach((tk) => {
      response[key][tk] = afd[keys][tk].join('')
    });
  });

  return response;
}

module.exports = { flatArraysOfProperties };