import isCharHiragana from '../utils/isCharHiragana';
import isEmpty from '../utils/isEmpty';

/**
 * Tests if all text is hiragana
 * @param  {String} input text to Tests
 * @return {Boolean} true if hiragana
 */
function isHiragana(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every(isCharHiragana);
}

export default isHiragana;
