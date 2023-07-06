import { parse } from "../src/parser.js";
import literalTests from "./literal-test.js";
import blockTests from "./block-test.js";
import assert from "assert";

function exec() {
  const program = `
/*
 * Document comment
*/
42;

// One line comment
"hello";

{}

{42;}

{42; {"hello";}}
`;

  const ast = parse(program);

  console.log(JSON.stringify(ast, null, 2));
}

function test(program, expected) {
  const ast = parse(program);
  assert.deepEqual(ast, expected);
}

exec();

const tests = [literalTests, blockTests];

tests.forEach((testRun) => testRun(test));
console.log("All Assertions Passed!");
