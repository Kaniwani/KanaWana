import { DEFAULT_OPTIONS } from '../constants';
import hiraganaToKatakana from './hiraganaToKatakana';
import isRomaji from './isRomaji';
import isRomajiKana from './isRomajiKana';
import romajiToHiragana from './romajiToHiragana';

/**
 * Converts input to katakana.
 * @param  {String} input text to convert
 * @param  {Object} options used interally to pass along default options
 * @return {String} converted text
 * @example
 * toKatakana('hiragana')
 * // => 'ヒラガナ'
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
