import romajiToKana from './romajiToKana';

/**
 * Convert romaji to hiragana
 * @param  {String} roma text input
 * @param  {Object}
 * @return {String} converted text
 */
export default function romajiToHiragana(roma, options = {}) {
  return romajiToKana(roma, options, true);
}
