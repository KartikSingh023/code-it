// module for verifying the safety of the code based on library imports

// package imports
const fs = require('fs')

// checker function
const isValid = async (
  codePath, // path to code file
  isRejectMode, // determines whether libraries are to be rejected or accepted
  verifyList, // list of relevant libraries
  primaryRE, // primary RegExp to be matched
  secondaryRE // optional second RegExp if language has multiple ways to import
) => {
  // code obtained as string
  const code = await fs.promises.readFile(codePath, 'utf8')

  // generates list of matches as [[matchstring1, libraryname1, etc], [matchstring2, libraryname2, etc], ...]
  const matchList = secondaryRE
    ? [...code.matchAll(primaryRE), ...code.matchAll(secondaryRE)]
    : [...code.matchAll(primaryRE)]

  // iterate over matched results
  for (matchExp of matchList) {
    if (isRejectMode) {
      if (verifyList.includes(matchExp[1])) return false
    } else {
      if (!verifyList.includes(matchExp[1])) return false
    }
  }
  return true
}

// validity checker exported
module.exports = isValid
