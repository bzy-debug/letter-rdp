const spec = [
  [/^\s+/, null],
  [/^\/\/.*/, null],
  [/^\/\*[\S\s]*?\*\//, null],
  [/^;/, ';'],
  [/^{/, '{'],
  [/^}/, '}'],
  [/^\d+/, "NUMBER"],
  [/^"[^"]*"/, "STRING"],
  [/^'[^']*'/, "STRING"],
]

export function init(string) {
  return {
    string,
    cursor: 0,
  }
}

function hasMoreTokens(tokenizer) {
  return tokenizer.cursor < tokenizer.string.length
}

function next(tokenizer, willAdvance) {
  if (!hasMoreTokens(tokenizer)) {
    return null
  }
  const string = tokenizer.string.slice(tokenizer.cursor)

  for (const [regex, tokenType] of spec) {
    const match = regex.exec(string)
    if (match !== null) {

      if (tokenType === null) {
        tokenizer.cursor += match[0].length
        return next(tokenizer, willAdvance)
      }

      if (willAdvance) tokenizer.cursor += match[0].length

      return {
        type: tokenType,
        value: match[0],
      }
    }
  }
  throw new SyntaxError(`Unexpected token: '${string[0]}'`)
}

export function peek(tokenizer) {
  return next(tokenizer, false)
}

export function advance(tokenizer) {
  return next(tokenizer, true)
}
