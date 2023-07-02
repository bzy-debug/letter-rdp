import {parse} from '../src/Parser.js'

const program = `42`

const ast = parse(program)

console.log(JSON.stringify(ast))
