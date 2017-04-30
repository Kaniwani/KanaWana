<div align="center">
  <!-- Npm Version -->
  <a href="https://www.npmjs.com/package/kanawana">
    <img src="https://img.shields.io/npm/v/kanawana.svg" alt="NPM package" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/Kaniwani/KanaWana">
    <img src="https://img.shields.io/travis/Kaniwani/KanaWana.svg" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
  <a href="https://coveralls.io/github/Kaniwani/KanaWana">
    <img src="https://img.shields.io/coveralls/Kaniwani/KanaWana.svg" alt="Test Coverage" />
  </a>
</div>

<div align="center">
<h1>カナワナ &lt;--&gt; KanaWana &lt;--&gt; かなわな</h1>
<h4>Javascript utility library for checking and converting between Kanji, Hiragana, Katakana, and Romaji</h4>
</div>


## Demo
[kaniwani.github.io/KanaWana/demo](https://kaniwani.github.io/KanaWana/demo)


## Documentation
[kaniwani.github.io/KanaWana/docs](https://kaniwani.github.io/KanaWana/docs/global.html)


## Install
```shell
npm install kanawana
# or yarn add kanawana
```

## Quick Use
### HTML:
```html
<input type="text" id="kanawana-input" />
<script src="node_modules/kanawana/browser/kanawana.min.js"></script>
<script>
  const textInput = document.querySelector('#kanawana-input');
  kanawana.bind(textInput); // IME Mode
</script>
```
### JavaScript:
```javascript
// UMD/CommonJS/node
const kw = require('kanawana');

// ES modules
import kw from 'kanawana';
// with destructuring
import { toKana, isRomaji } from 'kanawana';
// or directly reference single methods for smaller builds:
import isKanji from 'kanawana/isKanji';

/*** DEFAULT OPTIONS ***/
{
  // Use obsolete kana characters, such as ゐ and ゑ.
  useObsoleteKana: false,
  // Pass through romaji when using toKatakana() or toHiragana()
  passRomaji: false,
  // Convert katakana to uppercase when using toRomaji()
  upcaseKatakana: false,
  // Convert characters from a text input while being typed.
  IMEMode: false,
}

/*** DOM HELPERS ***/

// Automatically converts to kana using an eventListener on input
// Uses { IMEMode:true } by default (first example on the demo page)
kw.bind(domElement [, options]);

// Removes event listener
kw.unbind(domElement);


/*** TEXT CHECKING UTILITIES ***/

kw.isJapanese('泣き虫。！〜') // Full-width punctuation allowed
// => true
kw.isJapanese('泣き虫.!~') // Half-width / Latin punctuation fails
// => false

kw.isKana('あーア')
// => true

kw.isHiragana('げーむ')
// => true

kw.isKatakana('ゲーム')
// => true

kw.isKanji('切腹')
// => true

kw.isMixed('お腹A')
// => true

kw.isRomaji('Tōkyō and Ōsaka') // allows basic Hepburn romanisation
// => true

/*
 * toKana notes:
 * Lowercase -> Hiragana.
 * Uppercase -> Katakana.
 * Non-romaji and _English_ punctuation is passed through: 123 @#$%
 * Japanese equivalent punctuation is converted:
 * !?.:/,~-‘’“”[](){}
 * ！？。：・、〜ー「」『』［］（）｛｝
 */
kw.toKana('ONAJI buttsuuji')
// => 'オナジ ぶっつうじ'
kw.toKana('座禅‘zazen’スタイル')
// => '座禅「ざぜん」スタイル'
kw.toKana('batsuge-mu')
// => 'ばつげーむ'

kw.toHiragana('toukyou, オオサカ')
// => 'とうきょう、　おおさか'
kw.toHiragana('only カナ', { passRomaji: true })
// => 'only かな'
kw.toHiragana('wi', { useObsoleteKana: true })
// => 'ゐ'

kw.toKatakana('toukyou, おおさか')
// => 'トウキョウ、　オオサカ'
kw.toKatakana('only かな', { passRomaji: true })
// => 'only カナ'
kw.toKatakana('wi', { useObsoleteKana: true })
// => 'ヰ'

kw.toRomaji('ひらがな　カタカナ')
// => 'hiragana katakana'
kw.toRomaji('ひらがな　カタカナ', { upcaseKatakana: true })
// => 'hiragana KATAKANA'


/*** EXTRA UTILITIES ***/

kw.stripOkurigana('お祝い')
// => 'お祝'
kw.stripOkurigana('踏み込む')
// => '踏み込'
kw.stripOkurigana('踏み込む', { all: true })
// => '踏込'

kw.tokenize('ふふフフ')
// => ['ふふ', 'フフ']
kw.tokenize('感じ')
// => ['感', 'じ']
kw.tokenize('I said "私は悲しい"')
// => ['I said "','私', 'は', '悲', 'しい', '"']
```

## Credits
Adapted from the [WanaKana Project](https://github.com/WaniKani/WanaKana) sponsored by [Tofugu](http://www.tofugu.com) & [WaniKani](https://www.wanikani.com)

## License
This project is licensed under the MIT license, Copyright (c) 2013 WaniKani Community Github. For more information see LICENSE file.
