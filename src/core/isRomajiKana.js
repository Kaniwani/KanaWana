import isKanji from './isKanji';
import isHiragana from './isHiragana';
import isKatakana from './isKatakana';
import isRomaji from './isRomaji';

/**
 * Test if `input` is a mix of [Romaji](https://en.wikipedia.org/wiki/Romaji) *and* [Kana](https://en.wikipedia.org/wiki/Kana), defaults to skip over [Kanji](https://en.wikipedia.org/wiki/Kanji)
 * @param  {String} input text
 * @param  {Object} [options={ passKanji: true }] optional config to skip over kanji
 * @return {Boolean} true if mixed
 * @example
 * isRomajiKana('Abあア'))
 * // => true
 * isRomajiKana('お腹A'))
 * // => true
 * isRomajiKana('お腹A', { passKanji: false }))
 * // => false
 * isRomajiKana('ab'))
 * // => false
 * isRomajiKana('あア'))
 * // => false
 */
function isRomajiKana(input = '', options = { passKanji: true }) {
  const chars = [...input];
  let hasKanji = false;
  if (!options.passKanji) {
    hasKanji = chars.some(isKanji);
  }
  return (chars.some(isHiragana) || chars.some(isKatakana)) && chars.some(isRomaji) && !hasKanji;
}

export default isRomajiKana;
