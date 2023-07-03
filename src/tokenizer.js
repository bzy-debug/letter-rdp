const spec = [
  [/^\s+/, null],
  [/^\/\/.*/, null],
  [/\/\*[\S\s]*?\*\//, null],
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

export function nextToken(tokenizer) {
  if (!hasMoreTokens(tokenizer)) {
    return null
  }
  const string = tokenizer.string.slice(tokenizer.cursor)

  for (const [regex, tokenType] of spec) {
    const match = regex.exec(string)
    if (match !== null) {

      tokenizer.cursor += match[0].length

      if (tokenType === null) {
        return nextToken(tokenizer)
      }

      return {
        type: tokenType,
        value: match[0],
      }
    }
  }

  throw new SyntaxError(`Unexpected token: '${string[0]}'`)
}
