import isCharKana from '../utils/isCharKana';

/**
 * Test if all text is Katakana, Hiragana or both
 * @param  {String} input text to test
 * @return {Boolean} true if either Katakana or Hiragana, else false
 */
function isKana(input) {
  return [...input].every(isCharKana);
}

export default isKana;
