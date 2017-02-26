import { DEFAULT_OPTIONS } from '../constants';
import katakanaToHiragana from './katakanaToHiragana';
import isRomaji from './isRomaji';
import isRomajiKana from './isRomajiKana';
import romajiToHiragana from './romajiToHiragana';

/**
 * Convert input to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * @param  {String} [input=''] text
 * @param  {Object} [options={ useObsoleteKana: false, passRomaji: false }]
 * @return {String} converted text
 * @example
 * toHiragana('toukyou, オオサカ')
 * // => 'とうきょう、　おおさか'
 * toHiragana('only カナ', { passRomaji: true })
 * // => 'only かな'
 * toHiragana('wi')
 * // => 'うぃ'
 * toHiragana('wi', { useObsoleteKana: true })
 * // => 'ゐ'
*/
function toHiragana(input = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  if (config.passRomaji) return katakanaToHiragana(input);
  if (isRomaji(input)) return romajiToHiragana(input, config);
  if (isRomajiKana(input, { passKanji: true })) {
    const romaji = katakanaToHiragana(input);
    return romajiToHiragana(romaji, config);
  }
  return katakanaToHiragana(input);
}

export default toHiragana;
