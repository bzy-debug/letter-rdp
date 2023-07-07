import { parse } from '../src/parser.js'
import literalTests from './literal-test.js'
import blockTests from './block-test.js'
import assert from 'assert'
import binaryTest from './binary-test.js'

function exec () {
  const program = '( 21 + 21 ) * 42;'

  const ast = parse(program)

  console.log(JSON.stringify(ast, null, 2))
}

function test (program, expected) {
  const ast = parse(program)
  assert.deepEqual(ast, expected)
}

exec()

const tests = [literalTests, blockTests, binaryTest]

tests.forEach((testRun) => testRun(test))
console.log('All Assertions Passed!')
