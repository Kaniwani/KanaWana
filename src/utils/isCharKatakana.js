import {
  KATAKANA_START,
  KATAKANA_END,
} from '../constants';

import isCharInRange from './isCharInRange';

/**
 * Tests a character. Returns true if the character is katakana.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export default function isCharKatakana(char) {
  return isCharInRange(char, KATAKANA_START, KATAKANA_END);
}
