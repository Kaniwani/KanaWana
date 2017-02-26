import isEmpty from '../utils/isEmpty';
import isCharKatakana from '../utils/isCharKatakana';

/**
 * Tests if all text is katakana
 * @param  {String} input text to Tests
 * @return {Boolean} true if katakana
 */
function isKatakana(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every(isCharKatakana);
}

export default isKatakana;
