import { DEFAULT_OPTIONS } from '../constants';
import hiraganaToKatakana from './hiraganaToKatakana';
import isRomaji from './isRomaji';
import isRomajiKana from './isRomajiKana';
import romajiToHiragana from './romajiToHiragana';

/**
 * Convert input to [Katakana](https://en.wikipedia.org/wiki/Katakana)
 * @param  {String} [input=''] text
 * @param  {Object} [options={ useObsoleteKana: false, passRomaji: false }]
 * @return {String} converted text
 * @example
 * toKatakana('toukyou, おおさか')
 * // => 'トウキョウ、　オオサカ'
 * toKatakana('only かな', { passRomaji: true })
 * // => 'only カナ'
 * toKatakana('wi')
 * // => 'うぃ'
 * toKatakana('wi', { useObsoleteKana: true })
 * // => 'ヰ'
*/
function toKatakana(input = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  if (config.passRomaji) return hiraganaToKatakana(input);
  if (isRomaji(input) || isRomajiKana(input)) {
    const romaji = romajiToHiragana(input, config);
    return hiraganaToKatakana(romaji);
  }
  return hiraganaToKatakana(input);
}

export default toKatakana;
