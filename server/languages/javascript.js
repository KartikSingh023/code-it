// handler for js programs

// package imports
const runCode = require('../lib/runCode')
const isValid = require('../lib/valid')

// execution handling
const jsHandler = async (key, storagePath) => {
  const filePath = storagePath + key

  // RegExp for require(<foo>) statement sanitisation
  const importRE = /require\s*\(\s*['"]\s*(.+)\s*['"]\s*\)/gim

  // list of acceptable libraries
  const acceptList = [
    'readline',
    'buffer',
    'string_decoder',
    'timers',
    'stream',
    'util',
  ]

  // code validity check
  if (!(await isValid(filePath + '.js', false, acceptList, importRE, ''))) {
    return {
      code: 1,
      stderr: 'invalid code',
    }
  }

  // we use a promisified exec() call so that the child process output can be handled outside the callback
  return runCode('js', filePath)
}

// code handler exported
module.exports = jsHandler
