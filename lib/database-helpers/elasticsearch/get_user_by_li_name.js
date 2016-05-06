const clientES = require('../../es.js');

module.exports = function (name, callback) {

  if (name === undefined) {

    return callback(null, undefined);
  }

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_USERS,
    size: 100,
    body: {
      query: {
        match_phrase: {"names.linkedinName": name}
      },
    }

    }, function (err, response) {
      var user;
      response.hits.hits.forEach(function (userObj) {

          user = userObj._source;
          user.id = userObj._id;
      });
    
    return callback(err, user);
  });
}
