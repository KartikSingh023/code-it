const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')

const runCode = async (language, filePath) => {
  console.log('runCode called');
  var result = { stderr: 'no output' }
  switch (language) {
    case 'cpp': {
      console.log('c++ exec');
      result = await exec(
        `g++ -o ${filePath}.out ${filePath}.cpp && ${filePath}.out < ${filePath}`,
        { timeout: 3000, maxBuffer: 1024 * 1024 * 5 }
      )
      fs.promises.unlink(filePath + '.out')
      break
    }
    case 'js': {
      console.log('js exec')
      result = await exec(`node ${filePath}.js < ${filePath}`, {
        timeout: 5000,
        maxBuffer: 1024 * 1024 * 5,
      })
      break
    }
    case 'py': {
      console.log('runCode.js py switch');
      console.log('executing');
      result = await exec(`cat ${filePath} | python3 ${filePath}.py`, {
        timeout: 5000,
        maxBuffer: 1024 * 1024 * 5,
      })
      // result = await exec(`ls /storage/ -al`, {
      //   timeout: 5000,
      //   maxBuffer: 1024 * 1024 * 5,
      // })
      console.log('Result:');
      console.log(result)
      break
    }
  }

  fs.promises.unlink(filePath)
  fs.promises.unlink(filePath + '.' + language)
  console.log('returning from runCode() with result');
  console.log(result);
  return result
}

module.exports = runCode
