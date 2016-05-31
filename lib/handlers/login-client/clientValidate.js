'use strict';


const redisClient = require('redis-connection')();


module.exports = function (decoded, request, callback) {

  //never called!
  console.log('Called jwtclient strategy!');
  // do your checks to see if the session is valid
  redisClient.get(decoded.sid, function (rediserror, reply) {
    console.log(reply);
    /* istanbul ignore if */
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

    if (session.authorized === true) {
      return callback(rediserror, true, session);
    }
    else {
      return callback(rediserror, false);
    }
  });
};

module.exports.redisClient = redisClient;
