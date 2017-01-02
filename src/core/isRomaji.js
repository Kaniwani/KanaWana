import isHiragana from './isHiragana';
import isKatakana from './isKatakana';
import isKanji from './isKanji';

/**
 * Test if text is all Romaji (by determining that it isn't kana or kanji)
 * @param  {String} input text to test
 * @return {Boolean} true if not kana or kanji
 */
export default function isRomaji(input) {
  return [...input].every((char) => !isHiragana(char) && !isKatakana(char) && !isKanji(char));
}
