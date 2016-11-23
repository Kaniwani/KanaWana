import testTable from './transliteration-table';
import {
  defaultOptions,
  isHiragana,
  isKana,
  isKatakana,
  isRomaji,
  toHiragana,
  toKana,
  toKatakana,
  toRomaji,
} from '../core';

// Since { describe, it, test, expect } etc aren't explicitly imported from jest
/* eslint-disable no-undef */

describe('imports resolve', () => {
  it('transliteration table should import', () => expect(testTable).toBeDefined());
  it('core functions should import', () => expect(defaultOptions).toBeDefined());
  it('core functions should import', () => expect(isHiragana).toBeDefined());
  it('core functions should import', () => expect(isKana).toBeDefined());
  it('core functions should import', () => expect(isKatakana).toBeDefined());
  it('core functions should import', () => expect(isRomaji).toBeDefined());
  it('core functions should import', () => expect(toHiragana).toBeDefined());
  it('core functions should import', () => expect(toKana).toBeDefined());
  it('core functions should import', () => expect(toKatakana).toBeDefined());
  it('core functions should import', () => expect(toRomaji).toBeDefined());
});

describe('Character type detection', () => {
  describe('isHiragana()', () => {
    it('あ is hiragana', () => expect(isHiragana('あ')).toBe(true));
    it('ああ is hiragana', () => expect(isHiragana('ああ')).toBe(true));
    it('ア is not hiragana', () => expect(isHiragana('ア')).toBe(false));
    it('A is not hiragana', () => expect(isHiragana('A')).toBe(false));
    it('あア is not hiragana', () => expect(isHiragana('あア')).toBe(false));
//    it('ignore non-letter characters', () => expect(isHiragana('あ$あ')).toBe(true));
  });

  describe('isKatakana()', () => {
    it('アア is katakana', () => expect(isKatakana('アア')).toBe(true));
    it('ア is katakana', () => expect(isKatakana('ア')).toBe(true));
    it('あ is not katakana', () => expect(isKatakana('あ')).toBe(false));
    it('A is not katakana', () => expect(isKatakana('A')).toBe(false));
    it('あア is not katakana', () => expect(isKatakana('あア')).toBe(false));
    // expect(isKatakana("ア%ア")).toBe("ignore non-letter characters");
  });

  describe('isKana()', () => {
    it('あ is kana', () => expect(isKana('あ')).toBe(true));
    it('ア is kana', () => expect(isKana('ア')).toBe(true));
    it('あア is kana', () => expect(isKana('あア')).toBe(true));
    it('A is not kana', () => expect(isKana('A')).toBe(false));
    it('あAア is not kana', () => expect(isKana('あAア')).toBe(false));
  });

  describe('isRomaji()', () => {
    it('A is romaji', () => expect(isRomaji('A')).toBe(true));
    it('ABC is romaji', () => expect(isRomaji('ABC')).toBe(true));
    it('xYz is romaji', () => expect(isRomaji('xYz')).toBe(true));
    it('あ is not romaji', () => expect(isRomaji('あ')).toBe(false));
    it('ア is not romaji', () => expect(isRomaji('ア')).toBe(false));
    it('あア is not romaji', () => expect(isRomaji('あア')).toBe(false));
    it('Aア is not romaji', () => expect(isRomaji('Aア')).toBe(false));
    // expect(  isRomaji("a*b&c")).toBe("ignore non-letter characters");
  });
});


describe('Character conversion', () => {
  it('Quick Brown Fox - Romaji to Hiragana', () => {
    // thanks to Yuki http://www.yesjapan.com/YJ6/question/1099/is-there-a-group-of-sentences-that-uses-every-hiragana
    const opts = { useObsoleteKana: true };
    expect(toHiragana('IROHANIHOHETO', opts)).toBe('いろはにほへと'); // Even the colorful fragrant flowers'
    expect(toHiragana('CHIRINURUWO', opts)).toBe('ちりぬるを'); // die sooner or later.'
    expect(toHiragana('WAKAYOTARESO', opts)).toBe('わかよたれそ'); // Us who live in this world'
    expect(toHiragana('TSUNENARAMU', opts)).toBe('つねならむ'); // cannot live forever, either.'
    expect(toHiragana('UWINOOKUYAMA', opts)).toBe('うゐのおくやま'); // This transient mountain with shifts and changes,'
    expect(toHiragana('KEFUKOETE', opts)).toBe('けふこえて'); // today we are going to overcome, and reach the world of enlightenment.'
    expect(toHiragana('ASAKIYUMEMISHI', opts)).toBe('あさきゆめみし'); // We are not going to have meaningless dreams'
    expect(toHiragana('WEHIMOSESUN', opts)).toBe('ゑひもせすん'); // nor become intoxicated with the fake world anymore.'
  });

  describe('Test every character with toHiragana() and toKatakana()', () => {
    testTable.forEach((item) => {
      const [romaji, hiragana, katakana] = item;
      expect(toHiragana(romaji)).toBe(hiragana);
      expect(toKatakana(romaji.toUpperCase())).toBe(katakana);
    });
  });

  describe('Double consonants transliterate to glottal stops (small tsu)', () => {
    it('double B', () => expect(toHiragana('babba')).toBe('ばっば'));
    it('double C', () => expect(toHiragana('cacca')).toBe('かっか'));
    it('double Ch', () => expect(toHiragana('chaccha')).toBe('ちゃっちゃ'));
    it('double D', () => expect(toHiragana('dadda')).toBe('だっだ'));
    it('double F', () => expect(toHiragana('fuffu')).toBe('ふっふ'));
    it('double G', () => expect(toHiragana('gagga')).toBe('がっが'));
    it('double H', () => expect(toHiragana('hahha')).toBe('はっは'));
    it('double J', () => expect(toHiragana('jajja')).toBe('じゃっじゃ'));
    it('double K', () => expect(toHiragana('kakka')).toBe('かっか'));
    it('double L', () => expect(toHiragana('lalla')).toBe('らっら'));
    it('double M', () => expect(toHiragana('mamma')).toBe('まっま'));
    it('double N', () => expect(toHiragana('nanna')).toBe('なんな'));
    it('double P', () => expect(toHiragana('pappa')).toBe('ぱっぱ'));
    it('double Q', () => expect(toHiragana('qaqqa')).toBe('くぁっくぁ'));
    it('double R', () => expect(toHiragana('rarra')).toBe('らっら'));
    it('double S', () => expect(toHiragana('sassa')).toBe('さっさ'));
    it('double Sh', () => expect(toHiragana('shassha')).toBe('しゃっしゃ'));
    it('double T', () => expect(toHiragana('tatta')).toBe('たった'));
    it('double Ts', () => expect(toHiragana('tsuttsu')).toBe('つっつ'));
    it('double V', () => expect(toHiragana('vavva')).toBe('ゔぁっゔぁ'));
    it('double W', () => expect(toHiragana('wawwa')).toBe('わっわ'));
    it('double X', () => expect(toHiragana('yayya')).toBe('やっや'));
    it('double Z', () => expect(toHiragana('zazza')).toBe('ざっざ'));
  });

  describe('toKana()', () => {
    it('Lowercase characters are transliterated to hiragana.',
      () => expect(toKana('onaji')).toBe(toHiragana('onaji')),
    );
    it('Uppercase characters are transliterated to katakana.',
      () => expect(toKana('ONAJI')).toBe(toKatakana('onaji')),
    );
    it('WaniKani -> ワにカに - Mixed case uses the first character for each sylable.',
      () => expect(toKana('WaniKani')).toBe('ワにカに'),
    );
    it('Non-romaji will be passed through.',
      () => expect(toKana('ワにカに AiUeO 鰐蟹 12345 !@#$%')).toBe('ワにカに アいウえオ 鰐蟹 12345 !@#$%'),
    );
  });

  describe('Converting kana to kana', () => {
    it('katakana -> hiragana', () => expect(toHiragana('バケル')).toBe('ばける'));
    it('katakana -> hiragana', () => expect(toHiragana('バツゴー')).toBe('ばつごう'));
    it('hiragana -> katakana', () => expect(toKatakana('ばける')).toBe('バケル'));
  });

  describe('Case sensitivity', () => {
    it("cAse DoEsn'T MatTER for toHiragana()", () => expect(toHiragana('aiueo')).toBe(toHiragana('AIUEO')));
    it("cAse DoEsn'T MatTER for toKatakana()", () => expect(toKatakana('aiueo')).toBe(toKatakana('AIUEO')));
    it('Case DOES matter for toKana()', () => expect(toKana('aiueo')).not.toBe(toKana('AIUEO')));
  });


  describe('N edge cases', () => {
    it('Solo N', () => expect(toKana('n')).toBe('ん'));
    it('double N', () => expect(toKana('onn')).toBe('おん'));
    it('N followed by N* syllable', () => expect(toKana('onna')).toBe('おんな'));
    it('Triple N', () => expect(toKana('nnn')).toBe('んん'));
    it('Triple N followed by N* syllable', () => expect(toKana('onnna')).toBe('おんな'));
    it('Quadruple N', () => expect(toKana('nnnn')).toBe('んん'));
    it('nya -> にゃ', () => expect(toKana('nyan')).toBe('にゃん'));
    it('nnya -> んにゃ', () => expect(toKana('nnyann')).toBe('んにゃん'));
    it('nnnya -> んにゃ', () => expect(toKana('nnnyannn')).toBe('んにゃんん'));
    it('Properly add space after "n[space]"',
      () => expect(toKana('kore ga zenbu nonaka de ichiban warui')).toBe('これ が ぜんぶ のなか で いちばん わるい'),
    );
  });

  describe('Bogus 4 character sequences', () => {
    it('Non bogus sequences work', () => expect(toKana('chya')).toBe('ちゃ'));
    it('Bogus sequences do not work', () => expect(toKana('chyx')).toBe('chyx'));
    it('Bogus sequences do not work', () => expect(toKana('shyp')).toBe('shyp'));
    it('Bogus sequences do not work', () => expect(toKana('ltsb')).toBe('ltsb'));
  });
});

describe('Kana to Romaji', () => {
  describe('toRomaji()', () => {
    it('Convert katakana to romaji. convertKatakanaToUppercase is false by tOt',
      () => expect(toRomaji('ワニカニ　ガ　スゴイ　ダ')).toBe('wanikani ga sugoi da'),
    );
    it('Convert hiragana to romaji',
      () => expect(toRomaji('わにかに　が　すごい　だ')).toBe('wanikani ga sugoi da'),
    );
    it('Convert mixed kana to romaji',
      () => expect(toRomaji('ワニカニ　が　すごい　だ')).toBe('wanikani ga sugoi da'),
    );
    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for katakana.',
      () => expect(toRomaji('ワニカニ', { convertKatakanaToUppercase: true })).toBe('WANIKANI'),
    );
    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for mixed kana.',
      () => expect(toRomaji('ワニカニ　が　すごい　だ', { convertKatakanaToUppercase: true })).toBe('WANIKANI ga sugoi da'),
    );
    it('Spaces must be manually entered',
      () => expect(toRomaji('わにかにがすごいだ')).not.toBe('wanikani ga sugoi da'),
    );
    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for hiragana.',
      () => expect(toRomaji('わにかに', { convertKatakanaToUppercase: true })).toBe('wanikani'),
    );
  });

  describe('Quick Brown Fox - Hiragana to Romaji', () => {
    expect(toRomaji('いろはにほへと')).toBe('irohanihoheto');
    expect(toRomaji('ちりぬるを')).toBe('chirinuruwo');
    expect(toRomaji('わかよたれそ')).toBe('wakayotareso');
    expect(toRomaji('つねならむ')).toBe('tsunenaramu');
    expect(toRomaji('うゐのおくやま')).toBe('uwinookuyama');
    expect(toRomaji('けふこえて')).toBe('kefukoete');
    expect(toRomaji('あさきゆめみし')).toBe('asakiyumemishi');
    expect(toRomaji('ゑひもせすん')).toBe('wehimosesun');
  });

  describe("double n's and double consonants", () => {
    it('Double and single n', () => expect(toRomaji('きんにくまん')).toBe('kinnikuman'));
    it('N extravaganza', () => expect(toRomaji('んんにんにんにゃんやん')).toBe("nnninninnyan'yan"));
    it('Double consonants', () => expect(toRomaji('かっぱ　たった　しゅっしゅ ちゃっちゃ　やっつ')).toBe('kappa tatta shusshu chaccha yattsu'));
  });

  describe('Small kana', () => {
    it("Small tsu doesn't transliterate", () => expect(toRomaji('っ')).toBe(''));
    it('Small ya', () => expect(toRomaji('ゃ')).toBe('ya'));
    it('Small yu', () => expect(toRomaji('ゅ')).toBe('yu'));
    it('Small yo', () => expect(toRomaji('ょ')).toBe('yo'));
    it('Small a', () => expect(toRomaji('ぁ')).toBe('a'));
    it('Small i', () => expect(toRomaji('ぃ')).toBe('i'));
    it('Small u', () => expect(toRomaji('ぅ')).toBe('u'));
    it('Small e', () => expect(toRomaji('ぇ')).toBe('e'));
    it('Small o', () => expect(toRomaji('ぉ')).toBe('o'));
    it('Small ke (ka)', () => expect(toRomaji('ヶ')).toBe('ka'));
    it('Small ka', () => expect(toRomaji('ヵ')).toBe('ka'));
    it('Small wa', () => expect(toRomaji('ゎ')).toBe('wa'));
  });
});

describe('Options', () => {
  describe('useObsoleteKana', () => {
    const opts = { useObsoleteKana: true };
    it('wi = ゐ (when useObsoleteKana is true)', () => expect(toHiragana('wi', opts)).toBe('ゐ'));
    it('we = ゑ', () => expect(toHiragana('we', opts)).toBe('ゑ'));
    it('WI = ヰ', () => expect(toKatakana('wi', opts)).toBe('ヰ'));
    it('WE = ヱ', () => expect(toKatakana('we', opts)).toBe('ヱ'));

    opts.useObsoleteKana = false;
    it('wi = うぃ when useObsoleteKana is false', () => expect(toHiragana('wi', opts)).toBe('うぃ'));
    it('useObsoleteKana is false by default', () => expect(toHiragana('wi')).toBe('うぃ'));
  });

  describe('IMEMode', () => {
    const opts = {};

    /** Simulate real typing by calling the funciton on every character in sequence */
    function testTyping(str) {
      let pos = 1;
      let text = str;
      const len = str.length;
      // console.log("--" + str + "--");
      while (pos <= len) {
        let buffer = str.substr(0, pos);
        const rest = str.substr(pos);
        buffer = toKana(buffer, opts);
        // console.log(pos + ":" + buffer + " <-" + rest);
        text = buffer + rest;
        pos += 1;
      }
      return text;
    }

    opts.IMEMode = false;
    it("Without IME mode, solo n's are transliterated.", () => expect(toKana('n', opts)).toBe('ん'));
    it("Without IME mode, double n's are transliterated.", () => expect(toKana('nn', opts)).toBe('ん'));

    opts.IMEMode = true;
    it("With IME mode, solo n's are not transliterated.", () => expect(testTyping('n', opts)).toBe('n'));
    it("With IME mode, double n's are transliterated.", () => expect(testTyping('nn', opts)).toBe('ん'));
    it('With IME mode, n + space are transliterated.', () => expect(testTyping('n ', opts)).toBe('ん'));
    it("With IME mode, n + ' are transliterated.", () => expect(testTyping("n'", opts)).toBe('ん'));
    it('With IME mode, ni.', () => expect(testTyping('ni', opts)).toBe('に'));

    it('kan', () => expect(testTyping('kan', opts)).toBe('かn'));
    it('kanp', () => expect(testTyping('kanp', opts)).toBe('かんp'));
    it('kanpai!', () => expect(testTyping('kanpai', opts)).toBe('かんぱい'));
    it('nihongo', () => expect(testTyping('nihongo', opts)).toBe('にほんご'));

    it("y doesn't count as a consonant for IME", () => expect(testTyping('ny', opts)).toBe('ny'));
    it('nya works as expected', () => expect(testTyping('nya', opts)).toBe('にゃ'));

    it("With IME mode, solo N's are not transliterated - katakana.", () => expect(testTyping('N', opts)).toBe('N'));
    it("With IME mode, double N's are transliterated - katakana.", () => expect(testTyping('NN', opts)).toBe('ン'));
    it('NI - katakana.', () => expect(testTyping('NI', opts)).toBe('ニ'));
    it('KAN - katakana', () => expect(testTyping('KAN', opts)).toBe('カN'));
    it('NIHONGO - katakana', () => expect(testTyping('NIHONGO', opts)).toBe('ニホンゴ'));
  });

  describe('Apostrophes for vague consonant vowel combos', () => {
    it("おんよみ = on'yomi", () => expect(toRomaji('おんよみ')).toBe("on'yomi"));
    it('Checking other combinations', () => expect(toRomaji('んよ んあ んゆ')).toBe("n'yo n'a n'yu"));
  });

  describe('Options use defaultOptions by default', () => {
    defaultOptions.useObsoleteKana = true;
    it('Overwrite default (temporarily)', () => expect(toHiragana('wi')).toBe('ゐ'));
    const opts = { IMEMode: true };
    it("Defaults aren't overwritten by being omitted", () => expect(toHiragana('wi', opts)).toBe('ゐ'));
  });
});

describe('Performance', () => {
  describe('Speed', () => {
    const startTime = new Date().getTime();
    toKana('aiueosashisusesonaninunenokakikukeko');
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    expect(elapsedTime).toBeLessThan(10);
  });
});
