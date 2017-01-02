import { KANJI_KANA_REGEX } from '../constants';

/**
 * Test if input is All Japanese, for mixes of kanji and kana like "泣き虫。"
 * Includes Japanese full-width punctuation ranges
 * @param  {String} input text to test
 * @return {Boolean} true if ALL Japanese, else false
 */
export default function isKanjiKana(input) {
  return [...input].every((char) => KANJI_KANA_REGEX.test(char));
}
