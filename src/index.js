import { DEFAULT_OPTIONS } from './constants';
import convertFullwidthCharsToASCII from './utils/convertFullwidthCharsToASCII';
import isHiragana from './core/isHiragana';
import isKatakana from './core/isKatakana';
import isKana from './core/isKana';
import isKanjiKana from './core/isKanjiKana';
import isRomaji from './core/isRomaji';
import isRomajiKana from './core/isRomajiKana';
import isKanji from './core/isKanji';
import toHiragana from './core/toHiragana';
import toKatakana from './core/toKatakana';
import toKana from './core/toKana';
import toRomaji from './core/toRomaji';
import stripOkurigana from './core/stripOkurigana';

/**
 * Binds eventListener for 'input' events to an input field to automagically replace values with kana
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 * @param  {Object} [options={}] user config overrides
 */
function bind(input, options = {}) {
  input.addEventListener('input', (event) => onInput(event, options));
}

/**
 * Unbinds eventListener from input field
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 */
function unbind(input) {
  input.removeEventListener('input', onInput);
}

/**
 * Automagically replaces input values with converted text to kana
 * @param  {Object} event DOM event to listen to
 * @param  {Object} [options={}] user config overrides
 */
function onInput(event, options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options, { IMEMode: true });
  const input = event.target;
  // const startingCursor = input.selectionStart;
  // const startingLength = input.value.length;
  const normalizedInputString = convertFullwidthCharsToASCII(input.value);
  const newText = toKana(normalizedInputString, config);
  if (normalizedInputString !== newText) {
    input.value = newText;
    if (typeof input.selectionStart === 'number') {
      input.selectionStart = input.value.length;
      input.selectionEnd = input.value.length;
      return;
    }
    if (typeof input.createTextRange !== 'undefined') {
      input.focus();
      const range = input.createTextRange();
      range.collapse(false);
      range.select();
    }
  }
}

export {
  bind,
  unbind,
  isHiragana,
  isKatakana,
  isKana,
  isKanjiKana,
  isRomaji,
  isRomajiKana,
  isKanji,
  toHiragana,
  toKatakana,
  toKana,
  toRomaji,
  stripOkurigana,
};
