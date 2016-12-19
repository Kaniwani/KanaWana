import {
  defaultOptions,
  isHiragana,
  isKatakana,
  isKana,
  isRomaji,
  toHiragana,
  toKatakana,
  toKana,
  toRomaji,
} from './core';

import {
  convertFullwidthCharsToASCII,
} from './utils';

function bind(input, options) {
  input.addEventListener('input', (event) => onInput(event, options));
}

function unbind(input) {
  input.removeEventListener('input', onInput);
}

function onInput(event, opts) {
  const options = Object.assign({}, defaultOptions, opts, { IMEMode: true });
  const input = event.target;
  // const startingCursor = input.selectionStart;
  // const startingLength = input.value.length;
  const normalizedInputString = convertFullwidthCharsToASCII(input.value);
  const newText = toKana(normalizedInputString, options);
  if (normalizedInputString !== newText) {
    input.value = newText;
    if (typeof input.selectionStart === 'number') {
      input.selectionStart = input.selectionEnd = input.value.length;
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

const kanawana = {
  bind,
  unbind,
  isHiragana,
  isKatakana,
  isKana,
  isRomaji,
  toHiragana,
  toKatakana,
  toKana,
  toRomaji,
};

window.kanawana = kanawana;

export default kanawana;
