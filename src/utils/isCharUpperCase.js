import {
  UPPERCASE_START,
  UPPERCASE_END,
} from '../constants';

import isCharInRange from './isCharInRange';

/**
 * Tests if char is in English unicode uppercase range
 * @param  {String} char
 * @return {Boolean}
 */
export default function isCharUpperCase(char) {
  return isCharInRange(char, UPPERCASE_START, UPPERCASE_END);
}
