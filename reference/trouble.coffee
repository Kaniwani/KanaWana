wanakana._hiraganaToRomaji = (hira, options) ->
  # merge options with default options
  options = wanakana._extend(options, wanakana.defaultOptions)
  len = hira.length
  roma = []
  cursor = 0
  chunkSize = 0
  maxChunk = 2

  getChunk = () -> hira.substr(cursor, chunkSize)
  # Don't pick a chunk that is bigger than the remaining characters.
  regetChunkSize = () -> chunkSize = Math.min(maxChunk, len-cursor)

  while cursor < len
    convertThisChunkToUppercase = no
    regetChunkSize()
    while chunkSize > 0
      chunk = getChunk()
      if wanakana.isKatakana(chunk)
        convertThisChunkToUppercase = options.convertKatakanaToUppercase
        chunk = wanakana._katakanaToHiragana(chunk)


      # special case for small tsus
      if chunk.charAt(0) is "っ" and chunkSize is 1 and cursor < (len-1)
        nextCharIsDoubleConsonant = true
        romaChar = ""
        break

      romaChar = wanakana.J_to_R[chunk]

      if romaChar? and nextCharIsDoubleConsonant
        romaChar = romaChar.charAt(0).concat(romaChar)
        nextCharIsDoubleConsonant = false

      # DEBUG
      # console.log (cursor + "x" + chunkSize + ":" + chunk + " => " + romaChar )
      break if romaChar?
      chunkSize--

    unless romaChar?
      # console.log("Couldn't find " + chunk + ". Passing through.")
      # Passthrough undefined values
      romaChar = chunk

    if convertThisChunkToUppercase
      romaChar = romaChar.toUpperCase()
    # Handle special cases.
    roma.push romaChar
    cursor += chunkSize or 1
  roma.join("")







wanakana._romajiToKana = (roma, options, ignoreCase = false) ->
  # console.log (new Date().getTime())
  # merge options with default options
  options = wanakana._extend(options, wanakana.defaultOptions)
  len = roma.length
  # Final output array
  kana = []
  # Position in the string that is being evaluated
  cursor = 0
  # Maximum size of the chunk of characters to evaluate at one time
  maxChunk = 3

  # Pulls a chunk of characters based on the cursor position and chunkSize
  getChunk = () -> roma.substr(cursor, chunkSize)
  # Checks if the character is uppercase
  isCharUpperCase = (char) ->
    wanakana._isCharInRange(char, wanakana.UPPERCASE_START, wanakana.UPPERCASE_END)

  # Steps through the string pulling out chunks of characters. Each chunk will be evaluated
  # against the romaji to kana table. If there is no match, the last character in the chunk
  # is dropped and the chunk is reevaluated. If nothing matches, the character is assumed
  # to be invalid or puncuation or other and gets passed through.
  while cursor < len
    # Don't pick a chunk that is bigger than the remaining characters.
    chunkSize = Math.min(maxChunk, len-cursor)
    while chunkSize > 0
      chunk = getChunk()
      chunkLC = chunk.toLowerCase()

      # Handle super-rare edge cases with 4 char chunks (like ltsu, chya, shya)
      if chunkLC in wanakana.FOUR_CHARACTER_EDGE_CASES and (len-cursor) >= 4
        chunkSize++
        chunk = getChunk()
        chunkLC = chunk.toLowerCase()
      else

        # Handle edge cases of n
        if chunkLC.charAt(0) is "n"
          if chunkSize is 2
            if not options.IMEMode and chunkLC.charAt(1) is " "
              #convert "n␣" to "ん␣"
              kanaChar = "ん "
              break
            if options.IMEMode and chunkLC.charAt(1) is "'"
              #convert n' to "ん"
              kanaChar = "ん"
              break
          # Handle edge case of n followed by n and vowel
          if wanakana._isCharConsonant(chunkLC.charAt(1), no) and wanakana._isCharVowel(chunkLC.charAt(2))
            chunkSize = 1
            chunk = getChunk()
            chunkLC = chunk.toLowerCase()

        # Handle case of double consonants
        if chunkLC.charAt(0) isnt "n" and
        wanakana._isCharConsonant(chunkLC.charAt(0)) and
        chunk.charAt(0) == chunk.charAt(1)
          chunkSize = 1
          # Return katakana ッ if chunk is uppercase, otherwise return hiragana っ
          if wanakana._isCharInRange(chunk.charAt(0), wanakana.UPPERCASE_START, wanakana.UPPERCASE_END)
            chunkLC = chunk = "ッ"
          else
            chunkLC = chunk = "っ"

      kanaChar = wanakana.R_to_J[chunkLC]
      # DEBUG
      # console.log (cursor + "x" + chunkSize + ":" + chunk + " => " + kanaChar )
      break if kanaChar?

      # Step down the chunk size.
      # If chunkSize was 4, step down twice.
      if chunkSize == 4
        chunkSize -= 2
      else
        chunkSize--

    unless kanaChar?
      chunk = wanakana._convertPunctuation(chunk)
      # console.log("Couldn't find " + chunk + ". Passing through.")
      # Passthrough undefined values
      kanaChar = chunk

    # Handle special cases.
    if options?.useObseleteKana
      if chunkLC is "wi" then kanaChar = "ゐ"
      if chunkLC is "we" then kanaChar = "ゑ"

    if options.IMEMode and chunkLC.charAt(0) is "n"
      if roma.charAt(cursor + 1).toLowerCase() is "y" and
      wanakana._isCharVowel(roma.charAt(cursor + 2)) is false or
      cursor is (len - 1) or
      wanakana.isKana(roma.charAt(cursor + 1))
        # Don't transliterate this yet.
        kanaChar = chunk.charAt(0)

    # Use katakana if first letter in chunk is uppercase
    unless ignoreCase
      if isCharUpperCase(chunk.charAt(0))
        kanaChar = wanakana._hiraganaToKatakana(kanaChar)

    kana.push kanaChar
    cursor += chunkSize or 1

  kana.join("")
