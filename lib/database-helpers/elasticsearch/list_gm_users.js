'use strict';

/**
* Return a list of gm users, filter
* @param {Function} callback - callback with error and the result
* Example:
[ { names:
     { fullname: 'Adam Hemsley',
       firstname: 'Adam',
       lastname: 'Hemsley',
       linkedinName: 'Adam Hemsley' },
    linkedin: 'https://uk.linkedin.com',
    phones: { office: '', mobile: '' },
    email: 'example@mac.com',
    role: 'Senior Consultant',
    active: true,
    admin: true,
    dev: false,
    id: 'someID' },
    {names: {
      fullname: ....
    }
  }
  ]
*/

const clientES = require('../../es.js');

module.exports = function (callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_USERS,
    size: 100,
    body: {
      query: {
        match_all: {}
      },
        sort: {"names.fullname": {"order": "asc"}}
    }

    }, function (err, response) {

      const users = [];
      response.hits.hits.forEach(function (user) {
        var userObj = user._source;
        userObj.id = user._id;
        users.push(userObj);
      });

      const result = users.filter( user => {return user.dev === false});

      return callback(err, result);
  });
}
