function parse(string) {
  return parseProgram(string)
}

// Program
//   : NumericLiteral

function parseProgram(string) {
  return parseNumericLiteral(string)
}

function parseNumericLiteral(string) {
  return {
    type: "NumericLiteral",
    value: Number(string)
  }
}

export {
  parse
}
