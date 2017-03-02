import isEmpty from '../utils/isEmpty';
import { ROMAJI_REGEX } from '../constants';

/**
 * Test if `input` is [Romaji](https://en.wikipedia.org/wiki/Romaji) (including [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
 * @param  {String} [input=''] text
 * @return {Boolean} true if [Romaji](https://en.wikipedia.org/wiki/Romaji)
 * @example
 * isRomaji('Tōkyō and Ōsaka')
 * // => true
 * isRomaji('a*b&c-d')
 * // => true
 * isRomaji('あアA')
 * // => false
 * isRomaji('お願い')
 * // => false
 * isRomaji('a！b&cーd') // Full-width punctuation fails
 * // => false
 */
function isRomaji(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every((char) => ROMAJI_REGEX.test(char));
}

export default isRomaji;
