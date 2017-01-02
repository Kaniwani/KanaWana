/**
 * Limits picking chunk size to be no bigger than the remaining characters.
 * @param  {Number} max index limit
 * @param  {Number} remaining
 * @return {Number}
 */
export default function getChunkSize(max, remaining) {
  return Math.min(max, remaining);
}
