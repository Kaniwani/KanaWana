import { KANJI_KANA_REGEX } from '../constants';
import isEmpty from '../utils/isEmpty';

/**
 * Test if `input` is [Kanji](https://en.wikipedia.org/wiki/Kanji) and/or [Kana](https://en.wikipedia.org/wiki/Kana) like “「泣き虫」”
 * Includes Japanese full-width punctuation ranges
 * @param  {String} [input=''] text
 * @return {Boolean} true if all [Kanji](https://en.wikipedia.org/wiki/Kanji) and/or [Kana](https://en.wikipedia.org/wiki/Kana)
 * @example
 * isKanjiKana('泣き虫')
 * // => true
 * isKanjiKana('あア')
 * // => true
 * isKanjiKana('泣き虫。！〜') // Full-width punctuation
 * // => true
 * isKanjiKana('泣き虫.!~') // Half-width / Latin punctuation
 * // => false
 * isKanjiKana('泣き虫A')
 * // => false
 * isKanjiKana('A')
 * // => false
 */
function isKanjiKana(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every((char) => KANJI_KANA_REGEX.test(char));
}

export default isKanjiKana;
