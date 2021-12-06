const convertAFNDintoAFD = (table, initialState) => {
  const afd = {};
  // lista de estados que ainda precisam ser convertidos
  // é uma lista do tipo FIFO
  const queue = [[initialState]];
  // chaves desse estado
  const transitionKeys = Object.keys(table[initialState]);

  // enquanto tiver chave, fazer a procura na tabela
  while (queue.length) {
    // remove o primeiro estado da chave
    const state = queue.shift();

    // percorre todos os valores de transição
    const newVal = transitionKeys.reduce((keyAcc, key) => {
      // percorre todos os estados que precisam ser verificados
      const resp = state.reduce((stateAcc, s) => {
        // faz a junção entre o estado da redução e o que contém na tabela original para
        // o estado e chave
        const newTransition = [...new Set([...stateAcc, ...table[s][key]].sort())];
        return newTransition;
      }, []);

      // caso seja um estado que ainda não foi posto na lista, adiciona ele no final
      if (!afd[resp] && resp.length) {
        afd[resp] = {};
        queue.push(resp);
      }

      keyAcc[key] = resp;

      return keyAcc;
    }, {});

    afd[state] = newVal;
  }

  return afd;
}

module.exports = { convertAFNDintoAFD };