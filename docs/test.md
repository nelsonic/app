## Overview

We use [Lab](https://github.com/hapijs/lab) for unit testing, [Travis](https://travis-ci.org/) and [Codecov](https://codecov.io/).

How to set up Travis, please visit [official docs](https://docs.travis-ci.com/user/getting-started/#To-get-started-with-Travis-CI%3A)

The testing is initialize by the ```npm test``` command. See full deatails in [package.json](https://github.com/FAC-GM/app/blob/master/package.json#L8)

The test structure folder:

```
├── elasticsearch                 # Selected tests for elasticsearch functions
├── fixtures                      # Fixtures (fake data)
├── redis                         # Selected tests for redis functions
└── hanlder.js                    # Unit and integration tests for handlers and functions
```

The initilizer for test is in [initilize.js](https://github.com/FAC-GM/app/blob/master/test/fixtures/initialize.js)
where we defined the localhost mapping for following types:
- contacts
- gmusers
- gmclientusers
- csv-list

Also the test command creates each time copy of the users from real database and copy of the stages - see [package-json](https://github.com/FAC-GM/app/blob/master/package.json#L8)

The main fixture that we use for most of the tests is [fixture-js.json](https://github.com/FAC-GM/app/blob/master/test/fixtures/fixture-js.json)
