import { KANJI_KANA_REGEX } from '../constants';
import isEmpty from '../utils/isEmpty';

/**
 * Test if input is All Japanese, for mixes of kanji and kana like "泣き虫。"
 * Includes Japanese full-width punctuation ranges
 * @param  {String} input text to test
 * @return {Boolean} true if ALL Japanese, else false
 */
function isKanjiKana(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every((char) => KANJI_KANA_REGEX.test(char));
}

export default isKanjiKana;
