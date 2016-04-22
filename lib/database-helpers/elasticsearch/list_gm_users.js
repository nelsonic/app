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

      var users = [];
      response.hits.hits.forEach(function (user) {
        var userObj = user._source;
        users.push(userObj);
      });

    return callback(err, users);
  });
}
