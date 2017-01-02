import { DEFAULT_OPTIONS } from '../constants';
import katakanaToHiragana from './katakanaToHiragana';
import isRomaji from './isRomaji';
import isRomajiKana from './isRomajiKana';
import romajiToHiragana from './romajiToHiragana';


export default function toHiragana(input, options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  if (config.passRomaji) return katakanaToHiragana(input);
  if (isRomaji(input)) return romajiToHiragana(input, config);
  if (isRomajiKana(input, { passKanji: true })) {
    const romaji = katakanaToHiragana(input);
    return romajiToHiragana(romaji, config);
  }
  return katakanaToHiragana(input);
}
