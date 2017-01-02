import {
  LONG_VOWELS,
  KATAKANA_START,
  HIRAGANA_START,
} from '../constants';

import isCharLongDash from '../utils/isCharLongDash';
import isCharSlashDot from '../utils/isCharSlashDot';
import isCharKatakana from '../utils/isCharKatakana';

import hiraganaToRomaji from './hiraganaToKatakana';

/**
 * Convert katakana to hiragana
 * @param  {String} kata text input
 * @return {String} converted text
 */
export default function katakanaToHiragana(kata) {
  const hira = [];
  let previousKana = '';
  const iterable = kata.split('');
  for (let index = 0; index < iterable.length; index += 1) {
    const kataChar = iterable[index];
    const [slashDot, longDash] = [isCharSlashDot(kataChar), isCharLongDash(kataChar)];
    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
    if (slashDot || (longDash && index < 1)) {
      hira.push(kataChar);
    // Transform long vowels: 'オー' to 'おう'
    } else if (longDash && index > 0) {
      // Transform previousKana back to romaji
      const romaji = hiraganaToRomaji(previousKana).slice(-1);
      hira.push(LONG_VOWELS[romaji]);
    } else if (isCharKatakana(kataChar)) {
      // Shift charcode.
      const code = kataChar.charCodeAt(0) + (HIRAGANA_START - KATAKANA_START);
      const hiraChar = String.fromCharCode(code);
      hira.push(hiraChar);
      previousKana = hiraChar;
    } else {
      // Pass non katakana chars through
      hira.push(kataChar);
      previousKana = '';
    }
  }
  return hira.join('');
}
