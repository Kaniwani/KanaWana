import * as wanakana from '../core';
import testTable from './transliteration-table';

// Since { describe, it, test, expect } etc aren't explicitly imported from jest
/* eslint-disable no-undef */

describe('importing files', () => {
  it('wanakana.js should load.', () => expect(wanakana).toBeDefined());
  it('transliteration table should load.', () => expect(testTable).toBeDefined());
});

describe('Character type detection', () => {
  describe('isHiragana()', () => {
    it('あ is hiragana', () => expect(wanakana.isHiragana('あ')).toBe(true));
    it('ああ is hiragana', () => expect(wanakana.isHiragana('ああ')).toBe(true));
    it('ア is not hiragana', () => expect(wanakana.isHiragana('ア')).toBe(false));
    it('A is not hiragana', () => expect(wanakana.isHiragana('A')).toBe(false));
    it('あア is not hiragana', () => expect(wanakana.isHiragana('あア')).toBe(false));
//    it('ignore non-letter characters', () => expect(wanakana.isHiragana('あ$あ')).toBe(true));
  });

  describe('isKatakana()', () => {
    it('アア is katakana', () => expect(wanakana.isKatakana('アア')).toBe(true));
    it('ア is katakana', () => expect(wanakana.isKatakana('ア')).toBe(true));
    it('あ is not katakana', () => expect(wanakana.isKatakana('あ')).toBe(false));
    it('A is not katakana', () => expect(wanakana.isKatakana('A')).toBe(false));
    it('あア is not katakana', () => expect(wanakana.isKatakana('あア')).toBe(false));
    // expect(wanakana.isKatakana("ア%ア")).toBe("ignore non-letter characters");
  });

  describe('isKana()', () => {
    it('あ is kana', () => expect(wanakana.isKana('あ')).toBe(true));
    it('ア is kana', () => expect(wanakana.isKana('ア')).toBe(true));
    it('あア is kana', () => expect(wanakana.isKana('あア')).toBe(true));
    it('A is not kana', () => expect(wanakana.isKana('A')).toBe(false));
    it('あAア is not kana', () => expect(wanakana.isKana('あAア')).toBe(false));
  });

  describe('isRomaji()', () => {
    it('A is romaji', () => expect(wanakana.isRomaji('A')).toBe(true));
    it('ABC is romaji', () => expect(wanakana.isRomaji('ABC')).toBe(true));
    it('xYz is romaji', () => expect(wanakana.isRomaji('xYz')).toBe(true));
    it('あ is not romaji', () => expect(wanakana.isRomaji('あ')).toBe(false));
    it('ア is not romaji', () => expect(wanakana.isRomaji('ア')).toBe(false));
    it('あア is not romaji', () => expect(wanakana.isRomaji('あア')).toBe(false));
    it('Aア is not romaji', () => expect(wanakana.isRomaji('Aア')).toBe(false));
    // expect(  wanakana.isRomaji("a*b&c")).toBe("ignore non-letter characters");
  });
});


describe('Character conversion', () => {
  describe('Quick Brown Fox - Romaji to Hiragana', () => {
    // thanks to Yuki http://www.yesjapan.com/YJ6/question/1099/is-there-a-group-of-sentences-that-uses-every-hiragana
    const opts = { useObsoleteKana: true };
    expect(wanakana.toHiragana('IROHANIHOHETO', opts)).toBe('いろはにほへと'); // Even the colorful fragrant flowers'
    expect(wanakana.toHiragana('CHIRINURUWO', opts)).toBe('ちりぬるを'); // die sooner or later.'
    expect(wanakana.toHiragana('WAKAYOTARESO', opts)).toBe('わかよたれそ'); // Us who live in this world'
    expect(wanakana.toHiragana('TSUNENARAMU', opts)).toBe('つねならむ'); // cannot live forever, either.'
    expect(wanakana.toHiragana('UWINOOKUYAMA', opts)).toBe('うゐのおくやま'); // This transient mountain with shifts and changes,'
    expect(wanakana.toHiragana('KEFUKOETE', opts)).toBe('けふこえて'); // today we are going to overcome, and reach the world of enlightenment.'
    expect(wanakana.toHiragana('ASAKIYUMEMISHI', opts)).toBe('あさきゆめみし'); // We are not going to have meaningless dreams'
    expect(wanakana.toHiragana('WEHIMOSESUN', opts)).toBe('ゑひもせすん'); // nor become intoxicated with the fake world anymore.'
  });

  describe('Test every character with toHiragana() and toKatakana()', () => {
    testTable.forEach((item) => {
      const [romaji, hiragana, katakana] = item;
      expect(wanakana.toHiragana(romaji)).toBe(hiragana);
      expect(wanakana.toKatakana(romaji.toUpperCase())).toBe(katakana);
    });
  });

  describe('Double consonants transliterate to glottal stops (small tsu)', () => {
    it('double B', () => expect(wanakana.toHiragana('babba')).toBe('ばっば'));
    it('double C', () => expect(wanakana.toHiragana('cacca')).toBe('かっか'));
    it('double Ch', () => expect(wanakana.toHiragana('chaccha')).toBe('ちゃっちゃ'));
    it('double D', () => expect(wanakana.toHiragana('dadda')).toBe('だっだ'));
    it('double F', () => expect(wanakana.toHiragana('fuffu')).toBe('ふっふ'));
    it('double G', () => expect(wanakana.toHiragana('gagga')).toBe('がっが'));
    it('double H', () => expect(wanakana.toHiragana('hahha')).toBe('はっは'));
    it('double J', () => expect(wanakana.toHiragana('jajja')).toBe('じゃっじゃ'));
    it('double K', () => expect(wanakana.toHiragana('kakka')).toBe('かっか'));
    it('double L', () => expect(wanakana.toHiragana('lalla')).toBe('らっら'));
    it('double M', () => expect(wanakana.toHiragana('mamma')).toBe('まっま'));
    it('double N', () => expect(wanakana.toHiragana('nanna')).toBe('なんな'));
    it('double P', () => expect(wanakana.toHiragana('pappa')).toBe('ぱっぱ'));
    it('double Q', () => expect(wanakana.toHiragana('qaqqa')).toBe('くぁっくぁ'));
    it('double R', () => expect(wanakana.toHiragana('rarra')).toBe('らっら'));
    it('double S', () => expect(wanakana.toHiragana('sassa')).toBe('さっさ'));
    it('double Sh', () => expect(wanakana.toHiragana('shassha')).toBe('しゃっしゃ'));
    it('double T', () => expect(wanakana.toHiragana('tatta')).toBe('たった'));
    it('double Ts', () => expect(wanakana.toHiragana('tsuttsu')).toBe('つっつ'));
    it('double V', () => expect(wanakana.toHiragana('vavva')).toBe('ゔぁっゔぁ'));
    it('double W', () => expect(wanakana.toHiragana('wawwa')).toBe('わっわ'));
    it('double X', () => expect(wanakana.toHiragana('yayya')).toBe('やっや'));
    it('double Z', () => expect(wanakana.toHiragana('zazza')).toBe('ざっざ'));
  });

  describe('toKana()', () => {
    it('Lowercase characters are transliterated to hiragana.',
      () => expect(wanakana.toKana('onaji')).toBe(wanakana.toHiragana('onaji')),
    );
    it('Uppercase characters are transliterated to katakana.',
      () => expect(wanakana.toKana('ONAJI')).toBe(wanakana.toKatakana('onaji')),
    );
    it('WaniKani -> ワにカに - Mixed case uses the first character for each sylable.',
      () => expect(wanakana.toKana('WaniKani')).toBe('ワにカに'),
    );
    it('Non-romaji will be passed through.',
      () => expect(wanakana.toKana('ワにカに AiUeO 鰐蟹 12345 !@#$%')).toBe('ワにカに アいウえオ 鰐蟹 12345 !@#$%'),
    );
  });

  describe('Converting kana to kana', () => {
    it('katakana -> hiragana', () => expect(wanakana.toHiragana('バケル')).toBe('ばける'));
    it('katakana -> hiragana', () => expect(wanakana.toHiragana('バツゴー')).toBe('ばつごう'));
    it('hiragana -> katakana', () => expect(wanakana.toKatakana('ばける')).toBe('バケル'));
  });

  describe('Case sensitivity', () => {
    it("cAse DoEsn'T MatTER for toHiragana()", () => expect(wanakana.toHiragana('aiueo')).toBe(wanakana.toHiragana('AIUEO')));
    it("cAse DoEsn'T MatTER for toKatakana()", () => expect(wanakana.toKatakana('aiueo')).toBe(wanakana.toKatakana('AIUEO')));
    it('Case DOES matter for toKana()', () => expect(wanakana.toKana('aiueo')).not.toBe(wanakana.toKana('AIUEO')));
  });


  describe('N edge cases', () => {
    it('Solo N', () => expect(wanakana.toKana('n')).toBe('ん'));
    it('double N', () => expect(wanakana.toKana('onn')).toBe('おん'));
    it('N followed by N* syllable', () => expect(wanakana.toKana('onna')).toBe('おんな'));
    it('Triple N', () => expect(wanakana.toKana('nnn')).toBe('んん'));
    it('Triple N followed by N* syllable', () => expect(wanakana.toKana('onnna')).toBe('おんな'));
    it('Quadruple N', () => expect(wanakana.toKana('nnnn')).toBe('んん'));
    it('nya -> にゃ', () => expect(wanakana.toKana('nyan')).toBe('にゃん'));
    it('nnya -> んにゃ', () => expect(wanakana.toKana('nnyann')).toBe('んにゃん'));
    it('nnnya -> んにゃ', () => expect(wanakana.toKana('nnnyannn')).toBe('んにゃんん'));
    it('Properly add space after "n[space]"',
      () => expect(wanakana.toKana('kore ga zenbu nonaka de ichiban warui')).toBe('これ が ぜんぶ のなか で いちばん わるい'),
    );
  });

  describe('Bogus 4 character sequences', () => {
    it('Non bogus sequences work', () => expect(wanakana.toKana('chya')).toBe('ちゃ'));
    it('Bogus sequences do not work', () => expect(wanakana.toKana('chyx')).toBe('chyx'));
    it('Bogus sequences do not work', () => expect(wanakana.toKana('shyp')).toBe('shyp'));
    it('Bogus sequences do not work', () => expect(wanakana.toKana('ltsb')).toBe('ltsb'));
  });
});

describe('Kana to Romaji', () => {
  describe('toRomaji()', () => {
    it('Convert katakana to romaji. convertKatakanaToUppercase is false by default',
      () => expect(wanakana.toRomaji('ワニカニ　ガ　スゴイ　ダ')).toBe('wanikani ga sugoi da'),
    );
    it('Convert hiragana to romaji',
      () => expect(wanakana.toRomaji('わにかに　が　すごい　だ')).toBe('wanikani ga sugoi da'),
    );
    it('Convert mixed kana to romaji',
      () => expect(wanakana.toRomaji('ワニカニ　が　すごい　だ')).toBe('wanikani ga sugoi da'),
    );
    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for katakana.',
      () => expect(wanakana.toRomaji('ワニカニ', { convertKatakanaToUppercase: true })).toBe('WANIKANI'),
    );
    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for mixed kana.',
      () => expect(wanakana.toRomaji('ワニカニ　が　すごい　だ', { convertKatakanaToUppercase: true })).toBe('WANIKANI ga sugoi da'),
    );
    it('Spaces must be manually entered',
      () => expect(wanakana.toRomaji('わにかにがすごいだ')).not.toBe('wanikani ga sugoi da'),
    );
    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for hiragana.',
      () => expect(wanakana.toRomaji('わにかに', { convertKatakanaToUppercase: true })).toBe('wanikani'),
    );
  });

  describe('Quick Brown Fox - Hiragana to Romaji', () => {
    expect(wanakana.toRomaji('いろはにほへと')).toBe('irohanihoheto');
    expect(wanakana.toRomaji('ちりぬるを')).toBe('chirinuruwo');
    expect(wanakana.toRomaji('わかよたれそ')).toBe('wakayotareso');
    expect(wanakana.toRomaji('つねならむ')).toBe('tsunenaramu');
    expect(wanakana.toRomaji('うゐのおくやま')).toBe('uwinookuyama');
    expect(wanakana.toRomaji('けふこえて')).toBe('kefukoete');
    expect(wanakana.toRomaji('あさきゆめみし')).toBe('asakiyumemishi');
    expect(wanakana.toRomaji('ゑひもせすん')).toBe('wehimosesun');
  });

  describe("double n's and double consonants", () => {
    it('Double and single n', () => expect(wanakana.toRomaji('きんにくまん')).toBe('kinnikuman'));
    it('N extravaganza', () => expect(wanakana.toRomaji('んんにんにんにゃんやん')).toBe("nnninninnyan'yan"));
    it('Double consonants', () => expect(wanakana.toRomaji('かっぱ　たった　しゅっしゅ ちゃっちゃ　やっつ')).toBe('kappa tatta shusshu chaccha yattsu'));
  });

  describe('Small kana', () => {
    it("Small tsu doesn't transliterate", () => expect(wanakana.toRomaji('っ')).toBe(''));
    it('Small ya', () => expect(wanakana.toRomaji('ゃ')).toBe('ya'));
    it('Small yu', () => expect(wanakana.toRomaji('ゅ')).toBe('yu'));
    it('Small yo', () => expect(wanakana.toRomaji('ょ')).toBe('yo'));
    it('Small a', () => expect(wanakana.toRomaji('ぁ')).toBe('a'));
    it('Small i', () => expect(wanakana.toRomaji('ぃ')).toBe('i'));
    it('Small u', () => expect(wanakana.toRomaji('ぅ')).toBe('u'));
    it('Small e', () => expect(wanakana.toRomaji('ぇ')).toBe('e'));
    it('Small o', () => expect(wanakana.toRomaji('ぉ')).toBe('o'));
    it('Small ke (ka)', () => expect(wanakana.toRomaji('ヶ')).toBe('ka'));
    it('Small ka', () => expect(wanakana.toRomaji('ヵ')).toBe('ka'));
    it('Small wa', () => expect(wanakana.toRomaji('ゎ')).toBe('wa'));
  });
});

describe('Options', () => {
  describe('useObsoleteKana', () => {
    const opts = { useObsoleteKana: true };
    it('wi = ゐ (when useObsoleteKana is true)', () => expect(wanakana.toHiragana('wi', opts)).toBe('ゐ'));
    it('we = ゑ', () => expect(wanakana.toHiragana('we', opts)).toBe('ゑ'));
    it('WI = ヰ', () => expect(wanakana.toKatakana('wi', opts)).toBe('ヰ'));
    it('WE = ヱ', () => expect(wanakana.toKatakana('we', opts)).toBe('ヱ'));

    opts.useObsoleteKana = false;
    it('wi = うぃ when useObsoleteKana is false', () => expect(wanakana.toHiragana('wi', opts)).toBe('うぃ'));
    it('useObsoleteKana is false by default', () => expect(wanakana.toHiragana('wi')).toBe('うぃ'));
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
        buffer = wanakana.toKana(buffer, opts);
        // console.log(pos + ":" + buffer + " <-" + rest);
        text = buffer + rest;
        pos += 1;
      }
      return text;
    }

    opts.IMEMode = false;
    it("Without IME mode, solo n's are transliterated.", () => expect(wanakana.toKana('n', opts)).toBe('ん'));
    it("Without IME mode, double n's are transliterated.", () => expect(wanakana.toKana('nn', opts)).toBe('ん'));

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
    it("おんよみ = on'yomi", () => expect(wanakana.toRomaji('おんよみ')).toBe("on'yomi"));
    it('Checking other combinations', () => expect(wanakana.toRomaji('んよ んあ んゆ')).toBe("n'yo n'a n'yu"));
  });

  describe('Options use defaultOptions by default', () => {
    wanakana.defaultOptions.useObsoleteKana = true;
    it('Overwrite default (temporarily)', () => expect(wanakana.toHiragana('wi')).toBe('ゐ'));
    const opts = { IMEMode: true };
    it("Defaults aren't overwritten by being omitted", () => expect(wanakana.toHiragana('wi', opts)).toBe('ゐ'));
  });
});

describe('Performance', () => {
  describe('Speed', () => {
    const startTime = new Date().getTime();
    wanakana.toKana('aiueosashisusesonaninunenokakikukeko');
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    expect(elapsedTime).toBeLessThan(20);
    console.log(`Dang, that's fast! Romaji -> Kana in ${elapsedTime}ms`);
  });
});
