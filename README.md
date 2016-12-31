<div align="center">
<!-- Dependency Status -->
  <a href="https://david-dm.org/DJTB/KanaWana">
    <img src="https://img.shields.io/david/Kaniwani/KanaWana.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/DJTB/KanaWana#info=devDependencies">
    <img src="https://img.shields.io/david/dev/Kaniwani/KanaWana.svg" alt="devDependency Status" />
  </a>
 <!-- Build Status -->
  <a href="https://travis-ci.org/DJTB/KanaWana">
    <img src="https://img.shields.io/travis/Kaniwani/KanaWana.svg" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
  <a href="https://coveralls.io/r/DJTB/KanaWana">
    <img src="https://img.shields.io/coveralls/Kaniwani/KanaWana.svg" alt="Test Coverage" />
  </a>
</div>

<div align="center">
<h1>カナワナ &lt;--&gt; KanaWana &lt;--&gt; かなわな</h1>
<h3>Javascript library that provides utilities for detecting and transliterating Hiragana &lt;--&gt; Romaji &lt;--&gt; Katakana.</h3>
</div>


## Demo
[kaniwani.github.io/KanaWana/](https://kaniwani.github.io/KanaWana/)

## Install
```shell
yarn add kanawana
```

## Usage

```javascript

const kanawana = require('kanawana');
// Or cherrypick in ES6 via import { toKana, isHiragana } from 'kanawana';

// Adds event listener to an input field, defaulting to IME mode
kanawana.bind(domElement [, options]);

// Removes event listener
kanawana.unbind(domElement);

// Returns false if string contains mixed characters, otherwise true if Hiragana.
kanawana.isHiragana(string);

// Returns false if string contains characters outside of the kana family, otherwise true if Hiragana and/or Katakana.
kanawana.isKana(string);

// Returns false if string contains mixed characters, otherwise true if Katakana.
kanawana.isKatakana(string);

// Convert Romaji to Kana. Lowcase entries output Hiragana, while upcase entries output Katakana.
// Non romaji and some punctuation is passed through: 12345 @#$%, except for .,[]{}()!?/ which become 。、「」｛｝（）！？・
kanawana.toKana(string [, options]);

// Convert Katakana or Romaji to Hiragana.
// Use {passRomaji: true} if you want to convert Katakana while keeping any romaji intact
kanawana.toHiragana(string [, options]);

// Convert Hiragana or Romaji to Katakana.
// Use {passRomaji: true} if you want to convert Hiragana while keeping any romaji intact
kanawana.toKatakana(string [, options]);

// Explicitly convert Hiragana to Katakana - always ignores romaji passed in
// IE "zazen"はざぜん -> "zazen"ハザゼン
kanawana.hiraganaToKatakana(string);

// Explicitly convert Katakana to Hiragana - always ignores romaji passed in
// IE "zazen"ハザゼン -> "zazen"はざぜん
kanawana.katakanaToHiragana(string);

// Convert Kana to Romaji.
kanawana.toRomaji(string [, options]);

// Options:
// Many functions take an optional `options` object.
// Here is the default object used for options.
{
  // Set to true to use obsolete characters, such as ゐ and ゑ.
  useObsoleteKana: false,
  // Set to true to pass romaji when using mixed syllabaries with toKatakana() or toHiragana(), such as "romaji is not かな"
  passRomaji: false,
  // Set to true to handle input from a text input as it is typed.
  IMEMode: false,
;
```

## Credits
Based on the [WanaKana Project](https://github.com/WaniKani/WanaKana) sponsored by [Tofugu](http://www.tofugu.com) & [WaniKani](http://www.wanikani.com)

## License
This project is licensed under the MIT license, Copyright (c) 2016 Duncan Bay. For more information see LICENSE.md.
