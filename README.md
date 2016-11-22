カナワナ <-> KanaWana <-> かなわな
===============================

Javascript library that provides utilities for detecting and transliterating Hiragana &lt;--> Katakana &lt;--> Romaji.

## Usage

### HTML
```html
```

### Javascript
```javascript
```

## Documentation

```javascript
// Returns false if string contains mixed characters, otherwise true if Hiragana.
kanawana.isHiragana(string);

// Returns false if string contains characters outside of the kana family, otherwise true if Hiragana and/or Katakana.
kanawana.isKana(string);

// Returns false if string contains mixed characters, otherwise true if Katakana.
kanawana.isKatakana(string);

// Convert Katakana or Romaji to Hiragana.
kanawana.toHiragana(string [, options]);

// Convert Romaji to Kana. Lowcase entries output Hiragana, while upcase entries output Katakana.
kanawana.toKana(string [, options]);

// Convert Hiragana or Romaji to Katakana.
kanawana.toKatakana(string [, options]);

// Convert Kana to Romaji.
kanawana.toRomaji(string [, options]);

// Options:
// Many functions take an optional `options` object.
// Here is the default object used for options.
{
  useObsoleteKana: false, // Set to true to use obsolete characters, such as ゐ and ゑ.
    IMEMode: false // Set to true to handle input from a text input as it is typed.
}
```

## Credits

Based on the [WanaKana Project](https://github.com/WaniKani/WanaKana) that was sponsored by [Tofugu](http://www.tofugu.com) & [WaniKani](http://www.wanikani.com)

