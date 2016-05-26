'use strict'

/**
* check if user exist in ES. Check that the password is correct
* if ok -> create JWT, save clientObj in Redis and redirect to /dashboard-client with the jwt save in a cookie (use state function)
* if not ok -> redirect to the login-client page
*/

const getUserByEmail = require('../../database-helpers/elasticsearch/client_users/get_user_by_email');
const bcrypt = require('bcrypt');

module.exports = function (request, reply) {

  console.log(request.payload);

  //search on ES the email
  getUserByEmail(request.payload.email, function(error, user) {

    if(!user) {
      return reply.view('loginClient', {message: "Sorry the email or the password is wrong"});
    }

    //compare passwords
    console.log(user);
    bcrypt.compare(request.payload.password, user.password, function(err, res) {
        console.log(res);
        console.log(err);
        reply('NOPE!' + res);
    });

    //client will be undefined if not find or an objec client {}
  })
}
