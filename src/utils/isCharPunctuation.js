import isCharEnglishPunctuation from './isCharEnglishPunctuation';
import isCharJapanesePunctuation from './isCharJapanesePunctuation';

/**
 * Tests a character. Returns true if the character is considered Japanese or English punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export default function isCharPunctuation(char) {
  return isCharEnglishPunctuation(char) || isCharJapanesePunctuation(char);
}
