'use strict';

const clientES = require('../../es.js');

module.exports = function (callback) {

  var numberUsers = 0;

  clientES.search({

    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_USERS,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      }
    }
  }, function getMoreUntilDone(error, response) {

    var result = [];

    response.hits.hits.forEach(function (user) {
      var userObject = {};
      userObject.firstName = user._source.names.firstname;
      userObject.lastName = user._source.names.lastname;
      userObject.name = user._source.names.fullname;
      userObject.id = user._id;
      userObject.email = user._source.email;
      result.push(userObject);
      numberUsers += 1;
    });

    if (response.hits.total !== numberUsers) {
      clientES.scroll({
        scrollId: response._scroll_id,
        scroll: '30s',
        size: 1000,
      }, getMoreUntilDone);
    } else {

      return callback(result);
    }
  });
}
