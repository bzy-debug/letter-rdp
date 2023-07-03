import {parse} from '../src/parser.js'

const program = `
   //sdflksdfjl
/*
*sdfklj
*/
   '23123'  `

const ast = parse(program)

console.log(JSON.stringify(ast, null, 2))
