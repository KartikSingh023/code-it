const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')

const runCode = async (language, filePath) => {
  // var result = { stderr: 'no output' }
  let result
  switch (language) {
    case 'cpp': {
      try {
        result = await exec(
          `g++ -o ${filePath}.out ${filePath}.cpp && ${filePath}.out < ${filePath}`,
          { timeout: 1000, maxBuffer: 1024 * 1024 * 5 }
        )
        fs.promises.unlink(filePath + '.out')
      } catch (err) {
        result = err
      }
      break
    }
    case 'js': {
      try {
        result = await exec(`node ${filePath}.js < ${filePath}`, {
          timeout: 5000,
          maxBuffer: 1024 * 1024 * 5,
        })
      } catch (err) {
        result = err
      }
      break
    }
    case 'py': {

      try {
        result = await exec(`cat ${filePath} | python3 ${filePath}.py`, {
          timeout: 5000,
          maxBuffer: 1024 * 1024 * 5,
        })
      } catch (err) {
        result = err
      }
      break
    }
  }

  fs.promises.unlink(filePath)
  fs.promises.unlink(filePath + '.' + language)

  return result
}

module.exports = runCode
