import romajiToKana from './romajiToKana';

/**
 * Convert romaji to hiragana
 * @param  {String} roma text input
 * @param  {Object}
 * @return {String} converted text
 */
function romajiToHiragana(roma, options = {}) {
  return romajiToKana(roma, options, true);
}

export default romajiToHiragana;
