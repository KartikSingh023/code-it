// handler for c++ programs

// package imports
const isValid = require('../lib/valid')
const execute = require('../lib/execute')

//constants
const CONSTANTS = require('../constants.js')

// execution handling

const cppHandler = async (key, storagePath) => {
  const filePath = storagePath + key
  // RegExp for #include <foo> statement sanitisation
  const importRE = CONSTANTS.CPP.REGEX

  // list of acceptable libraries
  const acceptList = CONSTANTS.CPP.ACCEPT_LIST

  // code validity check
  if (!(await isValid(filePath + '.cpp', false, acceptList, importRE, ''))) {
    return {
      code: 1,
      stdout: '',
      stderr: 'invalid code',
    }
  }

  // at this point, we have validated the code and run execute()
  const result = await execute('cpp', filePath)

  return result
}

// code handler exported
module.exports = cppHandler
