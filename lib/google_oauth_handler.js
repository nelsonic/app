'use strict';

var JWT = require('jsonwebtoken'); // session stored as a JWT cookie
var redisClient = require('redis-connection')();
const existActiveUsers = require('./database-helpers/elasticsearch/exist_active_users');
const getUserByEmail = require('./database-helpers/elasticsearch/get_user_by_email');
const updateUser = require('./database-helpers/elasticsearch/update_user');

module.exports = function custom_handler(req, reply, tokens, profile) {

  if(profile) {

    existActiveUsers(profile.emails[0].value.toLowerCase(), function (err, exist) {

      if (!exist) {

        return reply.redirect('/permission');

      } else {

        // extract the relevant data from Profile to store in JWT object
        var session = {
          firstname : profile.name.givenName, // the person's first name e.g: Anita
          image    : profile.image.url,      // profile image url
          id       : profile.id,             // google+ id
        //  exp      : Math.floor(new Date().getTime()/1000) + 7*24*60*60, // Epiry in seconds!
          agent    : req.headers['user-agent'],
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token
        };
        // create a JWT to set as the cookie:
        var jwt = JWT.sign(session, process.env.JWT_SECRET);

        // store the Profile and Oauth tokens in the Redis DB using G+ id as key
        // Detailed Example...? https://github.com/dwyl/hapi-auth-google/issues/2
        profile.tokens = tokens;
        profile.valid = true;

        getUserByEmail(profile.emails[0].value.toLowerCase(), function (errUser, user) {

          profile.scope = user.admin ? 'admin' : 'user';
          redisClient.set(session.id, JSON.stringify(profile), function (err, res) {

            //udpate idGoogle of the user if it's not defined
            if(!user.idGoogle) {

              updateUser(user.id, {idGoogle: profile.id, image: profile.image.url}, function(error, responseUpdate){

                return reply.redirect('/').state('token', jwt);

              });
            } else {

              // reply to client with a view and a cookie
              // see: http://hapijs.com/tutorials/cookies
              return reply.redirect('/').state('token', jwt);
            }
          });
        });
      }
    });
  }
  else {
    return reply("Sorry, something went wrong, please try again.");
  }
}

module.exports.redisClient = redisClient;
