# Testing Overview

We use [Lab](https://github.com/hapijs/lab) for unit testing, [Travis](https://travis-ci.org/) and [Codecov](https://codecov.io/).

For information on how to set up Travis, please visit [official docs](https://docs.travis-ci.com/user/getting-started/#To-get-started-with-Travis-CI%3A)

The testing is initialized by the `npm test` script. See full deatails in [package.json](https://github.com/FAC-GM/app/blob/master/package.json#L8).

The test folder structure:

```
├── elasticsearch                 # Selected tests for elasticsearch functions
├── fixtures                      # Test fixtures
├── redis                         # Selected tests for redis functions
└── handler.js                    # Unit and integration tests for
                                  # handlers and functions
```

The initializer for test is in [initilize.js](https://github.com/FAC-GM/app/blob/master/test/fixtures/initialize.js)
where we defined the localhost mapping for following types:
- contacts
- gmusers
- gmclientusers
- csv-list

The test script creates a copy of the users and a copy of the stages from real database each time it is run - see [package-json](https://github.com/FAC-GM/app/blob/master/package.json#L8)

The main fixture used for most of the tests is [fixture-js.json](https://github.com/FAC-GM/app/blob/master/test/fixtures/fixture-js.json).
