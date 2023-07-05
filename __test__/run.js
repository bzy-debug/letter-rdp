import {parse} from '../src/parser.js'
import literalTests from './literal-test.js'
import assert from 'assert'

function exec() {

  const program = `
//one line comment

/*
* document comment
*/
 'hello';

  42;`

  const ast = parse(program)

  console.log(JSON.stringify(ast, null, 2))
}


function test(program, expected) {
  const ast = parse(program)
  assert.deepEqual(ast, expected)
}

exec()

const tests = [literalTests]

tests.forEach(testRun => testRun(test))
console.log('All Assertions Passed!')
