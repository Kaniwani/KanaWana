import { ENGLISH_PUNCTUATION_RANGES } from '../constants';
import isCharInRange from './isCharInRange';
import isEmpty from './isEmpty';

/**
 * Tests a character. Returns true if the character is considered English punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharEnglishPunctuation(char = '') {
  if (isEmpty(char)) return false;
  return ENGLISH_PUNCTUATION_RANGES.some(([start, end]) => isCharInRange(char, start, end));
}

export default isCharEnglishPunctuation;
