<div align="center">
  <!-- Npm Version -->
  <a href="https://www.npmjs.com/package/kanawana">
    <img src="https://img.shields.io/npm/v/kanawana.svg" alt="devDependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/KaniWani/KanaWana#info=devDependencies">
    <img src="https://img.shields.io/david/dev/Kaniwani/KanaWana.svg" alt="devDependency Status" />
  </a>
 <!-- Build Status -->
  <a href="https://travis-ci.org/KaniWani/KanaWana">
    <img src="https://img.shields.io/travis/Kaniwani/KanaWana.svg" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
  <a href="https://coveralls.io/github/Kaniwani/KanaWana">
    <img src="https://img.shields.io/coveralls/Kaniwani/KanaWana.svg" alt="Test Coverage" />
  </a>
</div>

<div align="center">
<h1>カナワナ &lt;--&gt; KanaWana &lt;--&gt; かなわな</h1>
<h4>Javascript library that provides utilities for detecting and transliterating Hiragana &lt;--&gt; Romaji &lt;--&gt; Katakana.</h4>
</div>


## Demo
[kaniwani.github.io/KanaWana/](https://kaniwani.github.io/KanaWana/)


## Documentation
[kaniwani.github.io/KanaWana/docs](https://kaniwani.github.io/KanaWana/docs/global.html)


## Install
```shell
npm install kanawana
# or yarn add kanawana
```

## Quick Use
```javascript
const kw = require('kanawana');
// Or directly import single methods using ES6 for smaller builds:
// import toKana from 'kanawana/core/toKana';

// Default options object
{
  useObsoleteKana: false, // Set to true to use obsolete characters, such as ゐ and ゑ.
  passRomaji: false, // Set to true to pass romaji when using mixed syllabaries with toKatakana() or toHiragana()
  upcaseKatakana: false, // Set to true to convert katakana to uppercase when using toRomaji()
  IMEMode: false, // Set to true to handle input from a text input as it is typed.
}

// Automatically converts romaji to kana by using an eventListener on input
// Uses { IMEMode:true } by default (first example on the demo page)
kw.bind(domElement [, options]);

// Removes event listener
kw.unbind(domElement);

// Returns false if string contains characters outside of the kana family, otherwise true if Hiragana and/or Katakana.
kw.isKana(string);

// Returns false if string contains mixed characters, otherwise true if Hiragana.
kw.isHiragana(string);

// Returns false if string contains mixed characters, otherwise true if Katakana.
kw.isKatakana(string);

// Returns true if string contains basic latin or hepburn romanisation
kw.isRomaji(string);

// Returns true if string contains only kanji and/or kana
kw.isKanjiKana(string);

// Returns true if string contains both romaji *and* kana
kw.isRomajiKana(string);

// Convert Romaji to Kana. Lowercase becomes Hiragana, while uppercase becomes Katakana.
// Non romaji and _some_ punctuation is passed through: 12345 @#$%
// However, .,-~[]{}()!?/ will become 。、ー〜「」｛｝（）！？・
kw.toKana(string [, options]);

// Convert Kana to Romaji.
// Use {upcaseKatakana: true} if you want to convert katakana to uppercase romaji
kw.toRomaji(string [, options]);

// Convert Katakana or Romaji to Hiragana.
// Use {passRomaji: true} if you want to convert Katakana while keeping any romaji intact
kw.toHiragana(string [, options]);

// Convert Hiragana or Romaji to Katakana.
// Use {passRomaji: true} if you want to convert Hiragana while keeping any romaji intact
kw.toKatakana(string [, options]);

// Remove Okurigana
// Use {all: true} if you want to remove all kana, not just trailing okurigana
kw.stripOkurigana(string [, options]);
```

## Credits
Based on the [WanaKana Project](https://github.com/WaniKani/WanaKana) sponsored by [Tofugu](http://www.tofugu.com) & [WaniKani](http://www.wanikani.com)

## License
This project is licensed under the MIT license, Copyright (c) 2016 Duncan Bay. For more information see LICENSE.md.
