export function init(string) {
  return {
    string,
    cursor: 0,
  }
}

function peek(tokenizer) {
  return tokenizer.string[tokenizer.cursor]
}

function advance(tokenizer) {
  return tokenizer.string[tokenizer.cursor++]
}

function hasMoreTokens(tokenizer) {
  return tokenizer.cursor < tokenizer.string.length
}

function isNumber(c) {
  return '0' < c && c < '9'
}

function isEOF(tokenizer) {
  return tokenizer.cursor === tokenizer.string.length
}

export function nextToken(tokenizer) {
  if (!hasMoreTokens(tokenizer)) {
    return null
  }

  // Numbers
  if (isNumber(peek(tokenizer))) {
    let number = ''
    while (!isEOF(tokenizer) && isNumber(peek(tokenizer))) {
      number += advance(tokenizer)
    }
    return {
      type: "NUMBER",
      value: Number(number),
    }
  }

  if (peek(tokenizer) === '"') {
    advance(tokenizer)
    let string = ''
    while(!isEOF(tokenizer) && peek(tokenizer) !== '"') {
      string += advance(tokenizer)
    }
    if (peek(tokenizer) === '"') advance(tokenizer)
    return {
      type: "STRING",
      value: string,
    }
  }
}
