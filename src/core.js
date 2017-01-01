import {
  HIRAGANA_START,
  KATAKANA_START,
  UPPERCASE_END,
  UPPERCASE_START,
  KANJI_KANA_REGEX,
} from './constants';

import {
  fourCharacterEdgeCases,
  longVowels,
  JtoR,
  RtoJ,
} from './characterTables';

import {
  getChunk,
  getChunkSize,
  isCharLongDash,
  isCharSlashDot,
  isCharConsonant,
  isCharPunctuation,
  isCharHiragana,
  isCharKana,
  isCharKanji,
  isCharInRange,
  isCharKatakana,
  isCharVowel,
  isCharUpperCase,
} from './utils';

/**
 * Default config for KanaWana, user passed options will be merged with this
 * @type {Object}
 */
export const defaultOptions = {
  // Set to true to use obsolete characters, such as ゐ and ゑ.
  useObsoleteKana: false,
  // Set to true to pass romaji when using mixed syllabaries with toKatakana() or toHiragana(),
  // so: "romaji is not ヒラガナ" -> "romaji is not ひらがな"
  passRomaji: false,
  // Set to true to handle input from a text input as it is typed.
  IMEMode: false,
};

/**
 * Convert katakana to hiragana
 * @param  {String} kata text input
 * @return {String} converted text
 */
export function katakanaToHiragana(kata) {
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
      hira.push(longVowels[romaji]);
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

/**
 * Convert hiragana to katakana
 * @param  {String} hira text input
 * @return {String} converted text
 */
export function hiraganaToKatakana(hira) {
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

/**
 * Convert romaji to hiragana
 * @param  {String} roma text input
 * @param  {Object}
 * @return {String} converted text
 */
export function romajiToHiragana(roma, options = {}) {
  return romajiToKana(roma, options, true);
}

export function isHiragana(input) {
  return [...input].every(isCharHiragana);
}

export function isKatakana(input) {
  return [...input].every(isCharKatakana);
}

export function isKana(input) {
  return [...input].every(isCharKana);
}

export function isRomaji(input) {
  return [...input].every((char) =>
    !isHiragana(char) && !isKatakana(char) && !isKanji(char)
  );
}

export function isKanji(input) {
  return [...input].every(isCharKanji);
}

// Test if input is All Japanese, for mixes of kanji and kana like "泣き虫。"
// Includes Japanese full-width punctuation ranges
export function isKanjiKana(input) {
  return [...input].every((char) => KANJI_KANA_REGEX.test(char));
}

/**
 * Test if input is a mix of kana and romaji, defaults to skip kanji
 * @param  {String} input text
 * @param  {Object} [options={ passKanji: true }] optional config to skip over kanji
 * @return {Boolean} true if input is mixed
 */
export function isMixed(input, options = { passKanji: true }) {
  const chars = [...input];
  let hasKanji = false;
  if (!options.passKanji) {
    hasKanji = chars.some(isKanji);
  }
  return (chars.some(isHiragana) || chars.some(isKatakana)) && chars.some(isRomaji) && !hasKanji;
}

export function toHiragana(input, options = {}) {
  const config = Object.assign({}, defaultOptions, options);
  if (config.passRomaji) return katakanaToHiragana(input);
  if (isRomaji(input)) return romajiToHiragana(input, config);
  if (isMixed(input, { passKanji: true })) {
    const romaji = katakanaToHiragana(input);
    return romajiToHiragana(romaji, config);
  }
  return katakanaToHiragana(input);
}

export function toKatakana(input, options = {}) {
  const config = Object.assign({}, defaultOptions, options);
  if (config.passRomaji) return hiraganaToKatakana(input);
  if (isRomaji(input) || isMixed(input)) {
    const romaji = romajiToHiragana(input, config);
    return hiraganaToKatakana(romaji);
  }
  return hiraganaToKatakana(input);
}

export function toKana(input, options) {
  return romajiToKana(input, options);
}

export function toRomaji(input, options) {
  return hiraganaToRomaji(input, options);
}

function hiraganaToRomaji(hira, options = {}) {
  // merge options with default options
  const config = Object.assign({}, defaultOptions, options);
  const len = hira.length;
  // Final output array
  const roma = [];
  // Position in the string that is being evaluated
  let cursor = 0;
  const maxChunk = 2;
  let chunkSize = 2;
  let chunk = '';
  let romaChar = '';
  let nextCharIsDoubleConsonant;

  while (cursor < len) {
    chunkSize = getChunkSize(maxChunk, len - cursor);
    let convertThisChunkToUppercase = false;
    while (chunkSize > 0) {
      chunk = getChunk(hira, cursor, cursor + chunkSize);
      if (isKatakana(chunk)) {
        convertThisChunkToUppercase = config.convertKatakanaToUppercase;
        chunk = katakanaToHiragana(chunk);
      }
      // special case for small tsus
      if (chunk.charAt(0) === 'っ' && chunkSize === 1 && cursor < (len - 1)) {
        nextCharIsDoubleConsonant = true;
        romaChar = '';
        break;
      }

      romaChar = JtoR[chunk];

      if ((romaChar != null) && nextCharIsDoubleConsonant) {
        romaChar = romaChar.charAt(0).concat(romaChar);
        nextCharIsDoubleConsonant = false;
      }
      // console.log(`${cursor}x${chunkSize}:${chunk} => ${romaChar}`);
      if (romaChar != null) {
        break;
      }
      chunkSize -= 1;
    }
    if (romaChar == null) {
      // Passthrough undefined values
      romaChar = chunk;
    }

    if (convertThisChunkToUppercase) {
      romaChar = romaChar.toUpperCase();
    }
    roma.push(romaChar);
    cursor += chunkSize || 1;
  }

  return roma.join('');
}

export function romajiToKana(roma, options = {}, ignoreCase = false) {
  const config = Object.assign({}, defaultOptions, options);
  // Final output array
  const kana = [];
  // Position in the string that is being evaluated
  let cursor = 0;
  const len = roma.length;
  const maxChunk = 3;
  let chunkSize = 3;
  let chunk = '';
  let chunkLC = '';

  // Steps through the string pulling out chunks of characters. Each chunk will be evaluated
  // against the romaji to kana table. If there is no match, the last character in the chunk
  // is dropped and the chunk is reevaluated. If nothing matches, the character is assumed
  // to be invalid or punctuation or other and gets passed through.
  while (cursor < len) {
    let kanaChar = null;
    chunkSize = getChunkSize(maxChunk, len - cursor);
    while (chunkSize > 0) {
      chunk = getChunk(roma, cursor, cursor + chunkSize);
      chunkLC = chunk.toLowerCase();
      // Handle super-rare edge cases with 4 char chunks (like ltsu, chya, shya)
      if (fourCharacterEdgeCases.includes(chunkLC) && (len - cursor) >= 4) {
        chunkSize += 1;
        chunk = getChunk(roma, cursor, cursor + chunkSize);
        chunkLC = chunk.toLowerCase();
      } else {
        // Handle edge case of n followed by consonant
        if (chunkLC.charAt(0) === 'n') {
          if (chunkSize === 2) {
            // Handle edge case of n followed by a space (only if not in IME mode)
            if (!config.IMEMode && chunkLC.charAt(1) === ' ') {
              kanaChar = 'ん ';
              break;
            }
            // Convert IME input of n' to "ん"
            if (config.IMEMode && chunkLC === "n'") {
              kanaChar = 'ん';
              break;
            }
          }
          // Handle edge case of n followed by n and vowel
          if (isCharConsonant(chunkLC.charAt(1), false) && isCharVowel(chunkLC.charAt(2))) {
            chunkSize = 1;
            chunk = getChunk(roma, cursor, cursor + chunkSize);
            chunkLC = chunk.toLowerCase();
          }
        }

        // Handle case of double consonants
        if (chunkLC.charAt(0) !== 'n' &&
          isCharConsonant(chunkLC.charAt(0)) &&
          chunk.charAt(0) === chunk.charAt(1)
        ) {
          chunkSize = 1;
          // Return katakana ッ if chunk is uppercase, otherwise return hiragana っ
          if (isCharInRange(chunk.charAt(0), UPPERCASE_START, UPPERCASE_END)) {
            chunkLC = chunk = 'ッ';
          } else {
            chunkLC = chunk = 'っ';
          }
        }
      }

      kanaChar = RtoJ[chunkLC];
      // console.log(`${cursor}x${chunkSize}:${chunk} => ${kanaChar}`); // DEBUG
      if (kanaChar != null) {
        break;
      }
      // Step down the chunk size.
      // If chunkSize was 4, step down twice.
      if (chunkSize === 4) {
        chunkSize -= 2;
      } else {
        chunkSize -= 1;
      }
    }

    // Passthrough undefined values
    if (kanaChar == null) {
      kanaChar = chunk;
    }

    // Handle special cases.
    if (config.useObsoleteKana) {
      if (chunkLC === 'wi') kanaChar = 'ゐ';
      if (chunkLC === 'we') kanaChar = 'ゑ';
    }

    if (!!config.IMEMode && chunkLC.charAt(0) === 'n') {
      if ((roma.charAt(cursor + 1).toLowerCase() === 'y' &&
        isCharVowel(roma.charAt(cursor + 2)) === false) ||
        cursor === (len - 1) ||
        isKana(roma.charAt(cursor + 1))
      ) {
        // Don't transliterate this yet.
        kanaChar = chunk.charAt(0);
      }
    }

    // Use katakana if first letter in chunk is uppercase
    if (!ignoreCase) {
      if (isCharUpperCase(chunk.charAt(0))) {
        kanaChar = hiraganaToKatakana(kanaChar);
      }
    }

    kana.push(kanaChar);
    cursor += chunkSize || 1;
  }

  return kana.join('');
}

/**
 * Strips trailing okurigana if input is a mix of kanji and kana
 * @param  {String} input text to parse
 * @param  {Object} [options={ all: false }] config object specifying if *all* kana should be removed
 * @return {String} string new string with trailing okurigana removed
 */
export function stripOkurigana(input, options = { all: false }) {
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
