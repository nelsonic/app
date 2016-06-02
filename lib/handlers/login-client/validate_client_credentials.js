'use strict'

/**
* check if user exist in ES and the password is correct
* if ok, create a JWT, save the session in Redis and redirect to /dashboard-client with the jwt saved in a cookie
* if not ok -> redirect to the login-client page
*/

const getUserByEmail = require('../../database-helpers/elasticsearch/client_users/get_user_by_email');
const bcrypt = require('bcrypt');
const aguid = require('aguid');
const redisClient = require('redis-connection')();
const JWT = require('jsonwebtoken');
const addSid = require('../../database-helpers/elasticsearch/client_users/add_sid');

module.exports = function (request, reply) {

  getUserByEmail(request.payload.email, function(error, user) {

    if(user === null) {

      return reply.view('loginClient', {message: "Sorry the email or the password is not correct"}, {layout: 'client'});
    }

    bcrypt.compare(request.payload.password, user.password, function(err, res) {

      if (res === true) {

        let sid = aguid();

        let session = {
          email: user.email,
          authorized: user.authorized,
          id: user.id
        };

        addSid(sid, user.id, function(error, response){

          redisClient.set(sid, JSON.stringify(session), function (errRedis, result) {

            let token = JWT.sign({
              sid: sid
            }, process.env.JWT_SECRET_CLIENT);

            return reply.redirect('/client-dashboard').state('token_client', token);
          });
        })

      } else {
        //reject
        return reply.view('loginClient', {message: "Sorry the email or the password is not correct"}, {layout: 'client'});
      }
    });

  });
}
