[![Build Status](https://travis-ci.org/digitalsadhu/env-reader.svg?branch=master)](https://travis-ci.org/digitalsadhu/env-reader)

[![NPM](https://nodei.co/npm/env-reader.png)](https://nodei.co/npm/env-reader/)

[![Media Suite](http://mediasuite.co.nz/ms-badge.png)](http://mediasuite.co.nz)

env-reader
==========

Streaming environment variable reader

Accepts simple key=value data and passes it on after performing some basic
filtering out of things like blank lines, comment lines and invalid env lines

## Examples

Require the module

```js
var env = require('env-reader')()

```

Listening for data events
```js
env.on('data', function (envLine) {
  //do something
})
```

Writing data
```js
env.write('\n#comment line\ninvalid line\nvalid=line\n    \n')

//only valid=line would be passed emitted, the rest would be disguarded
```

This module was built with the following type of input in mind:

```
#ENV config file

#environment definition
ENV=development

#database definition
DB_HOST=localhost
DB_USER=user
DB_PASS=password
DB_NAME=development
```

and will emit the following lines from such a file one after another:

```
ENV=development
DB_HOST=localhost
DB_USER=user
DB_PASS=password
DB_NAME=development
```

if streamed the data in the following way:

```js
fs.createReadStream('example.file').pipe(env)
```

If you were to send it all the data at once like:

```js
var envFileString = "#ENV config file\n#environment definition\nENV=development\n\n" +
  "#database definition\nDB_HOST=localhost\nDB_USER=user\nDB_PASS=password\n" +
  "DB_NAME=development"

env.write(envFileString)
```

it would still break the string apart and emit the cleaned up env
pieces 1 after another
