import {
  KATAKANA_START,
  HIRAGANA_START,
} from '../constants';

import isCharLongDash from '../utils/isCharLongDash';
import isCharSlashDot from '../utils/isCharSlashDot';
import isCharHiragana from '../utils/isCharHiragana';

/**
 * Convert hiragana to katakana
 * @param  {String} hira text input
 * @return {String} converted text
 * @example
 * hiraganaToKatakana('ひらがな')
 * // => "ヒラガナ"
 */
function hiraganaToKatakana(hira) {
  const kata = [];
  hira.split('').forEach((hiraChar) => {
    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
    if (isCharLongDash(hiraChar) || isCharSlashDot(hiraChar)) {
      kata.push(hiraChar);
    } else if (isCharHiragana(hiraChar)) {
      // Shift charcode.
      const code = hiraChar.charCodeAt(0) + (KATAKANA_START - HIRAGANA_START);
      const kataChar = String.fromCharCode(code);
      kata.push(kataChar);
    } else {
      // Pass non hiragana chars through
      kata.push(hiraChar);
    }
  });
  return kata.join('');
}

export default hiraganaToKatakana;
