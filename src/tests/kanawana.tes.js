import * as kanawana from '../core';
import testTable from './transliteration-table';

// Since { describe, it, test, expect } etc aren't explicitly imported from jest
/* eslint-disable no-undef */

describe('imports resolve', () => {
  it('kanawana.js should load.', () => expect(kanawana).toBeDefined());
  it('transliteration table should load.', () => expect(testTable).toBeDefined());
});

describe('Character type detection', () => {
  describe('isHiragana()', () => {
    it('あ is hiragana', () => expect(kanawana.isHiragana('あ')).toBe(true));
    it('ああ is hiragana', () => expect(kanawana.isHiragana('ああ')).toBe(true));
    it('ア is not hiragana', () => expect(kanawana.isHiragana('ア')).toBe(false));
    it('A is not hiragana', () => expect(kanawana.isHiragana('A')).toBe(false));
    it('あア is not hiragana', () => expect(kanawana.isHiragana('あア')).toBe(false));
//    it('ignore non-letter characters', () => expect(kanawana.isHiragana('あ$あ')).toBe(true));
  });

  describe('isKatakana()', () => {
    it('アア is katakana', () => expect(kanawana.isKatakana('アア')).toBe(true));
    it('ア is katakana', () => expect(kanawana.isKatakana('ア')).toBe(true));
    it('あ is not katakana', () => expect(kanawana.isKatakana('あ')).toBe(false));
    it('A is not katakana', () => expect(kanawana.isKatakana('A')).toBe(false));
    it('あア is not katakana', () => expect(kanawana.isKatakana('あア')).toBe(false));
    // expect(kanawana.isKatakana("ア%ア")).toBe("ignore non-letter characters");
  });

  describe('isKana()', () => {
    it('あ is kana', () => expect(kanawana.isKana('あ')).toBe(true));
    it('ア is kana', () => expect(kanawana.isKana('ア')).toBe(true));
    it('あア is kana', () => expect(kanawana.isKana('あア')).toBe(true));
    it('A is not kana', () => expect(kanawana.isKana('A')).toBe(false));
    it('あAア is not kana', () => expect(kanawana.isKana('あAア')).toBe(false));
  });

  describe('isRomaji()', () => {
    it('A is romaji', () => expect(kanawana.isRomaji('A')).toBe(true));
    it('ABC is romaji', () => expect(kanawana.isRomaji('ABC')).toBe(true));
    it('xYz is romaji', () => expect(kanawana.isRomaji('xYz')).toBe(true));
    it('あ is not romaji', () => expect(kanawana.isRomaji('あ')).toBe(false));
    it('ア is not romaji', () => expect(kanawana.isRomaji('ア')).toBe(false));
    it('あア is not romaji', () => expect(kanawana.isRomaji('あア')).toBe(false));
    it('Aア is not romaji', () => expect(kanawana.isRomaji('Aア')).toBe(false));
    // expect(  kanawana.isRomaji("a*b&c")).toBe("ignore non-letter characters");
  });
});


describe('Character conversion', () => {
  describe('Quick Brown Fox - Romaji to Hiragana', () => {
    // thanks to Yuki http://www.yesjapan.com/YJ6/question/1099/is-there-a-group-of-sentences-that-uses-every-hiragana
    const opts = { useObsoleteKana: true };
    expect(kanawana.toHiragana('IROHANIHOHETO', opts)).toBe('いろはにほへと'); // Even the colorful fragrant flowers'
    expect(kanawana.toHiragana('CHIRINURUWO', opts)).toBe('ちりぬるを'); // die sooner or later.'
    expect(kanawana.toHiragana('WAKAYOTARESO', opts)).toBe('わかよたれそ'); // Us who live in this world'
    expect(kanawana.toHiragana('TSUNENARAMU', opts)).toBe('つねならむ'); // cannot live forever, either.'
    expect(kanawana.toHiragana('UWINOOKUYAMA', opts)).toBe('うゐのおくやま'); // This transient mountain with shifts and changes,'
    expect(kanawana.toHiragana('KEFUKOETE', opts)).toBe('けふこえて'); // today we are going to overcome, and reach the world of enlightenment.'
    expect(kanawana.toHiragana('ASAKIYUMEMISHI', opts)).toBe('あさきゆめみし'); // We are not going to have meaningless dreams'
    expect(kanawana.toHiragana('WEHIMOSESUN', opts)).toBe('ゑひもせすん'); // nor become intoxicated with the fake world anymore.'
  });

  describe('Test every character with toHiragana() and toKatakana()', () => {
    testTable.forEach((item) => {
      const [romaji, hiragana, katakana] = item;
      expect(kanawana.toHiragana(romaji)).toBe(hiragana);
      expect(kanawana.toKatakana(romaji.toUpperCase())).toBe(katakana);
    });
  });

  describe('Double consonants transliterate to glottal stops (small tsu)', () => {
    it('double B', () => expect(kanawana.toHiragana('babba')).toBe('ばっば'));
    it('double C', () => expect(kanawana.toHiragana('cacca')).toBe('かっか'));
    it('double Ch', () => expect(kanawana.toHiragana('chaccha')).toBe('ちゃっちゃ'));
    it('double D', () => expect(kanawana.toHiragana('dadda')).toBe('だっだ'));
    it('double F', () => expect(kanawana.toHiragana('fuffu')).toBe('ふっふ'));
    it('double G', () => expect(kanawana.toHiragana('gagga')).toBe('がっが'));
    it('double H', () => expect(kanawana.toHiragana('hahha')).toBe('はっは'));
    it('double J', () => expect(kanawana.toHiragana('jajja')).toBe('じゃっじゃ'));
    it('double K', () => expect(kanawana.toHiragana('kakka')).toBe('かっか'));
    it('double L', () => expect(kanawana.toHiragana('lalla')).toBe('らっら'));
    it('double M', () => expect(kanawana.toHiragana('mamma')).toBe('まっま'));
    it('double N', () => expect(kanawana.toHiragana('nanna')).toBe('なんな'));
    it('double P', () => expect(kanawana.toHiragana('pappa')).toBe('ぱっぱ'));
    it('double Q', () => expect(kanawana.toHiragana('qaqqa')).toBe('くぁっくぁ'));
    it('double R', () => expect(kanawana.toHiragana('rarra')).toBe('らっら'));
    it('double S', () => expect(kanawana.toHiragana('sassa')).toBe('さっさ'));
    it('double Sh', () => expect(kanawana.toHiragana('shassha')).toBe('しゃっしゃ'));
    it('double T', () => expect(kanawana.toHiragana('tatta')).toBe('たった'));
    it('double Ts', () => expect(kanawana.toHiragana('tsuttsu')).toBe('つっつ'));
    it('double V', () => expect(kanawana.toHiragana('vavva')).toBe('ゔぁっゔぁ'));
    it('double W', () => expect(kanawana.toHiragana('wawwa')).toBe('わっわ'));
    it('double X', () => expect(kanawana.toHiragana('yayya')).toBe('やっや'));
    it('double Z', () => expect(kanawana.toHiragana('zazza')).toBe('ざっざ'));
  });

  describe('toKana()', () => {
    it('Lowercase characters are transliterated to hiragana.',
      () => expect(kanawana.toKana('onaji')).toBe(kanawana.toHiragana('onaji')),
    );
    it('Uppercase characters are transliterated to katakana.',
      () => expect(kanawana.toKana('ONAJI')).toBe(kanawana.toKatakana('onaji')),
    );
    it('WaniKani -> ワにカに - Mixed case uses the first character for each sylable.',
      () => expect(kanawana.toKana('WaniKani')).toBe('ワにカに'),
    );
    it('Non-romaji will be passed through.',
      () => expect(kanawana.toKana('ワにカに AiUeO 鰐蟹 12345 !@#$%')).toBe('ワにカに アいウえオ 鰐蟹 12345 !@#$%'),
    );
  });

  describe('Converting kana to kana', () => {
    it('katakana -> hiragana', () => expect(kanawana.toHiragana('バケル')).toBe('ばける'));
    it('katakana -> hiragana', () => expect(kanawana.toHiragana('バツゴー')).toBe('ばつごう'));
    it('hiragana -> katakana', () => expect(kanawana.toKatakana('ばける')).toBe('バケル'));
  });

  describe('Case sensitivity', () => {
    it("cAse DoEsn'T MatTER for toHiragana()", () => expect(kanawana.toHiragana('aiueo')).toBe(kanawana.toHiragana('AIUEO')));
    it("cAse DoEsn'T MatTER for toKatakana()", () => expect(kanawana.toKatakana('aiueo')).toBe(kanawana.toKatakana('AIUEO')));
    it('Case DOES matter for toKana()', () => expect(kanawana.toKana('aiueo')).not.toBe(kanawana.toKana('AIUEO')));
  });


  describe('N edge cases', () => {
    it('Solo N', () => expect(kanawana.toKana('n')).toBe('ん'));
    it('double N', () => expect(kanawana.toKana('onn')).toBe('おん'));
    it('N followed by N* syllable', () => expect(kanawana.toKana('onna')).toBe('おんな'));
    it('Triple N', () => expect(kanawana.toKana('nnn')).toBe('んん'));
    it('Triple N followed by N* syllable', () => expect(kanawana.toKana('onnna')).toBe('おんな'));
    it('Quadruple N', () => expect(kanawana.toKana('nnnn')).toBe('んん'));
    it('nya -> にゃ', () => expect(kanawana.toKana('nyan')).toBe('にゃん'));
    it('nnya -> んにゃ', () => expect(kanawana.toKana('nnyann')).toBe('んにゃん'));
    it('nnnya -> んにゃ', () => expect(kanawana.toKana('nnnyannn')).toBe('んにゃんん'));
    it('Properly add space after "n[space]"',
      () => expect(kanawana.toKana('kore ga zenbu nonaka de ichiban warui')).toBe('これ が ぜんぶ のなか で いちばん わるい'),
    );
  });

  describe('Bogus 4 character sequences', () => {
    it('Non bogus sequences work', () => expect(kanawana.toKana('chya')).toBe('ちゃ'));
    it('Bogus sequences do not work', () => expect(kanawana.toKana('chyx')).toBe('chyx'));
    it('Bogus sequences do not work', () => expect(kanawana.toKana('shyp')).toBe('shyp'));
    it('Bogus sequences do not work', () => expect(kanawana.toKana('ltsb')).toBe('ltsb'));
  });
});

describe('Kana to Romaji', () => {
  describe('toRomaji()', () => {
    it('Convert katakana to romaji. convertKatakanaToUppercase is false by default',
      () => expect(kanawana.toRomaji('ワニカニ　ガ　スゴイ　ダ')).toBe('wanikani ga sugoi da'),
    );
    it('Convert hiragana to romaji',
      () => expect(kanawana.toRomaji('わにかに　が　すごい　だ')).toBe('wanikani ga sugoi da'),
    );
    it('Convert mixed kana to romaji',
      () => expect(kanawana.toRomaji('ワニカニ　が　すごい　だ')).toBe('wanikani ga sugoi da'),
    );
    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for katakana.',
      () => expect(kanawana.toRomaji('ワニカニ', { convertKatakanaToUppercase: true })).toBe('WANIKANI'),
    );
    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for mixed kana.',
      () => expect(kanawana.toRomaji('ワニカニ　が　すごい　だ', { convertKatakanaToUppercase: true })).toBe('WANIKANI ga sugoi da'),
    );
    it('Spaces must be manually entered',
      () => expect(kanawana.toRomaji('わにかにがすごいだ')).not.toBe('wanikani ga sugoi da'),
    );
    it('Use the convertKatakanaToUppercase flag to preserve casing. Works for hiragana.',
      () => expect(kanawana.toRomaji('わにかに', { convertKatakanaToUppercase: true })).toBe('wanikani'),
    );
  });

  describe('Quick Brown Fox - Hiragana to Romaji', () => {
    expect(kanawana.toRomaji('いろはにほへと')).toBe('irohanihoheto');
    expect(kanawana.toRomaji('ちりぬるを')).toBe('chirinuruwo');
    expect(kanawana.toRomaji('わかよたれそ')).toBe('wakayotareso');
    expect(kanawana.toRomaji('つねならむ')).toBe('tsunenaramu');
    expect(kanawana.toRomaji('うゐのおくやま')).toBe('uwinookuyama');
    expect(kanawana.toRomaji('けふこえて')).toBe('kefukoete');
    expect(kanawana.toRomaji('あさきゆめみし')).toBe('asakiyumemishi');
    expect(kanawana.toRomaji('ゑひもせすん')).toBe('wehimosesun');
  });

  describe("double n's and double consonants", () => {
    it('Double and single n', () => expect(kanawana.toRomaji('きんにくまん')).toBe('kinnikuman'));
    it('N extravaganza', () => expect(kanawana.toRomaji('んんにんにんにゃんやん')).toBe("nnninninnyan'yan"));
    it('Double consonants', () => expect(kanawana.toRomaji('かっぱ　たった　しゅっしゅ ちゃっちゃ　やっつ')).toBe('kappa tatta shusshu chaccha yattsu'));
  });

  describe('Small kana', () => {
    it("Small tsu doesn't transliterate", () => expect(kanawana.toRomaji('っ')).toBe(''));
    it('Small ya', () => expect(kanawana.toRomaji('ゃ')).toBe('ya'));
    it('Small yu', () => expect(kanawana.toRomaji('ゅ')).toBe('yu'));
    it('Small yo', () => expect(kanawana.toRomaji('ょ')).toBe('yo'));
    it('Small a', () => expect(kanawana.toRomaji('ぁ')).toBe('a'));
    it('Small i', () => expect(kanawana.toRomaji('ぃ')).toBe('i'));
    it('Small u', () => expect(kanawana.toRomaji('ぅ')).toBe('u'));
    it('Small e', () => expect(kanawana.toRomaji('ぇ')).toBe('e'));
    it('Small o', () => expect(kanawana.toRomaji('ぉ')).toBe('o'));
    it('Small ke (ka)', () => expect(kanawana.toRomaji('ヶ')).toBe('ka'));
    it('Small ka', () => expect(kanawana.toRomaji('ヵ')).toBe('ka'));
    it('Small wa', () => expect(kanawana.toRomaji('ゎ')).toBe('wa'));
  });
});

describe('Options', () => {
  describe('useObsoleteKana', () => {
    const opts = { useObsoleteKana: true };
    it('wi = ゐ (when useObsoleteKana is true)', () => expect(kanawana.toHiragana('wi', opts)).toBe('ゐ'));
    it('we = ゑ', () => expect(kanawana.toHiragana('we', opts)).toBe('ゑ'));
    it('WI = ヰ', () => expect(kanawana.toKatakana('wi', opts)).toBe('ヰ'));
    it('WE = ヱ', () => expect(kanawana.toKatakana('we', opts)).toBe('ヱ'));

    opts.useObsoleteKana = false;
    it('wi = うぃ when useObsoleteKana is false', () => expect(kanawana.toHiragana('wi', opts)).toBe('うぃ'));
    it('useObsoleteKana is false by default', () => expect(kanawana.toHiragana('wi')).toBe('うぃ'));
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
        buffer = kanawana.toKana(buffer, opts);
        // console.log(pos + ":" + buffer + " <-" + rest);
        text = buffer + rest;
        pos += 1;
      }
      return text;
    }

    opts.IMEMode = false;
    it("Without IME mode, solo n's are transliterated.", () => expect(kanawana.toKana('n', opts)).toBe('ん'));
    it("Without IME mode, double n's are transliterated.", () => expect(kanawana.toKana('nn', opts)).toBe('ん'));

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
    it("おんよみ = on'yomi", () => expect(kanawana.toRomaji('おんよみ')).toBe("on'yomi"));
    it('Checking other combinations', () => expect(kanawana.toRomaji('んよ んあ んゆ')).toBe("n'yo n'a n'yu"));
  });

  describe('Options use defaultOptions by default', () => {
    kanawana.defaultOptions.useObsoleteKana = true;
    it('Overwrite default (temporarily)', () => expect(kanawana.toHiragana('wi')).toBe('ゐ'));
    const opts = { IMEMode: true };
    it("Defaults aren't overwritten by being omitted", () => expect(kanawana.toHiragana('wi', opts)).toBe('ゐ'));
  });
});

describe('Performance', () => {
  describe('Speed', () => {
    const startTime = new Date().getTime();
    kanawana.toKana('aiueosashisusesonaninunenokakikukeko');
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    expect(elapsedTime).toBeLessThan(20);
    console.log(`Dang, that's fast! Romaji -> Kana in ${elapsedTime}ms`);
  });
});
