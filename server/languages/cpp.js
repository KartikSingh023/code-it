// handler for c++ programs

// package imports
const runCode = require('../lib/runCode')
const isValid = require('../lib/valid')

// execution handling

const cppHandler = async (key, storagePath) => {
  const filePath = storagePath + key  
  // RegExp for #include <foo> statement sanitisation
  const importRE = /#include\s*<([\w^h]*).?h?>/gim


  // list of acceptable libraries
  const acceptList = [
    'iostream',
    'algorithm',
    'stdio',
    'cstdio',
    'vector',
    'math',
    'cmath',
    'cstring',
    'string',
    'deque',
    'iomanip',
    'iterator',
    'map',
    'queue',
    'set',
    'stack',
    'conio',
    'ctype',
  ]

  // code validity check
  if (!(await isValid(filePath + '.cpp', false, acceptList, importRE, ''))) {
    return {
      code: 1,
      stderr: 'invalid code',
    }
  }

  // we use a promisified exec() call so that the child process output can be handled outside the callback
  return await runCode('cpp', filePath)

  // returns exec() result to app
}

// code handler exported
module.exports = cppHandler
