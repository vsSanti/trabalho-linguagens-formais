const flatArraysOfProperties = (afd, initialState) => {
  const transitionKeys = Object.keys(afd[initialState]);

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