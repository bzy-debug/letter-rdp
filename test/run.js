import {parse} from '../src/parser.js'

const program = `'42'`

const ast = parse(program)

console.log(JSON.stringify(ast))
