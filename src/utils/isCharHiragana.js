import {
  HIRAGANA_START,
  HIRAGANA_END,
} from '../constants';
import isCharLongDash from './isCharLongDash';
import isCharInRange from './isCharInRange';

/**
 * Tests a character. Returns true if the character is Hiragana.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export default function isCharHiragana(char) {
  if (isCharLongDash(char)) return true;
  return isCharInRange(char, HIRAGANA_START, HIRAGANA_END);
}
