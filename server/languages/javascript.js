// handler for js programs

// package imports
const isValid = require('../lib/valid')
const execute = require('../lib/execute')

//constants
const {JS} = require('../constants.js')

// execution handling
const jsHandler = async (key, storagePath) => {
  const filePath = storagePath + key

  // RegExp for require(<foo>) statement sanitisation
  const importRE = JS.REGEX

  // list of acceptable libraries
  const acceptList = JS.ACCEPT_LIST

  // code validity check
  if (!(await isValid(filePath + '.js', false, acceptList, importRE, ''))) {
    return {
      code: 1,
      stdout: '',
      stderr: 'invalid code',
    }
  }

  // at this point, we have validated the code and run execute()
  const result = await execute('js', filePath)
  return result
}

// code handler exported
module.exports = jsHandler
