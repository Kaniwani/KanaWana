import {
  HIRAGANA_END,
  HIRAGANA_START,
} from '../constants';

import {
  guard,
  getChunk,
  getChunkSize,
  isCharInRange,
  isCharVowel,
  isCharConsonant,
  isCharKatakana,
  isCharHiragana,
  isCharKana,
  isCharNotKana,
  isCharUpperCase,
  convertFullwidthCharsToASCII,
} from '../utils';

/* eslint-disable no-undef */
/* since { describe, it, test, expect } etc aren't explicitly imported from jest */

const identity = (x) => x;

describe('guard', () => {
  it('passes parameter tests', () => {
    expect(guard(null, identity)).toBe(undefined);
    expect(guard(undefined, identity)).toBe(undefined);
    expect(guard('toasted cheese', identity)).toEqual('toasted cheese');
    expect(guard(2, identity)).toEqual(2);
    expect(guard({ derp: 'alerp' }, identity)).toEqual({ derp: 'alerp' });
    expect(guard('', identity)).toEqual('');
  });
});

describe('getChunk', () => {
  it('passes parameter tests', () => {
    expect(getChunk('derpalerp', 3, 6)).toBe('pal');
    expect(getChunk('de', 0, 1)).toBe('d');
    expect(getChunk('', 1, 2)).toBe('');
  });
});

describe('getChunkSize', () => {
  it('passes parameter tests', () => {
    expect(getChunkSize(4, 2)).toBe(2);
    expect(getChunkSize(2, 2)).toBe(2);
    expect(getChunkSize(2, 4)).toBe(2);
    expect(getChunkSize(0, 0)).toBe(0);
    expect(getChunkSize(3, -1)).toBe(-1);
  });
});

describe('isCharInRange', () => {
  it('passes parameter tests', () => {
    expect(isCharInRange('は', HIRAGANA_START, HIRAGANA_END)).toBe(true);
    expect(isCharInRange('d', HIRAGANA_START, HIRAGANA_END)).toBe(false);
  });
});

describe('isCharVowel', () => {
  it('passes parameter tests', () => {
    [...'aeiouy'].forEach(vowel => expect(isCharVowel(vowel)).toBe(true));
    expect(isCharVowel('y', false /* excludes 'y' as a vowel */)).toBe(false);
    expect(isCharVowel('x')).toBe(false);
    expect(isCharVowel('!')).toBe(false);
    expect(isCharVowel('')).toBe(false);
  });
});

describe('isCharConsonant', () => {
  it('passes parameter tests', () => {
    [...'bcdfghjklmnpqrstvwxyz'].forEach(consonant => expect(isCharConsonant(consonant)).toBe(true));
    expect(isCharConsonant('y', false /* excludes 'y' as a consonant */)).toBe(false);
    expect(isCharConsonant('a')).toBe(false);
    expect(isCharConsonant('!')).toBe(false);
    expect(isCharConsonant('')).toBe(false);
  });
});

describe('isCharKatakana', () => {
  it('passes parameter tests', () => {
    expect(isCharKatakana('ナ')).toBe(true);
    expect(isCharKatakana('は')).toBe(false);
    expect(isCharKatakana('n')).toBe(false);
    expect(isCharKana('!')).toBe(false);
    expect(isCharKana('')).toBe(false);
  });
});

describe('isCharHiragana', () => {
  it('passes parameter tests', () => {
    expect(isCharHiragana('な')).toBe(true);
    expect(isCharHiragana('ナ')).toBe(false);
    expect(isCharHiragana('n')).toBe(false);
    expect(isCharKana('!')).toBe(false);
    expect(isCharKana('')).toBe(false);
  });
});

describe('isCharKana', () => {
  it('passes parameter tests', () => {
    expect(isCharKana('は')).toBe(true);
    expect(isCharKana('ナ')).toBe(true);
    expect(isCharKana('n')).toBe(false);
    expect(isCharKana('!')).toBe(false);
    expect(isCharKana('')).toBe(false);
  });
});

describe('isCharNotKana', () => {
  it('passes parameter tests', () => {
    expect(isCharNotKana('n')).toBe(true);
    expect(isCharNotKana('!')).toBe(true);
    expect(isCharNotKana('')).toBe(true);
    expect(isCharNotKana('は')).toBe(false);
    expect(isCharNotKana('ナ')).toBe(false);
  });
});

describe('isCharUpperCase', () => {
  it('passes parameter tests', () => {
    expect(isCharUpperCase('A')).toBe(true);
    expect(isCharUpperCase('D')).toBe(true);
    expect(isCharUpperCase('')).toBe(false);
    expect(isCharUpperCase('a')).toBe(false);
    expect(isCharUpperCase('d')).toBe(false);
  });
});

describe('convertFullwidthCharsToASCII', () => {
  it('passes parameter tests', () => {
    expect(convertFullwidthCharsToASCII('ＡＢＣＤＥＦＧａｂｃｄｅｆｇ')).toBe('ABCDEFGabcdefg');
  });
});
