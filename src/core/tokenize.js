import isEmpty from '../utils/isEmpty';
import isCharJapanesePunctuation from '../utils/isCharJapanesePunctuation';
import isCharKanji from '../utils/isCharKanji';
import isCharHiragana from '../utils/isCharHiragana';
import isCharKatakana from '../utils/isCharKatakana';
import isCharRomaji from '../utils/isCharRomaji';

/**
 * Strips trailing [Okurigana](https://en.wikipedia.org/wiki/Okurigana) if `input` is a mix of [Kanji](https://en.wikipedia.org/wiki/Kanji) and [Kana](https://en.wikipedia.org/wiki/Kana)
 * @param  {String} input text
 * @return {Array} text split into kanji/kana tokens
 * @example
 * tokenize('踏み込む')
 * // => '踏み込'
 */

function getType(input = '') {
  switch (true) {
    case (isCharJapanesePunctuation(input)): return 'japanesePunctuation';
    case (isCharKanji(input)): return 'kanji';
    case (isCharHiragana(input)): return 'hiragana';
    case (isCharKatakana(input)): return 'katakana';
    case (isCharRomaji(input)): return 'romaji';
    default: return 'unknown';
  }
}

function tokenize(input = '') {
  if (isEmpty(input)) return [''];
  const chars = [...input];
  const head = chars.shift();
  let prevType = getType(head);

  const result = chars.reduce((tokens, char) => {
    const currType = getType(char);
    const sameType = currType === prevType;
    prevType = getType(char);
    if (sameType) {
      const prev = tokens.pop();
      return tokens.concat(prev.concat(char));
    }
    return tokens.concat(char);
  }, [head]);

  return result;
}

export default tokenize;
