// handler for python scripts

// package imports
const isValid = require('../lib/valid')
const execute = require('../lib/execute')

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
      // code: 1,
      stdout: '',
      stderr: 'invalid code',
    }
  }

  // at this point, we have validated the code and run execute()
  const result = await execute('py', filePath)
  return result
}

//code handler exported
module.exports = pythonHandler
