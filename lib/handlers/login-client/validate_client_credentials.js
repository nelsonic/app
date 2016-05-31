'use strict'

/**
* check if user exist in ES. Check that the password is correct
* if ok -> create JWT, save clientObj in Redis and redirect to /dashboard-client with the jwt save in a cookie (use state function)
* if not ok -> redirect to the login-client page
*/

const getUserByEmail = require('../../database-helpers/elasticsearch/client_users/get_user_by_email');
const bcrypt = require('bcrypt');
const aguid = require('aguid');
const redisClient = require('redis-connection')();
var JWT = require('jsonwebtoken');

module.exports = function (request, reply) {

  getUserByEmail(request.payload.email, function(error, user) {

    if(user === null) {

      return reply.view('loginClient', {message: "Sorry the email or the password is wrong"});
    }

    bcrypt.compare(request.payload.password, user.password, function(err, res) {

      if (!err && res === true) {

        var sid = aguid();

        var session = {
          email: user.email,
          authorized: user.authorized,
          id: user.id,
          idClient: user.idClient
        };

        redisClient.set(sid, JSON.stringify(session), function (errRedis, result) {

          var token = JWT.sign({
            sid: sid
          }, process.env.JWT_SECRET_CLIENT);

          return reply.redirect('/client-dashboard').state('token_client', token);
        });
      } else {
        //reject
        return reply.view('loginClient', {message: "Sorry the email or the password is wrong!"});
      }
    });

  });
}
