'use strict';

var redisClient = require('redis-connection')();

module.exports = function (id, scope, callback) {

  redisClient.get(id, function (err, session) {

    let sessionUpdate = JSON.parse(session);
    sessionUpdate.scope = scope;

    redisClient.set(id, JSON.stringify(sessionUpdate), function (errSet, res) {

      return callback(errSet, res);
    });
  });
}
