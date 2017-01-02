import isCharKanji from '../utils/isCharKanji';

/**
 * Test if all chars are Kanji (CJK ideographs)
 * @param  {String} input text to test
 * @return {Boolean} true if all Kanji, else false
 */
function isKanji(input) {
  return [...input].every(isCharKanji);
}

export default isKanji;
