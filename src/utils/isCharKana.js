import isCharHiragana from './isCharHiragana';
import isCharKatakana from './isCharKatakana';

/**
 * Tests a character. Returns true if the character is hiragana or katakana.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharKana(char) {
  return isCharHiragana(char) || isCharKatakana(char);
}

export default isCharKana;
