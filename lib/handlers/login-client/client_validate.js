'use strict';


const redisClient = require('redis-connection')();


module.exports = function (decoded, request, callback) {

  redisClient.get(decoded.sid, function (rediserror, reply) {

    // $lab:coverage:off$
    if(rediserror) {
      console.log(rediserror);
    }
    // $lab:coverage:on$
    let session;

    if(reply) {
      session = JSON.parse(reply);
    }
    else { // unable to find session in redis ... reply is null

      return callback(rediserror, false);
    }

    //verify if the seesion is authorized
    if (session.authorized === true) {

      return callback(rediserror, true, session);
    }
    else {

      return callback(rediserror, false);
    }
  });
};

module.exports.redisClient = redisClient;
