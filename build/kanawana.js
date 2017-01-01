module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defaultOptions = undefined;
	exports.bind = bind;
	exports.unbind = unbind;
	exports.katakanaToHiragana = katakanaToHiragana;
	exports.hiraganaToKatakana = hiraganaToKatakana;
	exports.romajiToHiragana = romajiToHiragana;
	exports.isHiragana = isHiragana;
	exports.isKatakana = isKatakana;
	exports.isKana = isKana;
	exports.isRomaji = isRomaji;
	exports.isKanji = isKanji;
	exports.isKanjiKana = isKanjiKana;
	exports.isMixed = isMixed;
	exports.toHiragana = toHiragana;
	exports.toKatakana = toKatakana;
	exports.toKana = toKana;
	exports.toRomaji = toRomaji;
	exports.romajiToKana = romajiToKana;
	exports.stripOkurigana = stripOkurigana;

	var _constants = __webpack_require__(2);

	var _characterTables = __webpack_require__(3);

	var _utils = __webpack_require__(4);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var defaultOptions = exports.defaultOptions = {
	  // Set to true to use obsolete characters, such as ゐ and ゑ.
	  useObsoleteKana: false,
	  // Set to true to pass romaji when using mixed syllabaries with toKatakana() or toHiragana(),
	  // so: "romaji is not ヒラガナ" -> "romaji is not ひらがな"
	  passRomaji: false,
	  // Set to true to handle input from a text input as it is typed.
	  IMEMode: false
	};

	function bind(input, options) {
	  input.addEventListener('input', function (event) {
	    return onInput(event, options);
	  });
	}

	function unbind(input) {
	  input.removeEventListener('input', onInput);
	}

	function onInput(event, opts) {
	  var options = Object.assign({}, defaultOptions, opts, { IMEMode: true });
	  var input = event.target;
	  // const startingCursor = input.selectionStart;
	  // const startingLength = input.value.length;
	  var normalizedInputString = (0, _utils.convertFullwidthCharsToASCII)(input.value);
	  var newText = toKana(normalizedInputString, options);
	  if (normalizedInputString !== newText) {
	    input.value = newText;
	    if (typeof input.selectionStart === 'number') {
	      input.selectionStart = input.selectionEnd = input.value.length;
	      return;
	    }
	    if (typeof input.createTextRange !== 'undefined') {
	      input.focus();
	      var range = input.createTextRange();
	      range.collapse(false);
	      range.select();
	    }
	  }
	}

	function katakanaToHiragana(kata) {
	  var hira = [];
	  var previousKana = '';
	  var iterable = kata.split('');
	  for (var index = 0; index < iterable.length; index += 1) {
	    var kataChar = iterable[index];
	    var _ref = [(0, _utils.isCharSlashDot)(kataChar), (0, _utils.isCharLongDash)(kataChar)],
	        slashDot = _ref[0],
	        longDash = _ref[1];
	    // Short circuit to avoid incorrect codeshift for 'ー' and '・'

	    if (slashDot || longDash && index < 1) {
	      hira.push(kataChar);
	      // Transform long vowels: 'オー' to 'おう'
	    } else if (longDash && index > 0) {
	      // Transform previousKana back to romaji
	      var romaji = hiraganaToRomaji(previousKana).slice(-1);
	      hira.push(_characterTables.longVowels[romaji]);
	    } else if ((0, _utils.isCharKatakana)(kataChar)) {
	      // Shift charcode.
	      var code = kataChar.charCodeAt(0) + (_constants.HIRAGANA_START - _constants.KATAKANA_START);
	      var hiraChar = String.fromCharCode(code);
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

	function hiraganaToKatakana(hira) {
	  var kata = [];
	  hira.split('').forEach(function (hiraChar) {
	    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
	    if ((0, _utils.isCharLongDash)(hiraChar) || (0, _utils.isCharSlashDot)(hiraChar)) {
	      kata.push(hiraChar);
	    } else if ((0, _utils.isCharHiragana)(hiraChar)) {
	      // Shift charcode.
	      var code = hiraChar.charCodeAt(0) + (_constants.KATAKANA_START - _constants.HIRAGANA_START);
	      var kataChar = String.fromCharCode(code);
	      kata.push(kataChar);
	    } else {
	      // Pass non hiragana chars through
	      kata.push(hiraChar);
	    }
	  });
	  return kata.join('');
	}

	function romajiToHiragana(roma, options) {
	  return romajiToKana(roma, options, true);
	}

	function isHiragana(input) {
	  return [].concat(_toConsumableArray(input)).every(_utils.isCharHiragana);
	}

	function isKatakana(input) {
	  return [].concat(_toConsumableArray(input)).every(_utils.isCharKatakana);
	}

	function isKana(input) {
	  return [].concat(_toConsumableArray(input)).every(_utils.isCharKana);
	}

	function isRomaji(input) {
	  return [].concat(_toConsumableArray(input)).every(function (char) {
	    return !isHiragana(char) && !isKatakana(char) && !isKanji(char);
	  });
	}

	function isKanji(input) {
	  return [].concat(_toConsumableArray(input)).every(_utils.isCharKanji);
	}

	// Test if input is All Japanese, for mixes of kanji and kana like "泣き虫。"
	// Includes Japanese full-width punctuation ranges
	function isKanjiKana(input) {
	  return [].concat(_toConsumableArray(input)).every(function (char) {
	    return _constants.KANJI_KANA_REGEX.test(char);
	  });
	}

	/**
	 * Test if input is a mix of kana and romaji, defaults to skip kanji
	 * @param  {String} input text
	 * @param  {Object} [options={ passKanji: true }] optional config to skip over kanji
	 * @return {Boolean} true if input is mixed
	 */
	function isMixed(input) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { passKanji: true };

	  var chars = [].concat(_toConsumableArray(input));
	  var hasKanji = false;
	  if (!options.passKanji) {
	    hasKanji = chars.some(isKanji);
	  }
	  return (chars.some(isHiragana) || chars.some(isKatakana)) && chars.some(isRomaji) && !hasKanji;
	}

	function toHiragana(input) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var options = Object.assign({}, defaultOptions, opts);
	  if (options.passRomaji) return katakanaToHiragana(input);
	  if (isRomaji(input)) return romajiToHiragana(input, options);
	  if (isMixed(input, { passKanji: true })) {
	    var romaji = katakanaToHiragana(input);
	    return romajiToHiragana(romaji, options);
	  }
	  return katakanaToHiragana(input);
	}

	function toKatakana(input) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var options = Object.assign({}, defaultOptions, opts);
	  if (options.passRomaji) return hiraganaToKatakana(input);
	  if (isRomaji(input) || isMixed(input)) {
	    var romaji = romajiToHiragana(input, options);
	    return hiraganaToKatakana(romaji);
	  }
	  return hiraganaToKatakana(input);
	}

	function toKana(input, options) {
	  return romajiToKana(input, options);
	}

	function toRomaji(input, options) {
	  return hiraganaToRomaji(input, options);
	}

	function hiraganaToRomaji(hira) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  // merge options with default options
	  var options = Object.assign({}, defaultOptions, opts);
	  var len = hira.length;
	  // Final output array
	  var roma = [];
	  // Position in the string that is being evaluated
	  var cursor = 0;
	  var maxChunk = 2;
	  var chunkSize = 2;
	  var chunk = '';
	  var romaChar = '';
	  var nextCharIsDoubleConsonant = void 0;

	  while (cursor < len) {
	    chunkSize = (0, _utils.getChunkSize)(maxChunk, len - cursor);
	    var convertThisChunkToUppercase = false;
	    while (chunkSize > 0) {
	      chunk = (0, _utils.getChunk)(hira, cursor, cursor + chunkSize);
	      if (isKatakana(chunk)) {
	        convertThisChunkToUppercase = options.convertKatakanaToUppercase;
	        chunk = katakanaToHiragana(chunk);
	      }
	      // special case for small tsus
	      if (chunk.charAt(0) === 'っ' && chunkSize === 1 && cursor < len - 1) {
	        nextCharIsDoubleConsonant = true;
	        romaChar = '';
	        break;
	      }

	      romaChar = _characterTables.JtoR[chunk];

	      if (romaChar != null && nextCharIsDoubleConsonant) {
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

	function romajiToKana(roma) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var ignoreCase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  // merge options with default options
	  var options = Object.assign({}, defaultOptions, opts);
	  // Final output array
	  var kana = [];
	  // Position in the string that is being evaluated
	  var cursor = 0;
	  var len = roma.length;
	  var maxChunk = 3;
	  var chunkSize = 3;
	  var chunk = '';
	  var chunkLC = '';

	  // Steps through the string pulling out chunks of characters. Each chunk will be evaluated
	  // against the romaji to kana table. If there is no match, the last character in the chunk
	  // is dropped and the chunk is reevaluated. If nothing matches, the character is assumed
	  // to be invalid or punctuation or other and gets passed through.
	  while (cursor < len) {
	    var kanaChar = null;
	    chunkSize = (0, _utils.getChunkSize)(maxChunk, len - cursor);
	    while (chunkSize > 0) {
	      chunk = (0, _utils.getChunk)(roma, cursor, cursor + chunkSize);
	      chunkLC = chunk.toLowerCase();
	      // Handle super-rare edge cases with 4 char chunks (like ltsu, chya, shya)
	      if (_characterTables.fourCharacterEdgeCases.includes(chunkLC) && len - cursor >= 4) {
	        chunkSize += 1;
	        chunk = (0, _utils.getChunk)(roma, cursor, cursor + chunkSize);
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
	          if ((0, _utils.isCharConsonant)(chunkLC.charAt(1), false) && (0, _utils.isCharVowel)(chunkLC.charAt(2))) {
	            chunkSize = 1;
	            chunk = (0, _utils.getChunk)(roma, cursor, cursor + chunkSize);
	            chunkLC = chunk.toLowerCase();
	          }
	        }

	        // Handle case of double consonants
	        if (chunkLC.charAt(0) !== 'n' && (0, _utils.isCharConsonant)(chunkLC.charAt(0)) && chunk.charAt(0) === chunk.charAt(1)) {
	          chunkSize = 1;
	          // Return katakana ッ if chunk is uppercase, otherwise return hiragana っ
	          if ((0, _utils.isCharInRange)(chunk.charAt(0), _constants.UPPERCASE_START, _constants.UPPERCASE_END)) {
	            chunkLC = chunk = 'ッ';
	          } else {
	            chunkLC = chunk = 'っ';
	          }
	        }
	      }

	      kanaChar = _characterTables.RtoJ[chunkLC];
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
	    if (options.useObsoleteKana) {
	      if (chunkLC === 'wi') kanaChar = 'ゐ';
	      if (chunkLC === 'we') kanaChar = 'ゑ';
	    }

	    if (!!options.IMEMode && chunkLC.charAt(0) === 'n') {
	      if (roma.charAt(cursor + 1).toLowerCase() === 'y' && (0, _utils.isCharVowel)(roma.charAt(cursor + 2)) === false || cursor === len - 1 || isKana(roma.charAt(cursor + 1))) {
	        // Don't transliterate this yet.
	        kanaChar = chunk.charAt(0);
	      }
	    }

	    // Use katakana if first letter in chunk is uppercase
	    if (!ignoreCase) {
	      if ((0, _utils.isCharUpperCase)(chunk.charAt(0))) {
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
	function stripOkurigana(input) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { all: false };

	  if (!isKanjiKana(input) || isKana(input)) return input;
	  var chars = [].concat(_toConsumableArray(input));

	  // strip every kana
	  if (options.all) return chars.filter(function (char) {
	    return !(0, _utils.isCharKana)(char);
	  }).join('');

	  // strip trailing only
	  var reverseChars = chars.reverse();
	  for (var i = 0, len = reverseChars.length; i < len; i += 1) {
	    var char = reverseChars[i];
	    // pass if it's punctuation
	    if ((0, _utils.isCharPunctuation)(char)) continue; // eslint-disable-line no-continue
	    // blank out if not kanji
	    if (!isKanji(char)) {
	      reverseChars[i] = '';
	    } else break; // stop when we hit a kanji char
	  }

	  return reverseChars.reverse().join('');
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// References
	// http://unicode-table.com
	// http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml

	var ENGLISH_PUNCTUATION_RANGES = exports.ENGLISH_PUNCTUATION_RANGES = [[0x21, 0x2F], [0x3A, 0x3F], [0x5B, 0x60], [0x7B, 0x7E]];
	var JAPANESE_FULLWIDTH_PUNCTUATION_RANGES = exports.JAPANESE_FULLWIDTH_PUNCTUATION_RANGES = [[0x3001, 0x303E], [0x30FB, 0x30FC], [0xFF01, 0xFF0F], [0xFF1A, 0xFF1F], [0xFF3B, 0xFF3F], [0xFF5B, 0xFF60]];
	var LOWERCASE_START = exports.LOWERCASE_START = 0x61;
	var LOWERCASE_END = exports.LOWERCASE_END = 0x7A;
	var UPPERCASE_START = exports.UPPERCASE_START = 0x41;
	var UPPERCASE_END = exports.UPPERCASE_END = 0x5A;
	var HIRAGANA_START = exports.HIRAGANA_START = 0x3041;
	var HIRAGANA_END = exports.HIRAGANA_END = 0x3096;
	var KATAKANA_START = exports.KATAKANA_START = 0x30A1;
	var KATAKANA_END = exports.KATAKANA_END = 0x30FC;
	var KANJI_START = exports.KANJI_START = 0x4E00;
	var KANJI_END = exports.KANJI_END = 0x9FAF;
	var LOWERCASE_FULLWIDTH_START = exports.LOWERCASE_FULLWIDTH_START = 0xFF41;
	var LOWERCASE_FULLWIDTH_END = exports.LOWERCASE_FULLWIDTH_END = 0xFF5A;
	var UPPERCASE_FULLWIDTH_START = exports.UPPERCASE_FULLWIDTH_START = 0xFF21;
	var UPPERCASE_FULLWIDTH_END = exports.UPPERCASE_FULLWIDTH_END = 0xFF3A;
	var PROLONGED_SOUND_MARK = exports.PROLONGED_SOUND_MARK = 0x30FC;
	var KANA_SLASH_DOT = exports.KANA_SLASH_DOT = 0x30FB;

	// All Japanese regex, for mixes of kanji and kana like "泣き虫"
	// Includes Japanese full-width punctuation ranges
	// doesn't include *half-width katakana / roman letters* since they should be considered typos
	var KANJI_KANA_REGEX = exports.KANJI_KANA_REGEX = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff01-\uff0f\u4e00-\u9faf\u3400-\u4dbf]/;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var longVowels = exports.longVowels = {
	  a: 'あ',
	  i: 'い',
	  u: 'う',
	  e: 'え',
	  o: 'う'
	};

	var fourCharacterEdgeCases = exports.fourCharacterEdgeCases = ['lts', 'chy', 'shy'];

	var RtoJ = exports.RtoJ = {
	  '.': '。',
	  ',': '、',
	  '/': '・',
	  '!': '！',
	  '?': '？',
	  '-': 'ー',
	  '[': '「',
	  ']': '」',
	  '(': '（',
	  ')': '）',
	  '{': '｛',
	  '}': '｝',

	  'a': 'あ',
	  'i': 'い',
	  'u': 'う',
	  'e': 'え',
	  'o': 'お',
	  'yi': 'い',
	  'wu': 'う',
	  'whu': 'う',
	  'xa': 'ぁ',
	  'xi': 'ぃ',
	  'xu': 'ぅ',
	  'xe': 'ぇ',
	  'xo': 'ぉ',
	  'xyi': 'ぃ',
	  'xye': 'ぇ',
	  'ye': 'いぇ',
	  'wha': 'うぁ',
	  'whi': 'うぃ',
	  'whe': 'うぇ',
	  'who': 'うぉ',
	  'wi': 'うぃ',
	  'we': 'うぇ',
	  'va': 'ゔぁ',
	  'vi': 'ゔぃ',
	  'vu': 'ゔ',
	  've': 'ゔぇ',
	  'vo': 'ゔぉ',
	  'vya': 'ゔゃ',
	  'vyi': 'ゔぃ',
	  'vyu': 'ゔゅ',
	  'vye': 'ゔぇ',
	  'vyo': 'ゔょ',
	  'ka': 'か',
	  'ki': 'き',
	  'ku': 'く',
	  'ke': 'け',
	  'ko': 'こ',
	  'lka': 'ヵ',
	  'lke': 'ヶ',
	  'xka': 'ヵ',
	  'xke': 'ヶ',
	  'kya': 'きゃ',
	  'kyi': 'きぃ',
	  'kyu': 'きゅ',
	  'kye': 'きぇ',
	  'kyo': 'きょ',
	  'ca': 'か',
	  'ci': 'き',
	  'cu': 'く',
	  'ce': 'け',
	  'co': 'こ',
	  'lca': 'ヵ',
	  'lce': 'ヶ',
	  'xca': 'ヵ',
	  'xce': 'ヶ',
	  'qya': 'くゃ',
	  'qyu': 'くゅ',
	  'qyo': 'くょ',
	  'qwa': 'くぁ',
	  'qwi': 'くぃ',
	  'qwu': 'くぅ',
	  'qwe': 'くぇ',
	  'qwo': 'くぉ',
	  'qa': 'くぁ',
	  'qi': 'くぃ',
	  'qe': 'くぇ',
	  'qo': 'くぉ',
	  'kwa': 'くぁ',
	  'qyi': 'くぃ',
	  'qye': 'くぇ',
	  'ga': 'が',
	  'gi': 'ぎ',
	  'gu': 'ぐ',
	  'ge': 'げ',
	  'go': 'ご',
	  'gya': 'ぎゃ',
	  'gyi': 'ぎぃ',
	  'gyu': 'ぎゅ',
	  'gye': 'ぎぇ',
	  'gyo': 'ぎょ',
	  'gwa': 'ぐぁ',
	  'gwi': 'ぐぃ',
	  'gwu': 'ぐぅ',
	  'gwe': 'ぐぇ',
	  'gwo': 'ぐぉ',
	  'sa': 'さ',
	  'si': 'し',
	  'shi': 'し',
	  'su': 'す',
	  'se': 'せ',
	  'so': 'そ',
	  'za': 'ざ',
	  'zi': 'じ',
	  'zu': 'ず',
	  'ze': 'ぜ',
	  'zo': 'ぞ',
	  'ji': 'じ',
	  'sya': 'しゃ',
	  'syi': 'しぃ',
	  'syu': 'しゅ',
	  'sye': 'しぇ',
	  'syo': 'しょ',
	  'sha': 'しゃ',
	  'shu': 'しゅ',
	  'she': 'しぇ',
	  'sho': 'しょ',
	  'shya': 'しゃ', // 4 character code
	  'shyu': 'しゅ', // 4 character code
	  'shye': 'しぇ', // 4 character code
	  'shyo': 'しょ', // 4 character code
	  'swa': 'すぁ',
	  'swi': 'すぃ',
	  'swu': 'すぅ',
	  'swe': 'すぇ',
	  'swo': 'すぉ',
	  'zya': 'じゃ',
	  'zyi': 'じぃ',
	  'zyu': 'じゅ',
	  'zye': 'じぇ',
	  'zyo': 'じょ',
	  'ja': 'じゃ',
	  'ju': 'じゅ',
	  'je': 'じぇ',
	  'jo': 'じょ',
	  'jya': 'じゃ',
	  'jyi': 'じぃ',
	  'jyu': 'じゅ',
	  'jye': 'じぇ',
	  'jyo': 'じょ',
	  'ta': 'た',
	  'ti': 'ち',
	  'tu': 'つ',
	  'te': 'て',
	  'to': 'と',
	  'chi': 'ち',
	  'tsu': 'つ',
	  'ltu': 'っ',
	  'xtu': 'っ',
	  'tya': 'ちゃ',
	  'tyi': 'ちぃ',
	  'tyu': 'ちゅ',
	  'tye': 'ちぇ',
	  'tyo': 'ちょ',
	  'cha': 'ちゃ',
	  'chu': 'ちゅ',
	  'che': 'ちぇ',
	  'cho': 'ちょ',
	  'cya': 'ちゃ',
	  'cyi': 'ちぃ',
	  'cyu': 'ちゅ',
	  'cye': 'ちぇ',
	  'cyo': 'ちょ',
	  'chya': 'ちゃ', // 4 character code
	  'chyu': 'ちゅ', // 4 character code
	  'chye': 'ちぇ', // 4 character code
	  'chyo': 'ちょ', // 4 character code
	  'tsa': 'つぁ',
	  'tsi': 'つぃ',
	  'tse': 'つぇ',
	  'tso': 'つぉ',
	  'tha': 'てゃ',
	  'thi': 'てぃ',
	  'thu': 'てゅ',
	  'the': 'てぇ',
	  'tho': 'てょ',
	  'twa': 'とぁ',
	  'twi': 'とぃ',
	  'twu': 'とぅ',
	  'twe': 'とぇ',
	  'two': 'とぉ',
	  'da': 'だ',
	  'di': 'ぢ',
	  'du': 'づ',
	  'de': 'で',
	  'do': 'ど',
	  'dya': 'ぢゃ',
	  'dyi': 'ぢぃ',
	  'dyu': 'ぢゅ',
	  'dye': 'ぢぇ',
	  'dyo': 'ぢょ',
	  'dha': 'でゃ',
	  'dhi': 'でぃ',
	  'dhu': 'でゅ',
	  'dhe': 'でぇ',
	  'dho': 'でょ',
	  'dwa': 'どぁ',
	  'dwi': 'どぃ',
	  'dwu': 'どぅ',
	  'dwe': 'どぇ',
	  'dwo': 'どぉ',
	  'na': 'な',
	  'ni': 'に',
	  'nu': 'ぬ',
	  'ne': 'ね',
	  'no': 'の',
	  'nya': 'にゃ',
	  'nyi': 'にぃ',
	  'nyu': 'にゅ',
	  'nye': 'にぇ',
	  'nyo': 'にょ',
	  'ha': 'は',
	  'hi': 'ひ',
	  'hu': 'ふ',
	  'he': 'へ',
	  'ho': 'ほ',
	  'fu': 'ふ',
	  'hya': 'ひゃ',
	  'hyi': 'ひぃ',
	  'hyu': 'ひゅ',
	  'hye': 'ひぇ',
	  'hyo': 'ひょ',
	  'fya': 'ふゃ',
	  'fyu': 'ふゅ',
	  'fyo': 'ふょ',
	  'fwa': 'ふぁ',
	  'fwi': 'ふぃ',
	  'fwu': 'ふぅ',
	  'fwe': 'ふぇ',
	  'fwo': 'ふぉ',
	  'fa': 'ふぁ',
	  'fi': 'ふぃ',
	  'fe': 'ふぇ',
	  'fo': 'ふぉ',
	  'fyi': 'ふぃ',
	  'fye': 'ふぇ',
	  'ba': 'ば',
	  'bi': 'び',
	  'bu': 'ぶ',
	  'be': 'べ',
	  'bo': 'ぼ',
	  'bya': 'びゃ',
	  'byi': 'びぃ',
	  'byu': 'びゅ',
	  'bye': 'びぇ',
	  'byo': 'びょ',
	  'pa': 'ぱ',
	  'pi': 'ぴ',
	  'pu': 'ぷ',
	  'pe': 'ぺ',
	  'po': 'ぽ',
	  'pya': 'ぴゃ',
	  'pyi': 'ぴぃ',
	  'pyu': 'ぴゅ',
	  'pye': 'ぴぇ',
	  'pyo': 'ぴょ',
	  'ma': 'ま',
	  'mi': 'み',
	  'mu': 'む',
	  'me': 'め',
	  'mo': 'も',
	  'mya': 'みゃ',
	  'myi': 'みぃ',
	  'myu': 'みゅ',
	  'mye': 'みぇ',
	  'myo': 'みょ',
	  'ya': 'や',
	  'yu': 'ゆ',
	  'yo': 'よ',
	  'xya': 'ゃ',
	  'xyu': 'ゅ',
	  'xyo': 'ょ',
	  'ra': 'ら',
	  'ri': 'り',
	  'ru': 'る',
	  're': 'れ',
	  'ro': 'ろ',
	  'rya': 'りゃ',
	  'ryi': 'りぃ',
	  'ryu': 'りゅ',
	  'rye': 'りぇ',
	  'ryo': 'りょ',
	  'la': 'ら',
	  'li': 'り',
	  'lu': 'る',
	  'le': 'れ',
	  'lo': 'ろ',
	  'lya': 'りゃ',
	  'lyi': 'りぃ',
	  'lyu': 'りゅ',
	  'lye': 'りぇ',
	  'lyo': 'りょ',
	  'wa': 'わ',
	  'wo': 'を',
	  'lwe': 'ゎ',
	  'xwa': 'ゎ',
	  'n': 'ん',
	  'nn': 'ん',
	  'n ': 'ん', // n + space
	  'xn': 'ん',
	  'ltsu': 'っ' };

	var JtoR = exports.JtoR = {
	  '　': ' ',
	  '！': '!',
	  '？': '?',
	  '。': '.',
	  '・': '/',
	  '、': ',',
	  'ー': '-',
	  '「': '[',
	  '」': ']',
	  '（': '(',
	  '）': ')',
	  '｛': '{',
	  '｝': '}',

	  'あ': 'a',
	  'い': 'i',
	  'う': 'u',
	  'え': 'e',
	  'お': 'o',
	  'ゔぁ': 'va',
	  'ゔぃ': 'vi',
	  'ゔ': 'vu',
	  'ゔぇ': 've',
	  'ゔぉ': 'vo',
	  'か': 'ka',
	  'き': 'ki',
	  'きゃ': 'kya',
	  'きぃ': 'kyi',
	  'きゅ': 'kyu',
	  'く': 'ku',
	  'け': 'ke',
	  'こ': 'ko',
	  'が': 'ga',
	  'ぎ': 'gi',
	  'ぐ': 'gu',
	  'げ': 'ge',
	  'ご': 'go',
	  'ぎゃ': 'gya',
	  'ぎぃ': 'gyi',
	  'ぎゅ': 'gyu',
	  'ぎぇ': 'gye',
	  'ぎょ': 'gyo',
	  'さ': 'sa',
	  'す': 'su',
	  'せ': 'se',
	  'そ': 'so',
	  'ざ': 'za',
	  'ず': 'zu',
	  'ぜ': 'ze',
	  'ぞ': 'zo',
	  'し': 'shi',
	  'しゃ': 'sha',
	  'しゅ': 'shu',
	  'しょ': 'sho',
	  'じ': 'ji',
	  'じゃ': 'ja',
	  'じゅ': 'ju',
	  'じょ': 'jo',
	  'た': 'ta',
	  'ち': 'chi',
	  'ちゃ': 'cha',
	  'ちゅ': 'chu',
	  'ちょ': 'cho',
	  'つ': 'tsu',
	  'て': 'te',
	  'と': 'to',
	  'だ': 'da',
	  'ぢ': 'di',
	  'づ': 'du',
	  'で': 'de',
	  'ど': 'do',
	  'な': 'na',
	  'に': 'ni',
	  'にゃ': 'nya',
	  'にゅ': 'nyu',
	  'にょ': 'nyo',
	  'ぬ': 'nu',
	  'ね': 'ne',
	  'の': 'no',
	  'は': 'ha',
	  'ひ': 'hi',
	  'ふ': 'fu',
	  'へ': 'he',
	  'ほ': 'ho',
	  'ひゃ': 'hya',
	  'ひゅ': 'hyu',
	  'ひょ': 'hyo',
	  'ふぁ': 'fa',
	  'ふぃ': 'fi',
	  'ふぇ': 'fe',
	  'ふぉ': 'fo',
	  'ば': 'ba',
	  'び': 'bi',
	  'ぶ': 'bu',
	  'べ': 'be',
	  'ぼ': 'bo',
	  'びゃ': 'bya',
	  'びゅ': 'byu',
	  'びょ': 'byo',
	  'ぱ': 'pa',
	  'ぴ': 'pi',
	  'ぷ': 'pu',
	  'ぺ': 'pe',
	  'ぽ': 'po',
	  'ぴゃ': 'pya',
	  'ぴゅ': 'pyu',
	  'ぴょ': 'pyo',
	  'ま': 'ma',
	  'み': 'mi',
	  'む': 'mu',
	  'め': 'me',
	  'も': 'mo',
	  'みゃ': 'mya',
	  'みゅ': 'myu',
	  'みょ': 'myo',
	  'や': 'ya',
	  'ゆ': 'yu',
	  'よ': 'yo',
	  'ら': 'ra',
	  'り': 'ri',
	  'る': 'ru',
	  'れ': 're',
	  'ろ': 'ro',
	  'りゃ': 'rya',
	  'りゅ': 'ryu',
	  'りょ': 'ryo',
	  'わ': 'wa',
	  'を': 'wo',
	  'ん': 'n',

	  // Archaic characters
	  'ゐ': 'wi',
	  'ゑ': 'we',

	  // Uncommon character combos
	  'きぇ': 'kye',
	  'きょ': 'kyo',
	  'じぃ': 'jyi',
	  'じぇ': 'jye',
	  'ちぃ': 'cyi',
	  'ちぇ': 'che',
	  'ひぃ': 'hyi',
	  'ひぇ': 'hye',
	  'びぃ': 'byi',
	  'びぇ': 'bye',
	  'ぴぃ': 'pyi',
	  'ぴぇ': 'pye',
	  'みぇ': 'mye',
	  'みぃ': 'myi',
	  'りぃ': 'ryi',
	  'りぇ': 'rye',
	  'にぃ': 'nyi',
	  'にぇ': 'nye',
	  'しぃ': 'syi',
	  'しぇ': 'she',
	  'いぇ': 'ye',
	  'うぁ': 'wha',
	  'うぉ': 'who',
	  'うぃ': 'wi',
	  'うぇ': 'we',
	  'ゔゃ': 'vya',
	  'ゔゅ': 'vyu',
	  'ゔょ': 'vyo',
	  'すぁ': 'swa',
	  'すぃ': 'swi',
	  'すぅ': 'swu',
	  'すぇ': 'swe',
	  'すぉ': 'swo',
	  'くゃ': 'qya',
	  'くゅ': 'qyu',
	  'くょ': 'qyo',
	  'くぁ': 'qwa',
	  'くぃ': 'qwi',
	  'くぅ': 'qwu',
	  'くぇ': 'qwe',
	  'くぉ': 'qwo',
	  'ぐぁ': 'gwa',
	  'ぐぃ': 'gwi',
	  'ぐぅ': 'gwu',
	  'ぐぇ': 'gwe',
	  'ぐぉ': 'gwo',
	  'つぁ': 'tsa',
	  'つぃ': 'tsi',
	  'つぇ': 'tse',
	  'つぉ': 'tso',
	  'てゃ': 'tha',
	  'てぃ': 'thi',
	  'てゅ': 'thu',
	  'てぇ': 'the',
	  'てょ': 'tho',
	  'とぁ': 'twa',
	  'とぃ': 'twi',
	  'とぅ': 'twu',
	  'とぇ': 'twe',
	  'とぉ': 'two',
	  'ぢゃ': 'dya',
	  'ぢぃ': 'dyi',
	  'ぢゅ': 'dyu',
	  'ぢぇ': 'dye',
	  'ぢょ': 'dyo',
	  'でゃ': 'dha',
	  'でぃ': 'dhi',
	  'でゅ': 'dhu',
	  'でぇ': 'dhe',
	  'でょ': 'dho',
	  'どぁ': 'dwa',
	  'どぃ': 'dwi',
	  'どぅ': 'dwu',
	  'どぇ': 'dwe',
	  'どぉ': 'dwo',
	  'ふぅ': 'fwu',
	  'ふゃ': 'fya',
	  'ふゅ': 'fyu',
	  'ふょ': 'fyo',

	  //  Small Characters (normally not transliterated alone)
	  'ぁ': 'a',
	  'ぃ': 'i',
	  'ぇ': 'e',
	  'ぅ': 'u',
	  'ぉ': 'o',
	  'ゃ': 'ya',
	  'ゅ': 'yu',
	  'ょ': 'yo',
	  'っ': '',
	  'ゕ': 'ka',
	  'ゖ': 'ka',
	  'ゎ': 'wa',

	  // Ambiguous consonant vowel pairs
	  'んあ': 'n\'a',
	  'んい': 'n\'i',
	  'んう': 'n\'u',
	  'んえ': 'n\'e',
	  'んお': 'n\'o',
	  'んや': 'n\'ya',
	  'んゆ': 'n\'yu',
	  'んよ': 'n\'yo'
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isCharUpperCase = exports.getChunkSize = exports.getChunk = undefined;

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.isCharInRange = isCharInRange;
	exports.isCharVowel = isCharVowel;
	exports.isCharConsonant = isCharConsonant;
	exports.isCharLongDash = isCharLongDash;
	exports.isCharSlashDot = isCharSlashDot;
	exports.isCharKatakana = isCharKatakana;
	exports.isCharHiragana = isCharHiragana;
	exports.isCharKana = isCharKana;
	exports.isCharKanji = isCharKanji;
	exports.isCharJapanesePunctuation = isCharJapanesePunctuation;
	exports.isCharEnglishPunctuation = isCharEnglishPunctuation;
	exports.isCharPunctuation = isCharPunctuation;
	exports.convertFullwidthCharsToASCII = convertFullwidthCharsToASCII;

	var _constants = __webpack_require__(2);

	// Returns a substring based on start/end values
	var getChunk = exports.getChunk = function getChunk(text, start, end) {
	  return text.slice(start, end);
	};

	// Don't pick a chunk that is bigger than the remaining characters.
	var getChunkSize = exports.getChunkSize = function getChunkSize(max, remaining) {
	  return Math.min(max, remaining);
	};

	// Checks if char is in English unicode uppercase range
	var isCharUpperCase = exports.isCharUpperCase = function isCharUpperCase(char) {
	  return isCharInRange(char, _constants.UPPERCASE_START, _constants.UPPERCASE_END);
	};

	/**
	 * Takes a character and a unicode range. Returns true if the char is in the range.
	 * @param  {String}  char  unicode character
	 * @param  {Number}  start unicode start range
	 * @param  {Number}  end   unicode end range
	 * @return {Boolean}
	 */
	function isCharInRange(char, start, end) {
	  var code = char.charCodeAt(0);
	  return start <= code && code <= end;
	}

	/**
	 * Tests a character and an english vowel. Returns true if the char is a vowel.
	 * @param  {String} char
	 * @param  {Boolean} [includeY=true] Optional parameter to include y as a vowel in test
	 * @return {Boolean}
	 */
	function isCharVowel(char) {
	  var includeY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	  var regexp = includeY ? /[aeiouy]/ : /[aeiou]/;
	  return char.toLowerCase().charAt(0).search(regexp) !== -1;
	}

	/**
	 * Tests a character and an english consonant. Returns true if the char is a consonant.
	 * @param  {String} char
	 * @param  {Boolean} [includeY=true] Optional parameter to include y as a consonant in test
	 * @return {Boolean}
	 */
	function isCharConsonant(char) {
	  var includeY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	  var regexp = includeY ? /[bcdfghjklmnpqrstvwxyz]/ : /[bcdfghjklmnpqrstvwxz]/;
	  return char.toLowerCase().charAt(0).search(regexp) !== -1;
	}

	// Returns true if char is 'ー'
	function isCharLongDash(char) {
	  return char.charCodeAt(0) === _constants.PROLONGED_SOUND_MARK;
	}

	// Returns true if char is '・'
	function isCharSlashDot(char) {
	  return char.charCodeAt(0) === _constants.KANA_SLASH_DOT;
	}

	/**
	 * Tests a character. Returns true if the character is katakana.
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharKatakana(char) {
	  return isCharInRange(char, _constants.KATAKANA_START, _constants.KATAKANA_END);
	}

	/**
	 * Tests a character. Returns true if the character is Hiragana.
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharHiragana(char) {
	  if (isCharLongDash(char)) return true;
	  return isCharInRange(char, _constants.HIRAGANA_START, _constants.HIRAGANA_END);
	}

	/**
	 * Tests a character. Returns true if the character is hiragana or katakana.
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharKana(char) {
	  return isCharHiragana(char) || isCharKatakana(char);
	}

	/**
	 * Tests a character. Returns true if the character is a CJK ideograph (kanji).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharKanji(char) {
	  return isCharInRange(char, _constants.KANJI_START, _constants.KANJI_END);
	}

	function isCharJapanesePunctuation(char) {
	  return _constants.JAPANESE_FULLWIDTH_PUNCTUATION_RANGES.some(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        start = _ref2[0],
	        end = _ref2[1];

	    return isCharInRange(char, start, end);
	  });
	}

	function isCharEnglishPunctuation(char) {
	  return _constants.ENGLISH_PUNCTUATION_RANGES.some(function (_ref3) {
	    var _ref4 = _slicedToArray(_ref3, 2),
	        start = _ref4[0],
	        end = _ref4[1];

	    return isCharInRange(char, start, end);
	  });
	}

	function isCharPunctuation(char) {
	  return isCharEnglishPunctuation(char) || isCharJapanesePunctuation(char);
	}

	/**
	 * Converts all fullwidth roman letters in string to proper ASCII
	 * @param  {String} text Full Width roman letters
	 * @return {String} ASCII
	 */
	function convertFullwidthCharsToASCII(text) {
	  var asciiChars = text.split('').map(function (char) {
	    var code = char.charCodeAt(0);
	    var lower = isCharInRange(char, _constants.LOWERCASE_FULLWIDTH_START, _constants.LOWERCASE_FULLWIDTH_END);
	    var upper = isCharInRange(char, _constants.UPPERCASE_FULLWIDTH_START, _constants.UPPERCASE_FULLWIDTH_END);
	    if (lower) {
	      return String.fromCharCode(code - _constants.LOWERCASE_FULLWIDTH_START + _constants.LOWERCASE_START);
	    } else if (upper) {
	      return String.fromCharCode(code - _constants.UPPERCASE_FULLWIDTH_START + _constants.UPPERCASE_START);
	    }
	    return char;
	  });

	  return asciiChars.join('');
	}

/***/ }
/******/ ]);