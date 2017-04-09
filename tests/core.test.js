import microtime from 'microtime';
import testTable from './transliteration-table';
import isKana from '../src/core/isKana';
import isKanji from '../src/core/isKanji';
import isKanjiKana from '../src/core/isKanjiKana';
import isKatakana from '../src/core/isKatakana';
import isHiragana from '../src/core/isHiragana';
import isRomaji from '../src/core/isRomaji';
import isRomajiKana from '../src/core/isRomajiKana';
import toKana from '../src/core/toKana';
import toKatakana from '../src/core/toKatakana';
import toHiragana from '../src/core/toHiragana';
import toRomaji from '../src/core/toRomaji';
import romajiToHiragana from '../src/core/romajiToHiragana';
import hiraganaToKatakana from '../src/core/hiraganaToKatakana';
import katakanaToHiragana from '../src/core/katakanaToHiragana';
import stripOkurigana from '../src/core/stripOkurigana';
import tokenize from '../src/core/tokenize';

describe('Methods should return valid defaults when given no input', () => {
  it('isKana() with no input', () => expect(isKana()).toBe(false));
  it('isKanji() with no input', () => expect(isKanji()).toBe(false));
  it('isKanjiKana() with no input', () => expect(isKanjiKana()).toBe(false));
  it('isKatakana() with no input', () => expect(isKatakana()).toBe(false));
  it('isHiragana() with no input', () => expect(isHiragana()).toBe(false));
  it('isRomaji() with no input', () => expect(isRomaji()).toBe(false));
  it('isRomajiKana() with no input', () => expect(isRomajiKana()).toBe(false));
  it('toKana() with no input', () => expect(toKana()).toBe(''));
  it('toKatakana() with no input', () => expect(toKatakana()).toBe(''));
  it('toHiragana() with no input', () => expect(toHiragana()).toBe(''));
  it('toRomaji() with no input', () => expect(toRomaji()).toBe(''));
  it('romajiToHiragana() with no input', () => expect(romajiToHiragana()).toBe(''));
  it('hiraganaToKatakana() with no input', () => expect(hiraganaToKatakana()).toBe(''));
  it('katakanaToHiragana() with no input', () => expect(katakanaToHiragana()).toBe(''));
  it('stripOkurigana() with no input', () => expect(stripOkurigana()).toBe(''));
  it('tokenize() with no input', () => expect(tokenize()).toEqual(['']));
});

describe('Character type detection', () => {
  describe('isHiragana()', () => {
    it('あ is hiragana', () => expect(isHiragana('あ')).toBe(true));
    it('ああ is hiragana', () => expect(isHiragana('ああ')).toBe(true));
    it('ア is not hiragana', () => expect(isHiragana('ア')).toBe(false));
    it('A is not hiragana', () => expect(isHiragana('A')).toBe(false));
    it('あア is not hiragana', () => expect(isHiragana('あア')).toBe(false));
    it('ignores long dash in hiragana', () => expect(isHiragana('げーむ')).toBe(true));
  });

  describe('isKatakana()', () => {
    it('アア is katakana', () => expect(isKatakana('アア')).toBe(true));
    it('ア is katakana', () => expect(isKatakana('ア')).toBe(true));
    it('あ is not katakana', () => expect(isKatakana('あ')).toBe(false));
    it('A is not katakana', () => expect(isKatakana('A')).toBe(false));
    it('あア is not katakana', () => expect(isKatakana('あア')).toBe(false));
    it('ignores long dash in katakana', () => expect(isKatakana('ゲーム')).toBe(true));
  });

  describe('isKana()', () => {
    it('あ is kana', () => expect(isKana('あ')).toBe(true));
    it('ア is kana', () => expect(isKana('ア')).toBe(true));
    it('あア is kana', () => expect(isKana('あア')).toBe(true));
    it('A is not kana', () => expect(isKana('A')).toBe(false));
    it('あAア is not kana', () => expect(isKana('あAア')).toBe(false));
    it('ignores long dash in mixed kana', () => expect(isKana('アーあ')).toBe(true));
  });

  describe('isKanji()', () => {
    it('切腹 is kanji', () => expect(isKanji('切腹')).toBe(true));
    it('刀 is kanji', () => expect(isKanji('刀')).toBe(true));
    it('🐸 is not kanji', () => expect(isKanji('🐸')).toBe(false));
    it('あ is not kanji', () => expect(isKanji('あ')).toBe(false));
    it('ア is not kanji', () => expect(isKanji('ア')).toBe(false));
    it('あア is not kanji', () => expect(isKanji('あア')).toBe(false));
    it('A is not kanji', () => expect(isKanji('A')).toBe(false));
    it('あAア is not kanji', () => expect(isKanji('あAア')).toBe(false));
  });

  describe('isKanjiKana()', () => {
    it('泣き虫 is kanji/kana', () => expect(isKanjiKana('泣き虫')).toBe(true));
    it('あア is kanji/kana', () => expect(isKanjiKana('あア')).toBe(true));
    it('泣き虫A is not kanji/kana', () => expect(isKanjiKana('泣き虫A')).toBe(false));
    it('A is not kanji/kana', () => expect(isKanjiKana('A')).toBe(false));
    it('泣き虫。！〜 (w. kana punctuation) is kanji/kana',
      () => expect(isKanjiKana('泣き虫。！〜')).toBe(true));
    it('泣き虫.!~ (w. romaji punctuation) is not kanji/kana',
      () => expect(isKanjiKana('泣き虫.!~')).toBe(false));
  });

  describe('isRomaji()', () => {
    it('A is romaji', () => expect(isRomaji('A')).toBe(true));
    it('xYz is romaji', () => expect(isRomaji('xYz')).toBe(true));
    it('Tōkyō and Ōsaka is romaji', () => expect(isRomaji('Tōkyō and Ōsaka')).toBe(true));
    it('あアA is not romaji', () => expect(isRomaji('あアA')).toBe(false));
    it('お願い is not romaji', () => expect(isRomaji('お願い')).toBe(false));
    it('熟成 is not romaji', () => expect(isRomaji('熟成')).toBe(false));
    it('passes roman punctuation', () => expect(isRomaji('a*b&c-d')).toBe(true));
    it('fails japanese punctuation', () => expect(isRomaji('a！b&cーd')).toBe(false));
  });

  describe('isRomajiKana()', () => {
    it('Aア is mixed', () => expect(isRomajiKana('Aア')).toBe(true));
    it('Aあ is mixed', () => expect(isRomajiKana('Aあ')).toBe(true));
    it('Aあア is mixed', () => expect(isRomajiKana('Aあア')).toBe(true));
    it('あア is not mixed', () => expect(isRomajiKana('あア')).toBe(false));
    it('お腹A is mixed', () => expect(isRomajiKana('お腹A')).toBe(true));
    it('お腹A is not mixed when { passKanji: false }', () => expect(isRomajiKana('お腹A', { passKanji: false })).toBe(false));
    it('お腹 is not mixed', () => expect(isRomajiKana('お腹')).toBe(false));
    it('腹 is not mixed', () => expect(isRomajiKana('腹')).toBe(false));
    it('A is not mixed', () => expect(isRomajiKana('A')).toBe(false));
    it('あ is not mixed', () => expect(isRomajiKana('あ')).toBe(false));
    it('ア is not mixed', () => expect(isRomajiKana('ア')).toBe(false));
  });
});

describe('Character conversion', () => {
  describe('Quick Brown Fox - Romaji to Hiragana', () => {
    // thanks to Yuki http://www.yesjapan.com/YJ6/question/1099/is-there-a-group-of-sentences-that-uses-every-hiragana
    expect(toHiragana('IROHANIHOHETO', { useObsoleteKana: true }))
      .toBe('いろはにほへと'); // Even the colorful fragrant flowers'
    expect(toHiragana('CHIRINURUWO', { useObsoleteKana: true }))
      .toBe('ちりぬるを'); // die sooner or later.'
    expect(toHiragana('WAKAYOTARESO', { useObsoleteKana: true }))
      .toBe('わかよたれそ'); // Us who live in this world'
    expect(toHiragana('TSUNENARAMU', { useObsoleteKana: true }))
      .toBe('つねならむ'); // cannot live forever, either.'
    expect(toHiragana('UWINOOKUYAMA', { useObsoleteKana: true }))
      .toBe('うゐのおくやま'); // This transient mountain with shifts and changes,'
    expect(toHiragana('KEFUKOETE', { useObsoleteKana: true }))
      .toBe('けふこえて'); // today we are going to overcome, and reach the world of enlightenment.'
    expect(toHiragana('ASAKIYUMEMISHI', { useObsoleteKana: true }))
      .toBe('あさきゆめみし'); // We are not going to have meaningless dreams'
    expect(toHiragana('WEHIMOSESUN', { useObsoleteKana: true }))
      .toBe('ゑひもせすん'); // nor become intoxicated with the fake world anymore.'
  });

  describe('Test every character with toHiragana() and toKatakana()', () => {
    testTable.forEach((item) => {
      const [romaji,
        hiragana,
        katakana] = item;
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
      () => expect(toKana('onaji')).toBe('おなじ'));

    it('Lowercase with double consonants and double vowels are transliterated to hiragana.',
      () => expect(toKana('buttsuuji')).toBe('ぶっつうじ'));

    it('Uppercase characters are transliterated to katakana.',
      () => expect(toKana('ONAJI')).toBe('オナジ'));

    it('Uppercase with double consonants and double vowels are transliterated to katakana.',
      () => expect(toKana('BUTTSUUJI')).toBe('ブッツウジ'));

    it('KaniWani -> カにワに - Mixed case uses the first character for each syllable.',
      () => expect(toKana('KaniWani')).toBe('カにワに'));

    it('Non-romaji will be passed through.',
      () => expect(toKana('カにワに AiUeO 鰐蟹 12345 @#$%')).toBe('カにワに アいウえオ 鰐蟹 12345 @#$%'));

    it('It handles mixed syllabaries',
      () => expect(toKana('座禅[zazen]スタイル')).toBe('座禅「ざぜん」スタイル'));

    it('Will convert short to long dashes',
      () => expect(toKana('batsuge-mu')).toBe('ばつげーむ'));

    it('Will convert punctuation but pass through spaces',
      () => expect(toKana(' .,[]{}()!?/')).toBe(' 。、「」｛｝（）！？・'));
  });

  describe('Converting kana to kana', () => {
    it('k -> h', () => expect(toHiragana('バケル')).toBe('ばける'));
    it('h -> k', () => expect(toKatakana('ばける')).toBe('バケル'));

    it('It survives only katakana toKatakana', () => expect(toKatakana('スタイル')).toBe('スタイル'));
    it('It survives only hiragana toHiragana', () => expect(toHiragana('すたいる')).toBe('すたいる'));
    it('Mixed kana converts every char k -> h', () => expect(toKatakana('アメリカじん')).toBe('アメリカジン'));
    it('Mixed kana converts every char h -> k', () => expect(toHiragana('アメリカじん')).toBe('あめりかじん'));
    it('Converts long vowels correctly from k -> h', () => expect(toHiragana('バツゴー')).toBe('ばつごう'));
    it('Preserves long dash from h -> k', () => expect(toKatakana('ばつゲーム')).toBe('バツゲーム'));

    describe('Mixed syllabaries', () => {
      it('It passes non-katakana through when passRomaji is true k -> h',
        () => expect(toHiragana('座禅[zazen]スタイル', { passRomaji: true })).toBe('座禅[zazen]すたいる'));

      it('It passes non-hiragana through when passRomaji is true h -> k',
        () => expect(toKatakana('座禅[zazen]すたいる', { passRomaji: true })).toBe('座禅[zazen]スタイル'));

      it('It converts non-katakana when passRomaji is false k -> h',
        () => expect(toHiragana('座禅[zazen]スタイル')).toBe('座禅「ざぜん」すたいる'));

      it('It converts non-hiragana when passRomaji is false h -> k',
        () => expect(toKatakana('座禅[zazen]すたいる')).toBe('座禅「ザゼン」スタイル'));
    });
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
    it('Properly add space after "n[space]"', () => expect(toKana('ichiban warui')).toBe('いちばん わるい'));
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
    it('Convert katakana to romaji',
     () => expect(toRomaji('カニワニ　ガ　スゴイ　ダ')).toBe('kaniwani ga sugoi da'));

    it('Convert hiragana to romaji',
     () => expect(toRomaji('かにわに　が　すごい　だ')).toBe('kaniwani ga sugoi da'));

    it('Convert mixed kana to romaji',
     () => expect(toRomaji('カニワニ　が　すごい　だ')).toBe('kaniwani ga sugoi da'));

    it('Will convert punctuation and full-width spaces',
     () => expect(toRomaji('　。、「」｛｝ー〜（）！？・')).toBe(' .,[]{}-~()!?/'));

    it('Use the upcaseKatakana flag to preserve casing. Works for katakana.',
     () => expect(toRomaji('カニワニ', { upcaseKatakana: true })).toBe('KANIWANI'));

    it('Use the upcaseKatakana flag to preserve casing. Works for mixed kana.',
     () => expect(toRomaji('カニワニ　が　すごい　だ', { upcaseKatakana: true })).toBe('KANIWANI ga sugoi da'));

    it("Doesn't mangle the long dash 'ー' or slashdot '・'",
     () => expect(toRomaji('罰ゲーム・ばつげーむ')).toBe('罰ge-mu/batsuge-mu'));

    it('Spaces must be manually entered',
     () => expect(toRomaji('かにわにがすごいだ')).not.toBe('kaniwani ga sugoi da'));
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
    it('Double consonants',
      () => expect(toRomaji('かっぱ　たった　しゅっしゅ ちゃっちゃ　やっつ')).toBe('kappa tatta shusshu chaccha yattsu'));
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

describe('stripOkurigana', () => {
  it('passes default parameter tests', () => {
    expect(stripOkurigana('ふふフフ')).toBe('ふふフフ');
    expect(stripOkurigana('ふaふbフcフ')).toBe('ふaふbフcフ');
    expect(stripOkurigana('お腹')).toBe('お腹');
    expect(stripOkurigana('踏み込む')).toBe('踏み込');
    expect(stripOkurigana('お祝い')).toBe('お祝');
    expect(stripOkurigana('粘り')).toBe('粘');
    expect(stripOkurigana('〜い海軍い、。')).toBe('〜い海軍、。');
  });
  it('strips all kana when passed optional config', () => {
    expect(stripOkurigana('お腹', { all: true })).toBe('腹');
    expect(stripOkurigana('踏み込む', { all: true })).toBe('踏込');
    expect(stripOkurigana('お祝い', { all: true })).toBe('祝');
    expect(stripOkurigana('〜い海軍い、。', { all: true })).toBe('〜海軍、。');
  });
});

describe('tokenize', () => {
  it('passes default parameter tests', () => {
    expect(tokenize('ふふ')).toEqual(['ふふ']);
    expect(tokenize('フフ')).toEqual(['フフ']);
    expect(tokenize('ふふフフ')).toEqual(['ふふ', 'フフ']);
    expect(tokenize('阮咸')).toEqual(['阮咸']);
    expect(tokenize('感じ')).toEqual(['感', 'じ']);
    expect(tokenize('私は悲しい')).toEqual(['私', 'は', '悲', 'しい']);
    expect(tokenize('what the...私は「悲しい」。')).toEqual(['what the...', '私', 'は', '「', '悲', 'しい', '」。']);
  });
});

describe('Options', () => {
  describe('useObsoleteKana', () => {
    it('useObsoleteKana is false by default', () => expect(toHiragana('wi')).toBe('うぃ'));
    it('wi = ゐ (when useObsoleteKana is true)', () => expect(toHiragana('wi', { useObsoleteKana: true })).toBe('ゐ'));
    it('we = ゑ (when useObsoleteKana is true)', () => expect(toHiragana('we', { useObsoleteKana: true })).toBe('ゑ'));
    it('WI = ヰ (when useObsoleteKana is true)', () => expect(toKatakana('wi', { useObsoleteKana: true })).toBe('ヰ'));
    it('WE = ヱ (when useObsoleteKana is true)', () => expect(toKatakana('we', { useObsoleteKana: true })).toBe('ヱ'));
    it('wi = うぃ when useObsoleteKana is false', () => expect(toHiragana('wi', { useObsoleteKana: false })).toBe('うぃ'));
    it('wi = ウィ when useObsoleteKana is false', () => expect(toKatakana('WI', { useObsoleteKana: false })).toBe('ウィ'));
  });

  describe('IMEMode', () => {
    /**
     * Simulate real typing by calling the function on every character in sequence
     * @param  {String} input
     * @param  {Object} options
     * @return {String} converted romaji as kana
     */
    function testTyping(input, options) {
      let pos = 1;
      let text = input;
      const len = text.length;
      // console.log(`--${text}--`);
      while (pos <= len) {
        let buffer = text.slice(0, pos);
        const rest = text.slice(pos);
        buffer = toKana(buffer, options);
        // console.log(`${pos}:${buffer} <-${rest}`);
        text = buffer + rest;
        pos += 1;
      }
      return text;
    }

    it("Without IME mode, solo n's are transliterated.", () => expect(toKana('n')).toBe('ん'));
    it("Without IME mode, double n's are transliterated.", () => expect(toKana('nn')).toBe('ん'));

    it("With IME mode, solo n's are not transliterated.", () => expect(testTyping('n', { IMEMode: true })).toBe('n'));
    it("With IME mode, double n's are transliterated.", () => expect(testTyping('nn', { IMEMode: true })).toBe('ん'));
    it('With IME mode, n + space are transliterated.', () => expect(testTyping('n ', { IMEMode: true })).toBe('ん'));
    it("With IME mode, n + ' are transliterated.", () => expect(testTyping("n'", { IMEMode: true })).toBe('ん'));
    it('With IME mode, ni.', () => expect(testTyping('ni', { IMEMode: true })).toBe('に'));

    it('kan', () => expect(testTyping('kan', { IMEMode: true })).toBe('かn'));
    it('kanp', () => expect(testTyping('kanp', { IMEMode: true })).toBe('かんp'));
    it('kanpai!', () => expect(testTyping('kanpai', { IMEMode: true })).toBe('かんぱい'));
    it('nihongo', () => expect(testTyping('nihongo', { IMEMode: true })).toBe('にほんご'));

    it("y doesn't count as a consonant for IME", () => expect(testTyping('ny', { IMEMode: true })).toBe('ny'));
    it('nya works as expected', () => expect(testTyping('nya', { IMEMode: true })).toBe('にゃ'));

    it("With IME mode, solo N's are not transliterated - katakana.", () => expect(testTyping('N', { IMEMode: true })).toBe('N'));
    it("With IME mode, double N's are transliterated - katakana.", () => expect(testTyping('NN', { IMEMode: true })).toBe('ン'));
    it('With IME mode, NI - katakana.', () => expect(testTyping('NI', { IMEMode: true })).toBe('ニ'));
    it('With IME mode - KAN - katakana', () => expect(testTyping('KAN', { IMEMode: true })).toBe('カN'));
    it('With IME mode - NIHONGO - katakana', () => expect(testTyping('NIHONGO', { IMEMode: true })).toBe('ニホンゴ'));
  });

  describe('Apostrophes for vague consonant vowel combos', () => {
    it("おんよみ = on'yomi", () => expect(toRomaji('おんよみ')).toBe("on'yomi"));
    it('Checking other combinations', () => expect(toRomaji('んよ んあ んゆ')).toBe("n'yo n'a n'yu"));
  });
});

describe('Performance', () => {
  /* eslint-disable no-console */

  describe('romaji toHiragana Speed', () => {
    const startTime = microtime.now();
    toKana('aiueosashisusesonaninunenokakikukeko');
    const endTime = microtime.now();
    const elapsedMilliSeconds = (endTime - startTime) / 1000;
    console.log(`20 syllables toKana (hiragana) speed: ${elapsedMilliSeconds}ms`);
    expect(elapsedMilliSeconds).toBeLessThan(10);
  });
  describe('romaji toKatakana Speed', () => {
    const startTime = microtime.now();
    toKana('AIUEOSASHISUSESONANINUNENOKAKIKUKEKO');
    const endTime = microtime.now();
    const elapsedMilliSeconds = (endTime - startTime) / 1000;
    console.log(`20 syllables toKana (katakana) speed: ${elapsedMilliSeconds}ms`);
    expect(elapsedMilliSeconds).toBeLessThan(10);
  });
  describe('hiragana ToRomaji Speed', () => {
    const startTime = microtime.now();
    toRomaji('あいうえおさしすせそなにぬねのかきくけこ');
    const endTime = microtime.now();
    const elapsedMilliSeconds = (endTime - startTime) / 1000;
    console.log(`20 hiragana chars toRomaji speed: ${elapsedMilliSeconds}ms`);
    expect(elapsedMilliSeconds).toBeLessThan(10);
  });
  describe('katakana ToRomaji Speed', () => {
    const startTime = microtime.now();
    toRomaji('アイウエオサシスセソナニヌネノカキクケコ');
    const endTime = microtime.now();
    const elapsedMilliSeconds = (endTime - startTime) / 1000;
    console.log(`20 katakana chars toRomaji speed: ${elapsedMilliSeconds}ms`);
    expect(elapsedMilliSeconds).toBeLessThan(10);
  });
});
