import isEmpty from '../utils/isEmpty';
import isCharKana from '../utils/isCharKana';

/**
 * Test if all text is Katakana, Hiragana or both
 * @param  {String} input text to test
 * @return {Boolean} true if either Katakana or Hiragana, else false
 */
function isKana(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every(isCharKana);
}

export default isKana;
