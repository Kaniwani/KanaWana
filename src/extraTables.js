const romajitable = [
// romaji sequences will be taken from this table and put into what effectively
// acts as a hash-map, and the longest substring that has a kana equivalent
// will be used.
  ['/', '・', '・'],
  [',', '、', '、'],
  ['.', '。', '。'],
  ['[', '「', '「'],
  [']', '」', '」'],
];

const hash = {};
let maxlen = 0;
for (let i = 0; i < romajitable.length; i += 1) {
  hash[romajitable[i][0]] = {};
  hash[romajitable[i][0]].hiragana = romajitable[i][1];
  hash[romajitable[i][0]].katakana = romajitable[i][2];
  if (maxlen < romajitable[i][0].length) {
    maxlen = romajitable[i][0].length;
  }
}

function performConversion() {
  const romaji = document.forms[0].romaji.value.toLowerCase();
  let hiragana = '';
  let katakana = '';
  let pos = 0;
  while (pos < romaji.length) {
    let len = maxlen;
    if (romaji.length - pos < len) {
      len = romaji.length - pos;
    }
    let found = false;
    while (len > 0 && !found) {
      if (hash[romaji.substring(pos, pos + len)] != null) {
        hiragana += hash[romaji.substring(pos, pos + len)].hiragana;
        katakana += hash[romaji.substring(pos, pos + len)].katakana;
        pos += len;
        found = true;
      }
      len -= 1;
    }
    if (!found) {
      hiragana += romaji.charAt(pos);
      katakana += romaji.charAt(pos);
      pos +=1;
    }
  }
  document.forms[0].hiragana.value = hiragana;
  document.forms[0].katakana.value = katakana;
}
