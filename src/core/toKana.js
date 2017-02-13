import romajiToKana from './romajiToKana';

/**
 * Converts input to kana.
 * Uses romajiToKana under the hood
 * @param  {String} input text to convert
 * @param  {Object} options
 * @return {String} converted text
 * @example
 * toKana('hiragana')
 * // => 'ひらがな'
 * toKana('KATAKANA')
 * // => 'カタカナ'
 */
function toKana(input, options) {
  return romajiToKana(input, options);
}

export default toKana;
