import {
  ENGLISH_PUNCTUATION_RANGES,
  JAPANESE_FULLWIDTH_PUNCTUATION_RANGES,
  HIRAGANA_START,
  HIRAGANA_END,
  KATAKANA_START,
  KATAKANA_END,
  KANJI_START,
  KANJI_END,
  PROLONGED_SOUND_MARK,
  KANA_SLASH_DOT,
  LOWERCASE_FULLWIDTH_START,
  LOWERCASE_FULLWIDTH_END,
  LOWERCASE_START,
  UPPERCASE_FULLWIDTH_START,
  UPPERCASE_FULLWIDTH_END,
  UPPERCASE_START,
  UPPERCASE_END,
} from './constants';

/**
 * Returns a substring based on start/end values
 * @param  {String} text
 * @param  {Number} start index
 * @param  {Number} end index
 * @return {String} new substring
 */
export function getChunk(text, start, end) {
  return text.slice(start, end);
}

/**
 * Don't pick a chunk that is bigger than the remaining characters.
 * @param  {Number} max index limit
 * @param  {Number} remaining
 * @return {Number}
 */
export function getChunkSize(max, remaining) {
  return Math.min(max, remaining);
}

/**
 * Checks if char is in English unicode uppercase range
 * @param  {String} char
 * @return {Boolean}
 */
export function isCharUpperCase(char) {
  return isCharInRange(char, UPPERCASE_START, UPPERCASE_END);
}

/**
 * Takes a character and a unicode range. Returns true if the char is in the range.
 * @param  {String}  char  unicode character
 * @param  {Number}  start unicode start range
 * @param  {Number}  end   unicode end range
 * @return {Boolean}
 */
export function isCharInRange(char, start, end) {
  const code = char.charCodeAt(0);
  return start <= code && code <= end;
}

/**
 * Tests a character and an english vowel. Returns true if the char is a vowel.
 * @param  {String} char
 * @param  {Boolean} [includeY=true] Optional parameter to include y as a vowel in test
 * @return {Boolean}
 */
export function isCharVowel(char, includeY = true) {
  const regexp = includeY ? /[aeiouy]/ : /[aeiou]/;
  return char.toLowerCase().charAt(0).search(regexp) !== -1;
}

/**
 * Tests a character and an english consonant. Returns true if the char is a consonant.
 * @param  {String} char
 * @param  {Boolean} [includeY=true] Optional parameter to include y as a consonant in test
 * @return {Boolean}
 */
export function isCharConsonant(char, includeY = true) {
  const regexp = includeY ? /[bcdfghjklmnpqrstvwxyz]/ : /[bcdfghjklmnpqrstvwxz]/;
  return char.toLowerCase().charAt(0).search(regexp) !== -1;
}

/**
 * Returns true if char is 'ー'
 * @param  {String} char
 * @return {Boolean}
 */
export function isCharLongDash(char) {
  return char.charCodeAt(0) === PROLONGED_SOUND_MARK;
}

/**
 * Returns true if char is '・'
 * @param  {String} char
 * @return {Boolean}
 */
export function isCharSlashDot(char) {
  return char.charCodeAt(0) === KANA_SLASH_DOT;
}

/**
 * Tests a character. Returns true if the character is katakana.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export function isCharKatakana(char) {
  return isCharInRange(char, KATAKANA_START, KATAKANA_END);
}

/**
 * Tests a character. Returns true if the character is Hiragana.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export function isCharHiragana(char) {
  if (isCharLongDash(char)) return true;
  return isCharInRange(char, HIRAGANA_START, HIRAGANA_END);
}

/**
 * Tests a character. Returns true if the character is hiragana or katakana.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export function isCharKana(char) {
  return isCharHiragana(char) || isCharKatakana(char);
}

/**
 * Tests a character. Returns true if the character is a CJK ideograph (kanji).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export function isCharKanji(char) {
  return isCharInRange(char, KANJI_START, KANJI_END);
}

/**
 * Tests a character. Returns true if the character is considered Japanese punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export function isCharJapanesePunctuation(char) {
  return JAPANESE_FULLWIDTH_PUNCTUATION_RANGES.some(([start, end]) => isCharInRange(char, start, end));
}

/**
 * Tests a character. Returns true if the character is considered English punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export function isCharEnglishPunctuation(char) {
  return ENGLISH_PUNCTUATION_RANGES.some(([start, end]) => isCharInRange(char, start, end));
}

/**
 * Tests a character. Returns true if the character is considered Japanese or English punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
export function isCharPunctuation(char) {
  return isCharEnglishPunctuation(char) || isCharJapanesePunctuation(char);
}

/**
 * Converts all fullwidth roman letters in string to proper ASCII
 * @param  {String} text Full Width roman letters
 * @return {String} ASCII
 */
export function convertFullwidthCharsToASCII(text) {
  const asciiChars = text.split('').map((char) => {
    const code = char.charCodeAt(0);
    const lower = isCharInRange(char, LOWERCASE_FULLWIDTH_START, LOWERCASE_FULLWIDTH_END);
    const upper = isCharInRange(char, UPPERCASE_FULLWIDTH_START, UPPERCASE_FULLWIDTH_END);
    if (lower) {
      return String.fromCharCode((code - LOWERCASE_FULLWIDTH_START) + LOWERCASE_START);
    } else if (upper) {
      return String.fromCharCode((code - UPPERCASE_FULLWIDTH_START) + UPPERCASE_START);
    }
    return char;
  });

  return asciiChars.join('');
}
