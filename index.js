'use strict';

var through = require('through')

var write = function write(chunk) {

  var self = this

  //read each line
  var data = chunk.toString('utf8')
  var lines = data.split('\n')

  lines.forEach(function (line) {

    //generic catch all
    if (!line) return

    //skip empty lines
    if (line.match(/^\s*$/)) return

    //skip lines starting with comments
    if (line.match(/^\s*#.*$/)) return

    //skip lines that start with =
    if (line.match(/^\s*=.*$/)) return

    //skip lines that dont have an =
    if (!line.match(/^.*=.*$/)) return

    //extract variable name, trimming whitespace
    line = line.replace(/^\s*(.*?)\s*=/, '$1=')
    //remove the optional export keyword before variable name
    line = line.replace(/^(?:export\s)?\s*(.*?)=/, '$1=')
    //extract variable value, trimming whitespace
    line = line.replace(/^(.*?)=\s*(.*?)\s*$/, '$1=$2')

    self.emit('data', line)
  })

}

var end = function end () {
  this.emit('end')
}

module.exports = function () {
  return through(write, end)
}

