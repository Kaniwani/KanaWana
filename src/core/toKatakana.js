import { DEFAULT_OPTIONS } from '../constants';
import hiraganaToKatakana from './hiraganaToKatakana';
import isRomaji from './isRomaji';
import isRomajiKana from './isRomajiKana';
import romajiToHiragana from './romajiToHiragana';

export default function toKatakana(input, options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  if (config.passRomaji) return hiraganaToKatakana(input);
  if (isRomaji(input) || isRomajiKana(input)) {
    const romaji = romajiToHiragana(input, config);
    return hiraganaToKatakana(romaji);
  }
  return hiraganaToKatakana(input);
}
