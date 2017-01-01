// References
// http://unicode-table.com
// http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml

const ENGLISH_PUNCTUATION_RANGES = [
  [0x21, 0x2F],
  [0x3A, 0x3F],
  [0x5B, 0x60],
  [0x7B, 0x7E],
];
const JAPANESE_FULLWIDTH_PUNCTUATION_RANGES = [
  [0x3001, 0x303E],
  [0x30FB, 0x30FC],
  [0xFF01, 0xFF0F],
  [0xFF1A, 0xFF1F],
  [0xFF3B, 0xFF3F],
  [0xFF5B, 0xFF60],
];
const LOWERCASE_START = 0x61;
const LOWERCASE_END = 0x7A;
const UPPERCASE_START = 0x41;
const UPPERCASE_END = 0x5A;
const HIRAGANA_START = 0x3041;
const HIRAGANA_END = 0x3096;
const KATAKANA_START = 0x30A1;
const KATAKANA_END = 0x30FC;
const KANJI_START = 0x4E00;
const KANJI_END = 0x9FAF;
const LOWERCASE_FULLWIDTH_START = 0xFF41;
const LOWERCASE_FULLWIDTH_END = 0xFF5A;
const UPPERCASE_FULLWIDTH_START = 0xFF21;
const UPPERCASE_FULLWIDTH_END = 0xFF3A;
const PROLONGED_SOUND_MARK = 0x30FC;
const KANA_SLASH_DOT = 0x30FB;

// All Japanese regex, for mixes of kanji and kana like "泣き虫"
// Includes Japanese full-width punctuation ranges
// doesn't include *half-width katakana / roman letters* since they should be considered typos
const KANJI_KANA_REGEX = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff01-\uff0f\u4e00-\u9faf\u3400-\u4dbf]/;

export {
  ENGLISH_PUNCTUATION_RANGES,
  JAPANESE_FULLWIDTH_PUNCTUATION_RANGES,
  LOWERCASE_START,
  LOWERCASE_END,
  UPPERCASE_START,
  UPPERCASE_END,
  HIRAGANA_START,
  HIRAGANA_END,
  KATAKANA_START,
  KATAKANA_END,
  KANJI_START,
  KANJI_END,
  LOWERCASE_FULLWIDTH_START,
  LOWERCASE_FULLWIDTH_END,
  UPPERCASE_FULLWIDTH_START,
  UPPERCASE_FULLWIDTH_END,
  PROLONGED_SOUND_MARK,
  KANA_SLASH_DOT,
  KANJI_KANA_REGEX,
};
