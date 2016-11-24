import {
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
} from './core';

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
