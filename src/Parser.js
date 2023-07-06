import { init, peek, advance } from "./tokenizer.js";

export function parse(string) {
  const tokenizer = init(string);
  return parseProgram(tokenizer);
}

// Program
//  : StatementList
//  ;

function parseProgram(tokenizer) {
  return {
    type: "Program",
    body: parseStatementList(tokenizer),
  };
}

// StatementList
//  : Statement
//  : StatementList Statement
//  ;

function parseStatementList(tokenizer, stopLookahead) {
  const statements = [parseStatement(tokenizer)];
  while (peek(tokenizer) !== null && peek(tokenizer).type !== stopLookahead) {
    statements.push(parseStatement(tokenizer));
  }
  return statements;
}

// Statement
//  : ExpressionStatement
//  : BlockStatement

function parseStatement(tokenizer) {
  switch (peek(tokenizer).type) {
    case "{":
      return parseBlockStatement(tokenizer);
    default:
      return parseExpressionStatement(tokenizer);
  }
}

// BlockStatement
//  : '{' OptStatementList '}'

function parseBlockStatement(tokenizer) {
  eat(tokenizer, "{");
  const body =
    peek(tokenizer).type === "}" ? [] : parseStatementList(tokenizer, "}");
  eat(tokenizer, "}");
  return {
    type: "BlockStatement",
    body,
  };
}

// ExpressionStatement
//  : Expression ';'
//  ;

function parseExpressionStatement(tokenizer) {
  const expression = parseExpression(tokenizer);
  eat(tokenizer, ";");
  return {
    type: "ExpressionStatement",
    expression,
  };
}

// Expression
//  : Literal

function parseExpression(tokenizer) {
  return parseLiteral(tokenizer);
}

// Literal
//  : NumericLiteral
//  : StringLiteral
//  ;

function eat(tokenizer, expectType) {
  const token = advance(tokenizer);
  if (token === null) {
    throw new SyntaxError(`Unexpected end of input, expected: ${expectType}`);
  }
  if (token.type !== expectType) {
    throw new SyntaxError(
      `Unexpected token: ${token.value}, expected: ${expectType}`
    );
  }
  return token;
}

// Literal
//   : NumericLiteral
//   : StringLiteral
//   ;

function parseLiteral(toknizer) {
  const token = peek(toknizer);
  switch (token.type) {
    case "NUMBER":
      return parseNumericLiteral(toknizer);
    case "STRING":
      return parseStringLiteral(toknizer);
  }
}

// StringLiteral
//   : STRING
//   ;

function parseStringLiteral(tokenizer) {
  const token = advance(tokenizer);
  return {
    type: "StringLiteral",
    value: token.value.slice(1, -1),
  };
}

// NumericLiteral
//   : NUMBER
//   ;
function parseNumericLiteral(tokenizer) {
  const token = advance(tokenizer);
  return {
    type: "NumericLiteral",
    value: Number(token.value),
  };
}
