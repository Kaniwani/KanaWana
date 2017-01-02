import isKanji from './isKanji';
import isHiragana from './isHiragana';
import isKatakana from './isKatakana';
import isRomaji from './isRomaji';

/**
 * Test if input is a mix of romaji and kana, defaults to skip kanji
 * @param  {String} input text
 * @param  {Object} [options={ passKanji: true }] optional config to skip over kanji
 * @return {Boolean} true if input is mixed
 */
function isRomajiKana(input, options = { passKanji: true }) {
  const chars = [...input];
  let hasKanji = false;
  if (!options.passKanji) {
    hasKanji = chars.some(isKanji);
  }
  return (chars.some(isHiragana) || chars.some(isKatakana)) && chars.some(isRomaji) && !hasKanji;
}

export default isRomajiKana;
