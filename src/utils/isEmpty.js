/**
 * Checks if input string is empty
 * @param  {String} input text input
 * @return {Boolean} true if no input
 */
function isEmpty(input) {
  if (typeof input !== 'string') {
    console.warn(`Input provided to isEmpty(): ${JSON.stringify(input)} was not a string.`); // eslint-disable-line no-console
    return true;
  }
  return !input.length;
}

export default isEmpty;
