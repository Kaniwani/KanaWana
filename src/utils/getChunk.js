/**
 * Returns a substring based on start/end values
 * @param  {String} text
 * @param  {Number} start index
 * @param  {Number} end index
 * @return {String} new substring
 */
export default function getChunk(text, start, end) {
  return text.slice(start, end);
}
