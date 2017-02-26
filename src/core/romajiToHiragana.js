import toKana from './toKana';

/**
 * Convert romaji to hiragana
 * @param  {String} roma text input
 * @param  {Object} options used internally to pass along default options
 * @return {String} converted text
 */
function romajiToHiragana(roma = '', options = {}) {
  return toKana(roma, options, true);
}

export default romajiToHiragana;
