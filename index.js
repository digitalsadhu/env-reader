'use strict';

var through = require('through')

var write = function write(chunk) {

  var self = this

  //read each line
  var data = chunk.toString('utf8')
  var lines = data.split('\n')

  lines.forEach(function (line) {
    if (!line) return
    if (line.match(/^\s*#.*$/)) return
    self.emit('data', line)
  })

}

var end = function end () {
  this.emit('end')
}

module.exports = through(write, end)

