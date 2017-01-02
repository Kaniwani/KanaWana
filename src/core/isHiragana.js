import isCharHiragana from '../utils/isCharHiragana';

/**
 * Tests if all text is hiragana
 * @param  {String} input text to Tests
 * @return {Boolean} true if hiragana
 */
function isHiragana(input) {
  return [...input].every(isCharHiragana);
}

export default isHiragana;
