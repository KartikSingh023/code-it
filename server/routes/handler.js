// package imports
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const pythonHandler = require('../languages/python')
const cppHandler = require('../languages/cpp')
const jsHandler = require('../languages/javascript')
const crypto = require('crypto')

// global variables initialisation
const USERSTORAGEPATH = '/storage/'
const router = express.Router()

// middleware
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))

// routes

// GET handler for /
router.get('/', async (req, res) => {
  res.send(`POST programs to localhost:9000/code`)
})

router.get('/code', (req, res) => {
  const key = crypto.randomBytes(5).toString('hex')
  res.send(key)
})

// POST handler for /code
router.post('/code', (req, res) => {
  // request body destructured
  const {
    key, //a unique key identifying each user
    language, // specifies programming language, doubles as file extension for storage/code.xyz file
    input, // user's input string to be stored in storage/input
    code, // user's code string to be stored in storage/code.xyz
  } = req.body
  console.log('body', req.body)
  console.log(`key: ${key}`)
  console.log(`language: ${language}`)
  console.log(`path: ${USERSTORAGEPATH}`)

  const inputFilePath = USERSTORAGEPATH + key
  const codeFilePath = USERSTORAGEPATH + key

  // storage for input
  fs.writeFile(inputFilePath, input, (inpFileErr) => {
    if (inpFileErr) {
      res.send(`input err ${inpFileErr}`)
      return
    }

    // storage for user's program
    fs.writeFile(codeFilePath + '.' + language, code, async (codeFileErr) => {
      if (codeFileErr) {
        res.send(`code err ${codeFileErr}`)
        return
      }

      // switching logic to call language specific handler
      switch (language) {
        // python
        case 'py': {
          console.log('handler.js py language switch')
          pythonHandler(key, USERSTORAGEPATH)
            .then((result) => {
              console.log('responding to client with result')
              console.log(result)
              if (result.stderr) {
                res.send(result.stderr)
              }
              res.send(result.stdout)
            }) // callback responds result of successful execution
            .catch((err) => res.send(err)) // callback responds result of failed execution
          break
        }

        // c++
        case 'cpp': {
          console.log('handler.js cpp language switch')
          cppHandler(key, USERSTORAGEPATH)
            .then((result) => {
              console.log('responding to client with result')
              console.log(result)
              if (result.stderr) {
                res.send(result.stderr)
              }
              res.send(result.stdout)
            }) // callback responds result of successful execution
            .catch((err) => {
              console.log('responding to client with err')
              console.log(err)
              res.send(err)
            }) // callback responds result of failed execution
          break
        }

        // node.js
        case 'js': {
          jsHandler(key, USERSTORAGEPATH)
            .then((result) => {
              if (result.stderr) {
                res.send(result.stderr)
              }
              res.send(result.stdout)
            }) // callback responds result of successful execution
            .catch((err) => res.send(err)) // callback responds result of failed execution
          // break
        }
      }
    })
  })
})

// router exported to index
module.exports = router
