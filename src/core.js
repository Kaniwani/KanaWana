/* eslint-disable no-console */

import {
  fourCharacterEdgeCases,
  longVowels,
  JtoR,
  RtoJ,
} from './characterTables';

import {
  convertFullwidthCharsToASCII,
  isCharConsonant,
  isCharHiragana,
  isCharInRange,
  isCharKatakana,
  isCharVowel,
  getChunk,
  getChunkSize,
  isCharUpperCase,
} from './utils';

import {
  HIRAGANA_START,
  KATAKANA_PROLONGED_SOUND_MARK,
  KATAKANA_START,
  UPPERCASE_END,
  UPPERCASE_START,
} from './constants';

export const defaultOptions = {
  // Transliterates wi and we to ゐ and ゑ
  useObsoleteKana: false,
  // Special mode for handling input from a text input that is transliterated on the fly.
  IMEMode: false,
};

export function onInput(event) {
  const input = event.target;
  // const startingCursor = input.selectionStart;
  // const startingLength = input.value.length;
  const normalizedInputString = convertFullwidthCharsToASCII((input.value));
  const newText = (toKana(normalizedInputString, { IMEMode: true }));
  if (normalizedInputString !== newText) {
    input.value = newText;
    if (typeof input.selectionStart === 'number') {
      input.selectionStart = input.selectionEnd = input.value.length;
      return;
    }
    if (typeof input.createTextRange !== 'undefined') {
      input.focus();
      const range = input.createTextRange();
      range.collapse(false);
      range.select();
    }
  }
}

export function bind(input) {
  input.addEventListener('input', onInput);
}

export function unbind(input) {
  input.removeEventListener('input', onInput);
}

export function katakanaToHiragana(kata) {
  const hira = [];
  let previousKana = '';
  const iterable = kata.split('');
  for (let index = 0; index < iterable.length; index+=1) {
    const kataChar = iterable[index];
    if (isCharKatakana(kataChar)) {
      let code = kataChar.charCodeAt(0);
      if (code === KATAKANA_PROLONGED_SOUND_MARK && index > 0) {
        // transform previousKana to romaji
        let romaji = hiraganaToRomaji(previousKana);
        romaji = romaji.slice(-1);

        if (longVowels != null) {
          hira.push(longVowels[romaji]);
        } else {
          hira.push(kataChar);
        }
      } else {
        // Shift charcode.
        code += HIRAGANA_START - KATAKANA_START;
        const hiraChar = String.fromCharCode(code);
        hira.push(hiraChar);
        previousKana = hiraChar;
      }
    } else {
      // pass non katakana chars through
      hira.push(kataChar);
      previousKana = '';
    }
  }
  return hira.join('');
}

export function hiraganaToKatakana(hira) {
  const kata = [];
  hira.split('').forEach(hiraChar => {
    if (isCharHiragana(hiraChar)) {
      let code = hiraChar.charCodeAt(0);
      // Shift charcode.
      code += KATAKANA_START - HIRAGANA_START;
      const kataChar = String.fromCharCode(code);
      kata.push(kataChar);
    } else {
      // pass non hiragana chars through
      kata.push(hiraChar);
    }
  });
  return kata.join('');
}

export function romajiToHiragana(roma, options) {
  return romajiToKana(roma, options, true);
}

export function convertPunctuation(input, options) {
  if (input === '　') { return ' '; }
  if (input === '-') { return 'ー'; }
  return input;
}

/**
* Returns true if input is entirely hiragana.
*/
export function isHiragana(input) {
  const chars = input.split('');
  return chars.every(isCharHiragana);
}

export function isKatakana(input) {
  const chars = input.split('');
  return chars.every(isCharKatakana);
}

export function isKana(input) {
  const chars = input.split('');
  return chars.every(char => (isHiragana(char)) || (isKatakana(char)));
}

export function isRomaji(input) {
  const chars = input.split('');
  return chars.every(char => (!isHiragana(char)) && (!isKatakana(char)));
}


export function toHiragana(input, options) {
  if (isRomaji(input)) {
    return romajiToHiragana(input, options);
  }
  if (isKatakana(input)) {
    return katakanaToHiragana(input, options);
  }
  // otherwise
  return input;
}

export function toKatakana(input, options) {
  if (isHiragana(input)) {
    return hiraganaToKatakana(input, options);
  }
  if (isRomaji(input)) {
    const romaji = romajiToHiragana(input, options);
    return hiraganaToKatakana(romaji, options);
  }
  // otherwise
  return input;
}

export function toKana(input, options) {
  return romajiToKana(input, options);
}

export function toRomaji(input, options) {
  return hiraganaToRomaji(input, options);
}

function hiraganaToRomaji(hira, opts = {}) {
  // merge options with default options
  const options = Object.assign({}, defaultOptions, opts);
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
        convertThisChunkToUppercase = options.convertKatakanaToUppercase;
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
      // console.log(`Couldn't find ${chunk}. Passing through.`);
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

export function romajiToKana(roma, opts = {}, ignoreCase = false) {
  // merge options with default options
  const options = Object.assign({}, defaultOptions, opts);
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
      if (fourCharacterEdgeCases.includes(chunkLC) && (len-cursor) >= 4) {
        chunkSize += 1;
        chunk = getChunk(roma, cursor, cursor + chunkSize);
        chunkLC = chunk.toLowerCase();
      } else {
        // Handle edge case of n followed by consonant
        if (chunkLC.charAt(0) === 'n') {
          if (chunkSize === 2) {
            // Handle edge case of n followed by a space (only if not in IME mode)
            if (!options.IMEMode && chunkLC.charAt(1) === ' ') {
              kanaChar = 'ん ';
              break;
            }
            // Convert IME input of n' to "ん"
            if (options.IMEMode && chunkLC === "n'") {
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

    if (kanaChar == null) {
      chunk = convertPunctuation(chunk);
      // console.log(`Couldn't find ${chunk}. Passing through.`); // DEBUG
      // Passthrough undefined values
      kanaChar = chunk;
    }

    // Handle special cases.
    if (options.useObsoleteKana) {
      if (chunkLC === 'wi') kanaChar = 'ゐ';
      if (chunkLC === 'we') kanaChar = 'ゑ';
    }

    if (!!options.IMEMode && chunkLC.charAt(0) === 'n') {
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
