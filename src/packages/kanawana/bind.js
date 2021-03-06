import onInput from './utils/onInput';

/**
 * Binds eventListener for 'input' events to an input field to automagically replace values with kana
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 * @param  {DefaultOptions} [options=defaultOptions] user config overrides
 */
export function bind(input, options = {}) {
  input.addEventListener('input', (event) => onInput(event, options));
}

export default bind;
