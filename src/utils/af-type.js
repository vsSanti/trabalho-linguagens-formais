const getAFType = (table, states) => {
  // verifica se tem algum array de voids em um estado
  const hasVoidMovement = states.some((state) => table[state].void?.length);
  // se tiver algum array de void, é um AFNDe
  if (hasVoidMovement) return 'AFNDe';

  // verifica se todas as transições possuem apenas 1 ou nenhum movimento.
  const isDeterministic = states.every((state) => {
    const transitionKeys = Object.keys(table[state]);
    return transitionKeys.every((transition) => table[state][transition].length <= 1);
  });

  // se for determinístico, é AFD. Caso contrário, é um AFND
  return isDeterministic ? 'AFD' : 'AFND';
}

module.exports = { getAFType };