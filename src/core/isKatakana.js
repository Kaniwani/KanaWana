import isCharKatakana from '../utils/isCharKatakana';

/**
 * Tests if all text is katakana
 * @param  {String} input text to Tests
 * @return {Boolean} true if katakana
 */
export default function isKatakana(input) {
  return [...input].every(isCharKatakana);
}
