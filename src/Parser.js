import { init, nextToken } from "./tokenizer.js"

export function parse(string) {
  const tokenizer = init(string)
  return parseProgram(tokenizer)
}

// Program
//  : Literal
//  ;

function parseProgram(tokenizer) {
  return {
    type: "Program",
    body: parseLiteral(tokenizer),
  }
}

function eat(token, expectType) {
  if (token === null) {
    throw new SyntaxError(
      `Unexpected end of input, expected: ${expectType}`
    )
  }
  if (token.type !== expectType) {
    throw new SyntaxError(
      `Unexpected token: ${token.value}, expected: ${expectType}`
    )
  }

  return token
}

// Literal
//   : NumericLiteral
//   : StringLiteral
//   ;

function parseLiteral(toknizer) {
  const token = nextToken(toknizer)
  switch(token.type) {
  case "NUMBER":
    return parseNumericLiteral(token)
  case "STRING":
    return parseStringLiteral(token)
  }
}

// StringLiteral
//   : STRING
//   ;

function parseStringLiteral(token) {
  return {
    type: "StringLiteral",
    value: token.value.slice(1, -1),
  }
}

// NumericLiteral
//   : NUMBER
//   ;
function parseNumericLiteral(token) {
  return {
    type: "NumericLiteral",
    value: Number(token.value)
  }
}
