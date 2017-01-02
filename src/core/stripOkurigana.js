import isCharKana from '../utils/isCharKana';
import isCharPunctuation from '../utils/isCharPunctuation';
import isKanjiKana from './isKanjiKana';
import isKana from './isKana';
import isKanji from './isKanji';

/**
 * Strips trailing okurigana if input is a mix of kanji and kana
 * @param  {String} input text to parse
 * @param  {Object} [options={ all: false }] config object specifying if *all* kana should be removed
 * @return {String} string new string with trailing okurigana removed
 */
export default function stripOkurigana(input, options = { all: false }) {
  if (!isKanjiKana(input) || isKana(input)) return input;
  const chars = [...input];

  // strip every kana
  if (options.all) return chars.filter((char) => !isCharKana(char)).join('');

  // strip trailing only
  const reverseChars = chars.reverse();
  for (let i = 0, len = reverseChars.length; i < len; i += 1) {
    const char = reverseChars[i];
    // pass if it's punctuation
    if (isCharPunctuation(char)) continue; // eslint-disable-line no-continue
    // blank out if not kanji
    if (!isKanji(char)) {
      reverseChars[i] = '';
    } else break; // stop when we hit a kanji char
  }

  return reverseChars.reverse().join('');
}
