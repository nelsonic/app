'use strict';


const redisClient = require('redis-connection')();


module.exports = function (decoded, request, callback) {

console.log('decoded', decoded);
  redisClient.get(decoded.sid, function (rediserror, reply) {

    // $lab:coverage:off$
    if(rediserror) {
      console.log(rediserror);
    }
    // $lab:coverage:on$
    let session;

    if(reply) {
      session = JSON.parse(reply);
      console.log('session first',session);
    }
    else { // unable to find session in redis ... reply is null
      console.log('not find');
      return callback(rediserror, false);
    }

    //verify if the seesion is authorized
    console.log('session',session);
    if (session.authorized === true) {
      console.log('yes!!', session);
      return callback(rediserror, true, session);
    }
    else {

      return callback(rediserror, false);
    }
  });
};

module.exports.redisClient = redisClient;
