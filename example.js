'use strict';

var envWriter = require('env-writer')
  , envParser = require('env-parser')
  , envReader = require('./index.js')
  , fs        = require('fs')

envParser.on('end', function () {
  console.log(process.env.ENV)
  console.log(process.env.USER)
  console.log(process.env.PASS)
})

fs.createReadStream(__dirname + '/example.env')
  .pipe(envReader)
  .pipe(envParser)
  .pipe(envWriter)




