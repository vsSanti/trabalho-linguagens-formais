const validateSentence = (af, initialState, sentence) => {
  const validationWord = sentence.split('');
  let currentState = af[initialState];

  let isValid = true;
  validationWord.forEach((c) => {
    try {
      if (!isValid) return;
      currentState = af[currentState[c]];
    } catch (error) {
      isValid = false;
    }
  });

  const isCurrentStateFinal = currentState?._final === '*';

  console.log(`A sentença '${validationWord.join('')}' ${(isValid && isCurrentStateFinal) ? '' : 'não '}foi reconhecida.`);
}

module.exports = { validateSentence };