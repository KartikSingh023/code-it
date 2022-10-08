// handler for python scripts

// package imports
const runCode = require('../lib/runCode')
const isValid = require('../lib/valid')

// execution handling
const pythonHandler = async (key, storagePath) => {
  const filePath = storagePath + key

  // RegExp for import <foo> statement sanitisation
  const basicImportRE = /import\s+(.+)/gim

  // RegExp for import <bar> from <foo> statement sanitisation
  const specificImportRE = /import.+from\s+(.+)/gim

  // list of disabled libraries
  const rejectList = ['os', 'subprocess', 'shlex', 'xml', 'pickle']

  // code validity check
  if (
    !(await isValid(
      filePath + '.py',
      true,
      rejectList,
      specificImportRE,
      basicImportRE
    ))
  ) {
    return {
      code: 1,
      stderr: 'invalid code',
    }
  }

  // we use a promisified exec() call so that the child process output can be handled outside the callback
  return runCode('py', filePath)
}

//code handler exported
module.exports = pythonHandler
