(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("kanawana", [], factory);
	else if(typeof exports === 'object')
		exports["kanawana"] = factory();
	else
		root["kanawana"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.stripOkurigana = exports.toRomaji = exports.toKana = exports.toKatakana = exports.toHiragana = exports.isKanji = exports.isRomajiKana = exports.isRomaji = exports.isKanjiKana = exports.isKana = exports.isKatakana = exports.isHiragana = exports.unbind = exports.bind = undefined;
	
	var _constants = __webpack_require__(1);
	
	var _convertFullwidthCharsToASCII = __webpack_require__(2);
	
	var _convertFullwidthCharsToASCII2 = _interopRequireDefault(_convertFullwidthCharsToASCII);
	
	var _isHiragana = __webpack_require__(5);
	
	var _isHiragana2 = _interopRequireDefault(_isHiragana);
	
	var _isKatakana = __webpack_require__(8);
	
	var _isKatakana2 = _interopRequireDefault(_isKatakana);
	
	var _isKana = __webpack_require__(10);
	
	var _isKana2 = _interopRequireDefault(_isKana);
	
	var _isKanjiKana = __webpack_require__(12);
	
	var _isKanjiKana2 = _interopRequireDefault(_isKanjiKana);
	
	var _isRomaji = __webpack_require__(13);
	
	var _isRomaji2 = _interopRequireDefault(_isRomaji);
	
	var _isRomajiKana = __webpack_require__(14);
	
	var _isRomajiKana2 = _interopRequireDefault(_isRomajiKana);
	
	var _isKanji = __webpack_require__(15);
	
	var _isKanji2 = _interopRequireDefault(_isKanji);
	
	var _toHiragana = __webpack_require__(17);
	
	var _toHiragana2 = _interopRequireDefault(_toHiragana);
	
	var _toKatakana = __webpack_require__(28);
	
	var _toKatakana2 = _interopRequireDefault(_toKatakana);
	
	var _toKana = __webpack_require__(21);
	
	var _toKana2 = _interopRequireDefault(_toKana);
	
	var _toRomaji = __webpack_require__(29);
	
	var _toRomaji2 = _interopRequireDefault(_toRomaji);
	
	var _stripOkurigana = __webpack_require__(30);
	
	var _stripOkurigana2 = _interopRequireDefault(_stripOkurigana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Binds eventListener for 'input' events to an input field to automagically replace values with kana
	 * @param  {HTMLElement} input textarea, input[type="text"] etc
	 * @param  {Object} [options={}] user config overrides
	 */
	function bind(input) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  input.addEventListener('input', function (event) {
	    return onInput(event, options);
	  });
	}
	
	/**
	 * Unbinds eventListener from input field
	 * @param  {HTMLElement} input textarea, input[type="text"] etc
	 */
	function unbind(input) {
	  input.removeEventListener('input', onInput);
	}
	
	/**
	 * Automagically replaces input values with converted text to kana
	 * @param  {Object} event DOM event to listen to
	 * @param  {Object} [options={}] user config overrides
	 */
	function onInput(event) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var config = Object.assign({}, _constants.DEFAULT_OPTIONS, options, { IMEMode: true });
	  var input = event.target;
	  // const startingCursor = input.selectionStart;
	  // const startingLength = input.value.length;
	  var normalizedInputString = (0, _convertFullwidthCharsToASCII2.default)(input.value);
	  var newText = (0, _toKana2.default)(normalizedInputString, config);
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
	
	exports.bind = bind;
	exports.unbind = unbind;
	exports.isHiragana = _isHiragana2.default;
	exports.isKatakana = _isKatakana2.default;
	exports.isKana = _isKana2.default;
	exports.isKanjiKana = _isKanjiKana2.default;
	exports.isRomaji = _isRomaji2.default;
	exports.isRomajiKana = _isRomajiKana2.default;
	exports.isKanji = _isKanji2.default;
	exports.toHiragana = _toHiragana2.default;
	exports.toKatakana = _toKatakana2.default;
	exports.toKana = _toKana2.default;
	exports.toRomaji = _toRomaji2.default;
	exports.stripOkurigana = _stripOkurigana2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	  * @typedef {Object} DefaultOptions
	  * @property {Boolean} [useObsoleteKana=false] - Set to true to use obsolete characters, such as ゐ and ゑ.
	  * @example
	  * toHiragana('we', { useObsoleteKana: true })
	  * // => 'ゑ'
	  * @property {Boolean} [passRomaji=false] - Set to true to pass romaji when using mixed syllabaries with toKatakana() or toHiragana()
	  * @example
	  * toHiragana('only convert the katakana: ヒラガナ', { passRomaji: true })
	  * // => "only convert the katakana: ひらがな"
	  * @property {Boolean} [upcaseKatakana=false] - Set to true to convert katakana to uppercase using toRomaji()
	  * @example
	  * toRomaji('ひらがな カタカナ', { upcaseKatakana: true })
	  * // => "hiragana KATAKANA"
	  * @property {Boolean} [IMEMode=false] - Set to true to handle conversion from a text input as it is being typed
	*/
	
	/**
	 * Default config for KanaWana, user passed options will be merged with this
	 * @type {DefaultOptions}
	 */
	var DEFAULT_OPTIONS = {
	  useObsoleteKana: false,
	  passRomaji: false,
	  upcaseKatakana: false,
	  IMEMode: false
	};
	
	// CharCode References
	// http://unicode-table.com
	// http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
	
	/**
	 * All Japanese regex, for mixes of kanji and kana like "泣き虫"
	 * Includes Japanese full-width punctuation ranges
	 * Doesn't include *half-width katakana / roman letters* since they should be considered typos
	 * @type {RegExp}
	 */
	var KANJI_KANA_REGEX = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff01-\uff0f\u4e00-\u9faf\u3400-\u4dbf]/;
	
	/**
	* Basic Latin unicode regex, for determining Romaji written as Hepburn romanisation
	* Includes upper/lowercase long vowels like "ā, ī, ū, ē, ō"
	* @type {RegExp}
	*/
	var ROMAJI_REGEX = /[\u0000-\u007f\u0100—\u0101\u0112—\u0113\u012a—\u012b\u014c—\u014d\u016a—\u016b]/;
	
	var ENGLISH_PUNCTUATION_RANGES = [[0x21, 0x2F], [0x3A, 0x3F], [0x5B, 0x60], [0x7B, 0x7E]];
	var JAPANESE_FULLWIDTH_PUNCTUATION_RANGES = [[0x3001, 0x303E], [0x30FB, 0x30FC], [0xFF01, 0xFF0F], [0xFF1A, 0xFF1F], [0xFF3B, 0xFF3F], [0xFF5B, 0xFF60]];
	var LOWERCASE_START = 0x61;
	var LOWERCASE_END = 0x7A;
	var UPPERCASE_START = 0x41;
	var UPPERCASE_END = 0x5A;
	var HIRAGANA_START = 0x3041;
	var HIRAGANA_END = 0x3096;
	var KATAKANA_START = 0x30A1;
	var KATAKANA_END = 0x30FC;
	var KANJI_START = 0x4E00;
	var KANJI_END = 0x9FAF;
	var LOWERCASE_FULLWIDTH_START = 0xFF41;
	var LOWERCASE_FULLWIDTH_END = 0xFF5A;
	var UPPERCASE_FULLWIDTH_START = 0xFF21;
	var UPPERCASE_FULLWIDTH_END = 0xFF3A;
	var PROLONGED_SOUND_MARK = 0x30FC;
	var KANA_SLASH_DOT = 0x30FB;
	
	var LONG_VOWELS = {
	  a: 'あ',
	  i: 'い',
	  u: 'う',
	  e: 'え',
	  o: 'う'
	};
	
	var FOUR_CHAR_EDGECASES = ['lts', 'chy', 'shy'];
	
	var FROM_ROMAJI = {
	  '.': '。',
	  ',': '、',
	  '/': '・',
	  '!': '！',
	  '?': '？',
	  '~': '〜',
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
	
	var TO_ROMAJI = {
	  '　': ' ',
	  '！': '!',
	  '？': '?',
	  '。': '.',
	  '・': '/',
	  '、': ',',
	  '〜': '~',
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
	
	exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
	exports.KANJI_KANA_REGEX = KANJI_KANA_REGEX;
	exports.ROMAJI_REGEX = ROMAJI_REGEX;
	exports.ENGLISH_PUNCTUATION_RANGES = ENGLISH_PUNCTUATION_RANGES;
	exports.JAPANESE_FULLWIDTH_PUNCTUATION_RANGES = JAPANESE_FULLWIDTH_PUNCTUATION_RANGES;
	exports.LOWERCASE_START = LOWERCASE_START;
	exports.LOWERCASE_END = LOWERCASE_END;
	exports.UPPERCASE_START = UPPERCASE_START;
	exports.UPPERCASE_END = UPPERCASE_END;
	exports.HIRAGANA_START = HIRAGANA_START;
	exports.HIRAGANA_END = HIRAGANA_END;
	exports.KATAKANA_START = KATAKANA_START;
	exports.KATAKANA_END = KATAKANA_END;
	exports.KANJI_START = KANJI_START;
	exports.KANJI_END = KANJI_END;
	exports.LOWERCASE_FULLWIDTH_START = LOWERCASE_FULLWIDTH_START;
	exports.LOWERCASE_FULLWIDTH_END = LOWERCASE_FULLWIDTH_END;
	exports.UPPERCASE_FULLWIDTH_START = UPPERCASE_FULLWIDTH_START;
	exports.UPPERCASE_FULLWIDTH_END = UPPERCASE_FULLWIDTH_END;
	exports.PROLONGED_SOUND_MARK = PROLONGED_SOUND_MARK;
	exports.KANA_SLASH_DOT = KANA_SLASH_DOT;
	exports.LONG_VOWELS = LONG_VOWELS;
	exports.FOUR_CHAR_EDGECASES = FOUR_CHAR_EDGECASES;
	exports.FROM_ROMAJI = FROM_ROMAJI;
	exports.TO_ROMAJI = TO_ROMAJI;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isCharInRange = __webpack_require__(3);
	
	var _isCharInRange2 = _interopRequireDefault(_isCharInRange);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Converts all fullwidth roman letters in string to proper ASCII
	 * @param  {String} text Full Width roman letters
	 * @return {String} ASCII
	 */
	function convertFullwidthCharsToASCII() {
	  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  var asciiChars = [].concat(_toConsumableArray(text)).map(function (char) {
	    var code = char.charCodeAt(0);
	    var lower = (0, _isCharInRange2.default)(char, _constants.LOWERCASE_FULLWIDTH_START, _constants.LOWERCASE_FULLWIDTH_END);
	    var upper = (0, _isCharInRange2.default)(char, _constants.UPPERCASE_FULLWIDTH_START, _constants.UPPERCASE_FULLWIDTH_END);
	    if (lower) {
	      return String.fromCharCode(code - _constants.LOWERCASE_FULLWIDTH_START + _constants.LOWERCASE_START);
	    } else if (upper) {
	      return String.fromCharCode(code - _constants.UPPERCASE_FULLWIDTH_START + _constants.UPPERCASE_START);
	    }
	    return char;
	  });
	
	  return asciiChars.join('');
	}
	
	exports.default = convertFullwidthCharsToASCII;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Takes a character and a unicode range. Returns true if the char is in the range.
	 * @param  {String}  char  unicode character
	 * @param  {Number}  start unicode start range
	 * @param  {Number}  end   unicode end range
	 * @return {Boolean}
	 */
	function isCharInRange() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var start = arguments[1];
	  var end = arguments[2];
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  var code = char.charCodeAt(0);
	  return start <= code && code <= end;
	}
	
	exports.default = isCharInRange;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Checks if input string is empty
	 * @param  {String} input text input
	 * @return {Boolean} true if no input
	 */
	function isEmpty(input) {
	  if (typeof input !== 'string') {
	    console.warn('Input provided to isEmpty(): ' + JSON.stringify(input) + ' was not a string.');
	    return true;
	  };
	  return !input.length;
	}
	
	exports.default = isEmpty;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isCharHiragana = __webpack_require__(6);
	
	var _isCharHiragana2 = _interopRequireDefault(_isCharHiragana);
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Test if `input` is [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if all [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
	 * @example
	 * isHiragana('げーむ')
	 * // => true
	 * isHiragana('A')
	 * // => false
	 * isHiragana('あア')
	 * // => false
	 */
	function isHiragana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(input)) return false;
	  return [].concat(_toConsumableArray(input)).every(_isCharHiragana2.default);
	}
	
	exports.default = isHiragana;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _isCharLongDash = __webpack_require__(7);
	
	var _isCharLongDash2 = _interopRequireDefault(_isCharLongDash);
	
	var _isCharInRange = __webpack_require__(3);
	
	var _isCharInRange2 = _interopRequireDefault(_isCharInRange);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharHiragana() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  if ((0, _isCharLongDash2.default)(char)) return true;
	  return (0, _isCharInRange2.default)(char, _constants.HIRAGANA_START, _constants.HIRAGANA_END);
	}
	
	exports.default = isCharHiragana;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Returns true if char is 'ー'
	 * @param  {String} char to test
	 * @return {Boolean}
	 */
	function isCharLongDash() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  return char.charCodeAt(0) === _constants.PROLONGED_SOUND_MARK;
	}
	
	exports.default = isCharLongDash;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _isCharKatakana = __webpack_require__(9);
	
	var _isCharKatakana2 = _interopRequireDefault(_isCharKatakana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Test if `input` is [Katakana](https://en.wikipedia.org/wiki/Katakana)
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if all [Katakana](https://en.wikipedia.org/wiki/Katakana)
	 * @example
	 * isKatakana('ゲーム')
	 * // => true
	 * isKatakana('あ')
	 * // => false
	 * isKatakana('A')
	 * // => false
	 * isKatakana('あア')
	 * // => false
	 */
	function isKatakana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(input)) return false;
	  return [].concat(_toConsumableArray(input)).every(_isCharKatakana2.default);
	}
	
	exports.default = isKatakana;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isCharInRange = __webpack_require__(3);
	
	var _isCharInRange2 = _interopRequireDefault(_isCharInRange);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharKatakana() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  return (0, _isCharInRange2.default)(char, _constants.KATAKANA_START, _constants.KATAKANA_END);
	}
	
	exports.default = isCharKatakana;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _isCharKana = __webpack_require__(11);
	
	var _isCharKana2 = _interopRequireDefault(_isCharKana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Test if `input` is [Kana](https://en.wikipedia.org/wiki/Kana) ([Katakana](https://en.wikipedia.org/wiki/Katakana) and/or [Hiragana](https://en.wikipedia.org/wiki/Hiragana))
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if all [Kana](https://en.wikipedia.org/wiki/Kana)
	 * @example
	 * isKana('あ')
	 * // => true
	 * isKana('ア')
	 * // => true
	 * isKana('あーア')
	 * // => true
	 * isKana('A')
	 * // => false
	 * isKana('あAア')
	 * // => false
	 */
	function isKana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(input)) return false;
	  return [].concat(_toConsumableArray(input)).every(_isCharKana2.default);
	}
	
	exports.default = isKana;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _isCharHiragana = __webpack_require__(6);
	
	var _isCharHiragana2 = _interopRequireDefault(_isCharHiragana);
	
	var _isCharKatakana = __webpack_require__(9);
	
	var _isCharKatakana2 = _interopRequireDefault(_isCharKatakana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana) or [Katakana](https://en.wikipedia.org/wiki/Katakana).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharKana() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  return (0, _isCharHiragana2.default)(char) || (0, _isCharKatakana2.default)(char);
	}
	
	exports.default = isCharKana;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Test if `input` is [Kanji](https://en.wikipedia.org/wiki/Kanji) and/or [Kana](https://en.wikipedia.org/wiki/Kana) like “「泣き虫」”
	 * Includes Japanese full-width punctuation ranges
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if all [Kanji](https://en.wikipedia.org/wiki/Kanji) and/or [Kana](https://en.wikipedia.org/wiki/Kana)
	 * @example
	 * isKanjiKana('泣き虫')
	 * // => true
	 * isKanjiKana('あア')
	 * // => true
	 * isKanjiKana('泣き虫。！〜') // Full-width punctuation
	 * // => true
	 * isKanjiKana('泣き虫.!~') // Half-width / Latin punctuation
	 * // => false
	 * isKanjiKana('泣き虫A')
	 * // => false
	 * isKanjiKana('A')
	 * // => false
	 */
	function isKanjiKana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(input)) return false;
	  return [].concat(_toConsumableArray(input)).every(function (char) {
	    return _constants.KANJI_KANA_REGEX.test(char);
	  });
	}
	
	exports.default = isKanjiKana;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _constants = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Test if `input` is [Romaji](https://en.wikipedia.org/wiki/Romaji) (including [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if [Romaji](https://en.wikipedia.org/wiki/Romaji)
	 * @example
	 * isRomaji('Tōkyō and Ōsaka')
	 * // => true
	 * isRomaji('a*b&c-d')
	 * // => true
	 * isRomaji('あアA')
	 * // => false
	 * isRomaji('お願い')
	 * // => false
	 * isRomaji('a！b&cーd') // Full-width punctuation fails
	 * // => false
	 */
	function isRomaji() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(input)) return false;
	  return [].concat(_toConsumableArray(input)).every(function (char) {
	    return _constants.ROMAJI_REGEX.test(char);
	  });
	}
	
	exports.default = isRomaji;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isKanji = __webpack_require__(15);
	
	var _isKanji2 = _interopRequireDefault(_isKanji);
	
	var _isHiragana = __webpack_require__(5);
	
	var _isHiragana2 = _interopRequireDefault(_isHiragana);
	
	var _isKatakana = __webpack_require__(8);
	
	var _isKatakana2 = _interopRequireDefault(_isKatakana);
	
	var _isRomaji = __webpack_require__(13);
	
	var _isRomaji2 = _interopRequireDefault(_isRomaji);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
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
	function isRomajiKana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { passKanji: true };
	
	  var chars = [].concat(_toConsumableArray(input));
	  var hasKanji = false;
	  if (!options.passKanji) {
	    hasKanji = chars.some(_isKanji2.default);
	  }
	  return (chars.some(_isHiragana2.default) || chars.some(_isKatakana2.default)) && chars.some(_isRomaji2.default) && !hasKanji;
	}
	
	exports.default = isRomajiKana;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _isCharKanji = __webpack_require__(16);
	
	var _isCharKanji2 = _interopRequireDefault(_isCharKanji);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Tests if `input` is [Kanji](https://en.wikipedia.org/wiki/Kanji) ([Japanese CJK ideographs](https://en.wikipedia.org/wiki/CJK_Unified_Ideographs))
	 * @param  {String} [input=''] text
	 * @return {Boolean} true if all [Kanji](https://en.wikipedia.org/wiki/Kanji)
	 * @example
	 * isKanji('刀')
	 * // => true
	 * isKanji('切腹')
	 * // => true
	 * isKanji('勢い')
	 * // => false
	 * isKanji('あAア')
	 * // => false
	 * isKanji('🐸')
	 * // => false
	 */
	function isKanji() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(input)) return false;
	  return [].concat(_toConsumableArray(input)).every(_isCharKanji2.default);
	}
	
	exports.default = isKanji;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isCharInRange = __webpack_require__(3);
	
	var _isCharInRange2 = _interopRequireDefault(_isCharInRange);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests a character. Returns true if the character is a CJK ideograph (kanji).
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharKanji() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  return (0, _isCharInRange2.default)(char, _constants.KANJI_START, _constants.KANJI_END);
	}
	
	exports.default = isCharKanji;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _katakanaToHiragana = __webpack_require__(18);
	
	var _katakanaToHiragana2 = _interopRequireDefault(_katakanaToHiragana);
	
	var _isRomaji = __webpack_require__(13);
	
	var _isRomaji2 = _interopRequireDefault(_isRomaji);
	
	var _isRomajiKana = __webpack_require__(14);
	
	var _isRomajiKana2 = _interopRequireDefault(_isRomajiKana);
	
	var _romajiToHiragana = __webpack_require__(20);
	
	var _romajiToHiragana2 = _interopRequireDefault(_romajiToHiragana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Convert input to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
	 * @param  {String} [input=''] text
	 * @param  {Object} [options={ useObsoleteKana: false, passRomaji: false }]
	 * @return {String} converted text
	 * @example
	 * toHiragana('toukyou, オオサカ')
	 * // => 'とうきょう、　おおさか'
	 * toHiragana('only カナ', { passRomaji: true })
	 * // => 'only かな'
	 * toHiragana('wi')
	 * // => 'うぃ'
	 * toHiragana('wi', { useObsoleteKana: true })
	 * // => 'ゐ'
	*/
	function toHiragana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var config = Object.assign({}, _constants.DEFAULT_OPTIONS, options);
	  if (config.passRomaji) return (0, _katakanaToHiragana2.default)(input);
	  if ((0, _isRomaji2.default)(input)) return (0, _romajiToHiragana2.default)(input, config);
	  if ((0, _isRomajiKana2.default)(input, { passKanji: true })) {
	    var romaji = (0, _katakanaToHiragana2.default)(input);
	    return (0, _romajiToHiragana2.default)(romaji, config);
	  }
	  return (0, _katakanaToHiragana2.default)(input);
	}
	
	exports.default = toHiragana;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isCharLongDash = __webpack_require__(7);
	
	var _isCharLongDash2 = _interopRequireDefault(_isCharLongDash);
	
	var _isCharSlashDot = __webpack_require__(19);
	
	var _isCharSlashDot2 = _interopRequireDefault(_isCharSlashDot);
	
	var _isCharKatakana = __webpack_require__(9);
	
	var _isCharKatakana2 = _interopRequireDefault(_isCharKatakana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Convert [Katakana](https://en.wikipedia.org/wiki/Katakana) to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
	 * Passes through any non-katakana chars
	 * @param  {String} [input=''] text input
	 * @return {String} converted text
	 * @example
	 * katakanaToHiragana('カタカナ')
	 * // => "かたかな"
	 * katakanaToHiragana('カタカナ is a type of kana')
	 * // => "かたかな is a type of kana"
	 * @ignore
	 */
	function katakanaToHiragana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  var hira = [];
	  var previousKana = '';
	  var iterable = input.split('');
	  for (var index = 0; index < iterable.length; index += 1) {
	    var char = iterable[index];
	    var _ref = [(0, _isCharSlashDot2.default)(char), (0, _isCharLongDash2.default)(char)],
	        slashDot = _ref[0],
	        longDash = _ref[1];
	    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
	
	    if (slashDot || longDash && index < 1) {
	      hira.push(char);
	      // Transform long vowels: 'オー' to 'おう'
	    } else if (longDash && index > 0) {
	      // Transform previousKana back to romaji, and slice off the vowel
	      var romaji = _constants.TO_ROMAJI[previousKana].slice(-1);
	      hira.push(_constants.LONG_VOWELS[romaji]);
	    } else if ((0, _isCharKatakana2.default)(char)) {
	      // Shift charcode.
	      var code = char.charCodeAt(0) + (_constants.HIRAGANA_START - _constants.KATAKANA_START);
	      var hiraChar = String.fromCharCode(code);
	      hira.push(hiraChar);
	      previousKana = hiraChar;
	    } else {
	      // Pass non katakana chars through
	      hira.push(char);
	      previousKana = '';
	    }
	  }
	  return hira.join('');
	}
	
	exports.default = katakanaToHiragana;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests if char is '・'
	 * @param  {String} char
	 * @return {Boolean} true if '・'
	 */
	function isCharSlashDot() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  return char.charCodeAt(0) === _constants.KANA_SLASH_DOT;
	}
	
	exports.default = isCharSlashDot;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _toKana = __webpack_require__(21);
	
	var _toKana2 = _interopRequireDefault(_toKana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Convert [Romaji](https://en.wikipedia.org/wiki/Romaji) to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
	 * @param  {String} [input=''] text
	 * @param  {Object} options used internally to pass along default options
	 * @return {String} converted text
	 * @example
	 * romajiToHiragana('hiragana')
	 * // => "ひらがな"
	 * @ignore
	 */
	function romajiToHiragana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  return (0, _toKana2.default)(input, options, true /* ignore case to enforce Hiragana conversion */);
	}
	
	exports.default = romajiToHiragana;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isCharInRange = __webpack_require__(3);
	
	var _isCharInRange2 = _interopRequireDefault(_isCharInRange);
	
	var _isCharUpperCase = __webpack_require__(22);
	
	var _isCharUpperCase2 = _interopRequireDefault(_isCharUpperCase);
	
	var _getChunkSize = __webpack_require__(23);
	
	var _getChunkSize2 = _interopRequireDefault(_getChunkSize);
	
	var _getChunk = __webpack_require__(24);
	
	var _getChunk2 = _interopRequireDefault(_getChunk);
	
	var _isCharConsonant = __webpack_require__(25);
	
	var _isCharConsonant2 = _interopRequireDefault(_isCharConsonant);
	
	var _isCharVowel = __webpack_require__(26);
	
	var _isCharVowel2 = _interopRequireDefault(_isCharVowel);
	
	var _isKana = __webpack_require__(10);
	
	var _isKana2 = _interopRequireDefault(_isKana);
	
	var _hiraganaToKatakana = __webpack_require__(27);
	
	var _hiraganaToKatakana2 = _interopRequireDefault(_hiraganaToKatakana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	  * @typedef {Object} DefaultOptions
	  * @property {Boolean} [useObsoleteKana=false] - Set to true to use obsolete characters, such as ゐ and ゑ.
	  * @example
	  * toHiragana('we', { useObsoleteKana: true })
	  * // => 'ゑ'
	  * @property {Boolean} [passRomaji=false] - Set to true to pass romaji when using mixed syllabaries with toKatakana() or toHiragana()
	  * @example
	  * toHiragana('only convert the katakana: ヒラガナ', { passRomaji: true })
	  * // => "only convert the katakana: ひらがな"
	  * @property {Boolean} [upcaseKatakana=false] - Set to true to convert katakana to uppercase using toRomaji()
	  * @example
	  * toRomaji('ひらがな　カタカナ', { upcaseKatakana: true })
	  * // => "hiragana KATAKANA"
	  * @property {Boolean} [IMEMode=false] - Set to true to handle conversion from a text input as it is being typed
	*/
	
	/**
	 * Convert [Romaji](https://en.wikipedia.org/wiki/Romaji) to [Kana](https://en.wikipedia.org/wiki/Kana), lowercase text will result in [Hiragana](https://en.wikipedia.org/wiki/Hiragana) and uppercase text will result in [Katakana](https://en.wikipedia.org/wiki/Katakana).
	 * @param  {String} [input=''] text
	 * @param  {DefaultOptions} [options={ useObsoleteKana: false, IMEMode: false }]
	 * @return {String} converted text
	 * @example
	 * toKana('onaji BUTTSUUJI'))
	 * // => 'おなじ ブッツウジ'
	 * toKana('ONAJI buttsuuji'))
	 * // => 'オナジ ぶっつうじ'
	 * toKana('座禅[zazen]スタイル'))
	 * // => '座禅「ざぜん」スタイル'
	 * toKana('batsuge-mu'))
	 * // => 'ばつげーむ'
	 * toKana('.,[]{}()!?/')) // Punctuation conversion
	 * // => '。、「」｛｝（）！？・'
	 * toKana('we', { useObsoleteKana: true })
	 * // => 'ゑ'
	 */
	function toKana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var ignoreCase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	  var config = Object.assign({}, _constants.DEFAULT_OPTIONS, options);
	  // Final output array
	  var kana = [];
	  // Position in the string that is being evaluated
	  var cursor = 0;
	  var len = input.length;
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
	    chunkSize = (0, _getChunkSize2.default)(maxChunk, len - cursor);
	    while (chunkSize > 0) {
	      chunk = (0, _getChunk2.default)(input, cursor, cursor + chunkSize);
	      chunkLC = chunk.toLowerCase();
	      // Handle super-rare edge cases with 4 char chunks (like ltsu, chya, shya)
	      if (_constants.FOUR_CHAR_EDGECASES.includes(chunkLC) && len - cursor >= 4) {
	        chunkSize += 1;
	        chunk = (0, _getChunk2.default)(input, cursor, cursor + chunkSize);
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
	          if ((0, _isCharConsonant2.default)(chunkLC.charAt(1), false) && (0, _isCharVowel2.default)(chunkLC.charAt(2))) {
	            chunkSize = 1;
	            chunk = (0, _getChunk2.default)(input, cursor, cursor + chunkSize);
	            chunkLC = chunk.toLowerCase();
	          }
	        }
	
	        // Handle case of double consonants
	        if (chunkLC.charAt(0) !== 'n' && (0, _isCharConsonant2.default)(chunkLC.charAt(0)) && chunk.charAt(0) === chunk.charAt(1)) {
	          chunkSize = 1;
	          // Return katakana ッ if chunk is uppercase, otherwise return hiragana っ
	          if ((0, _isCharInRange2.default)(chunk.charAt(0), _constants.UPPERCASE_START, _constants.UPPERCASE_END)) {
	            chunkLC = chunk = 'ッ';
	          } else {
	            chunkLC = chunk = 'っ';
	          }
	        }
	      }
	
	      kanaChar = _constants.FROM_ROMAJI[chunkLC];
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
	      if (input.charAt(cursor + 1).toLowerCase() === 'y' && (0, _isCharVowel2.default)(input.charAt(cursor + 2)) === false || cursor === len - 1 || (0, _isKana2.default)(input.charAt(cursor + 1))) {
	        // Don't transliterate this yet.
	        kanaChar = chunk.charAt(0);
	      }
	    }
	
	    // Use katakana if first letter in chunk is uppercase
	    if (!ignoreCase) {
	      if ((0, _isCharUpperCase2.default)(chunk.charAt(0))) {
	        kanaChar = (0, _hiraganaToKatakana2.default)(kanaChar);
	      }
	    }
	
	    kana.push(kanaChar);
	    cursor += chunkSize || 1;
	  }
	
	  return kana.join('');
	}
	
	exports.default = toKana;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _isCharInRange = __webpack_require__(3);
	
	var _isCharInRange2 = _interopRequireDefault(_isCharInRange);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests if char is in English unicode uppercase range
	 * @param  {String} char
	 * @return {Boolean}
	 */
	function isCharUpperCase() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  return (0, _isCharInRange2.default)(char, _constants.UPPERCASE_START, _constants.UPPERCASE_END);
	}
	
	exports.default = isCharUpperCase;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Limits picking chunk size to be no bigger than the remaining characters.
	 * @param  {Number} max index limit
	 * @param  {Number} remaining
	 * @return {Number}
	 */
	function getChunkSize() {
	  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var remaining = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	  return Math.min(max, remaining);
	}
	
	exports.default = getChunkSize;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Returns a substring based on start/end values
	 * @param  {String} text
	 * @param  {Number} start index
	 * @param  {Number} end index
	 * @return {String} new substring
	 */
	function getChunk() {
	  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var end = arguments[2];
	
	  return text.slice(start, end);
	}
	
	exports.default = getChunk;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests a character and an english consonant. Returns true if the char is a consonant.
	 * @param  {String} char
	 * @param  {Boolean} [includeY=true] Optional parameter to include y as a consonant in test
	 * @return {Boolean}
	 */
	function isCharConsonant() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var includeY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  var regexp = includeY ? /[bcdfghjklmnpqrstvwxyz]/ : /[bcdfghjklmnpqrstvwxz]/;
	  return char.toLowerCase().charAt(0).search(regexp) !== -1;
	}
	
	exports.default = isCharConsonant;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests a character and an english vowel. Returns true if the char is a vowel.
	 * @param  {String} char
	 * @param  {Boolean} [includeY=true] Optional parameter to include y as a vowel in test
	 * @return {Boolean}
	 */
	function isCharVowel() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var includeY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  var regexp = includeY ? /[aeiouy]/ : /[aeiou]/;
	  return char.toLowerCase().charAt(0).search(regexp) !== -1;
	}
	
	exports.default = isCharVowel;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _isCharLongDash = __webpack_require__(7);
	
	var _isCharLongDash2 = _interopRequireDefault(_isCharLongDash);
	
	var _isCharSlashDot = __webpack_require__(19);
	
	var _isCharSlashDot2 = _interopRequireDefault(_isCharSlashDot);
	
	var _isCharHiragana = __webpack_require__(6);
	
	var _isCharHiragana2 = _interopRequireDefault(_isCharHiragana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Convert [Hiragana](https://en.wikipedia.org/wiki/Hiragana) to [Katakana](https://en.wikipedia.org/wiki/Katakana)
	 * Passes through any non-hiragana chars
	 * @param  {String} [input=''] text input
	 * @return {String} converted text
	 * @example
	 * hiraganaToKatakana('ひらがな')
	 * // => "ヒラガナ"
	 * hiraganaToKatakana('ひらがな is a type of kana')
	 * // => "ヒラガナ is a type of kana"
	 * @ignore
	 */
	function hiraganaToKatakana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  var kata = [];
	  input.split('').forEach(function (char) {
	    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
	    if ((0, _isCharLongDash2.default)(char) || (0, _isCharSlashDot2.default)(char)) {
	      kata.push(char);
	    } else if ((0, _isCharHiragana2.default)(char)) {
	      // Shift charcode.
	      var code = char.charCodeAt(0) + (_constants.KATAKANA_START - _constants.HIRAGANA_START);
	      var kataChar = String.fromCharCode(code);
	      kata.push(kataChar);
	    } else {
	      // Pass non-hiragana chars through
	      kata.push(char);
	    }
	  });
	  return kata.join('');
	}
	
	exports.default = hiraganaToKatakana;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _hiraganaToKatakana = __webpack_require__(27);
	
	var _hiraganaToKatakana2 = _interopRequireDefault(_hiraganaToKatakana);
	
	var _isRomaji = __webpack_require__(13);
	
	var _isRomaji2 = _interopRequireDefault(_isRomaji);
	
	var _isRomajiKana = __webpack_require__(14);
	
	var _isRomajiKana2 = _interopRequireDefault(_isRomajiKana);
	
	var _romajiToHiragana = __webpack_require__(20);
	
	var _romajiToHiragana2 = _interopRequireDefault(_romajiToHiragana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Convert input to [Katakana](https://en.wikipedia.org/wiki/Katakana)
	 * @param  {String} [input=''] text
	 * @param  {Object} [options={ useObsoleteKana: false, passRomaji: false }]
	 * @return {String} converted text
	 * @example
	 * toKatakana('toukyou, おおさか')
	 * // => 'トウキョウ、　オオサカ'
	 * toKatakana('only かな', { passRomaji: true })
	 * // => 'only カナ'
	 * toKatakana('wi')
	 * // => 'うぃ'
	 * toKatakana('wi', { useObsoleteKana: true })
	 * // => 'ヰ'
	*/
	function toKatakana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var config = Object.assign({}, _constants.DEFAULT_OPTIONS, options);
	  if (config.passRomaji) return (0, _hiraganaToKatakana2.default)(input);
	  if ((0, _isRomaji2.default)(input) || (0, _isRomajiKana2.default)(input)) {
	    var romaji = (0, _romajiToHiragana2.default)(input, config);
	    return (0, _hiraganaToKatakana2.default)(romaji);
	  }
	  return (0, _hiraganaToKatakana2.default)(input);
	}
	
	exports.default = toKatakana;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _constants = __webpack_require__(1);
	
	var _getChunkSize = __webpack_require__(23);
	
	var _getChunkSize2 = _interopRequireDefault(_getChunkSize);
	
	var _getChunk = __webpack_require__(24);
	
	var _getChunk2 = _interopRequireDefault(_getChunk);
	
	var _isKatakana = __webpack_require__(8);
	
	var _isKatakana2 = _interopRequireDefault(_isKatakana);
	
	var _katakanaToHiragana = __webpack_require__(18);
	
	var _katakanaToHiragana2 = _interopRequireDefault(_katakanaToHiragana);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Convert kana to romaji
	 * @param  {String} kana text input
	 * @param  {DefaultOptions} [options={ upcaseKatakana: false, IMEMode: false }]
	 * @return {String} converted text
	 * @example
	 * toRomaji('ひらがな　カタカナ')
	 * // => "hiragana katakana"
	 * toRomaji('ひらがな　カタカナ', { upcaseKatakana: true })
	 * // => "hiragana KATAKANA"
	 */
	function toRomaji() {
	  var kana = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var config = Object.assign({}, _constants.DEFAULT_OPTIONS, options);
	  var len = kana.length;
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
	    chunkSize = (0, _getChunkSize2.default)(maxChunk, len - cursor);
	    var convertThisChunkToUppercase = false;
	    while (chunkSize > 0) {
	      chunk = (0, _getChunk2.default)(kana, cursor, cursor + chunkSize);
	      if ((0, _isKatakana2.default)(chunk)) {
	        convertThisChunkToUppercase = config.upcaseKatakana;
	        chunk = (0, _katakanaToHiragana2.default)(chunk);
	      }
	      // special case for small tsus
	      if (chunk.charAt(0) === 'っ' && chunkSize === 1 && cursor < len - 1) {
	        nextCharIsDoubleConsonant = true;
	        romaChar = '';
	        break;
	      }
	
	      romaChar = _constants.TO_ROMAJI[chunk];
	
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
	
	exports.default = toRomaji;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _isCharKana = __webpack_require__(11);
	
	var _isCharKana2 = _interopRequireDefault(_isCharKana);
	
	var _isCharPunctuation = __webpack_require__(31);
	
	var _isCharPunctuation2 = _interopRequireDefault(_isCharPunctuation);
	
	var _isKanjiKana = __webpack_require__(12);
	
	var _isKanjiKana2 = _interopRequireDefault(_isKanjiKana);
	
	var _isKana = __webpack_require__(10);
	
	var _isKana2 = _interopRequireDefault(_isKana);
	
	var _isKanji = __webpack_require__(15);
	
	var _isKanji2 = _interopRequireDefault(_isKanji);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * Strips trailing [Okurigana](https://en.wikipedia.org/wiki/Okurigana) if `input` is a mix of [Kanji](https://en.wikipedia.org/wiki/Kanji) and [Kana](https://en.wikipedia.org/wiki/Kana)
	 * @param  {String} input text
	 * @param  {Object} [options={ all: false }] config object specifying if *all* kana should be removed, not just trailing okurigana
	 * @return {String} text with okurigana removed
	 * @example
	 * stripOkurigana('踏み込む')
	 * // => '踏み込'
	 * stripOkurigana('粘り。')
	 * // => '粘。'
	 * stripOkurigana('お祝い')
	 * // => 'お祝'
	 * stripOkurigana('踏み込む', { all: true })
	 * // => '踏込'
	 * stripOkurigana('お祝い', { all: true })
	 * // => '祝'
	 */
	function stripOkurigana() {
	  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { all: false };
	
	  if ((0, _isEmpty2.default)(input) || !(0, _isKanjiKana2.default)(input) || (0, _isKana2.default)(input)) return input;
	  var chars = [].concat(_toConsumableArray(input));
	
	  // strip every kana
	  if (options.all) return chars.filter(function (char) {
	    return !(0, _isCharKana2.default)(char);
	  }).join('');
	
	  // strip trailing only
	  var reverseChars = chars.reverse();
	  for (var i = 0, len = reverseChars.length; i < len; i += 1) {
	    var char = reverseChars[i];
	    // pass if it's punctuation
	    if ((0, _isCharPunctuation2.default)(char)) continue; // eslint-disable-line no-continue
	    // blank out if not kanji
	    if (!(0, _isKanji2.default)(char)) {
	      reverseChars[i] = '';
	    } else break; // stop when we hit a kanji char
	  }
	
	  return reverseChars.reverse().join('');
	}
	
	exports.default = stripOkurigana;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	var _isCharEnglishPunctuation = __webpack_require__(32);
	
	var _isCharEnglishPunctuation2 = _interopRequireDefault(_isCharEnglishPunctuation);
	
	var _isCharJapanesePunctuation = __webpack_require__(33);
	
	var _isCharJapanesePunctuation2 = _interopRequireDefault(_isCharJapanesePunctuation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests a character. Returns true if the character is considered Japanese or English punctuation.
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharPunctuation() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  return (0, _isCharEnglishPunctuation2.default)(char) || (0, _isCharJapanesePunctuation2.default)(char);
	}
	
	exports.default = isCharPunctuation;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _constants = __webpack_require__(1);
	
	var _isCharInRange = __webpack_require__(3);
	
	var _isCharInRange2 = _interopRequireDefault(_isCharInRange);
	
	var _isEmpty = __webpack_require__(4);
	
	var _isEmpty2 = _interopRequireDefault(_isEmpty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests a character. Returns true if the character is considered English punctuation.
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharEnglishPunctuation() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  if ((0, _isEmpty2.default)(char)) return false;
	  return _constants.ENGLISH_PUNCTUATION_RANGES.some(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        start = _ref2[0],
	        end = _ref2[1];
	
	    return (0, _isCharInRange2.default)(char, start, end);
	  });
	}
	
	exports.default = isCharEnglishPunctuation;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _constants = __webpack_require__(1);
	
	var _isCharInRange = __webpack_require__(3);
	
	var _isCharInRange2 = _interopRequireDefault(_isCharInRange);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Tests a character. Returns true if the character is considered Japanese punctuation.
	 * @param  {String} char character string to test
	 * @return {Boolean}
	 */
	function isCharJapanesePunctuation() {
	  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  return _constants.JAPANESE_FULLWIDTH_PUNCTUATION_RANGES.some(function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 2),
	        start = _ref2[0],
	        end = _ref2[1];
	
	    return (0, _isCharInRange2.default)(char, start, end);
	  });
	}
	
	exports.default = isCharJapanesePunctuation;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=kanawana.js.map