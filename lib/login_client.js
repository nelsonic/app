'use strict';

/**
* Create routes for authenticating client
* GET /login-client - display the login page
* POST /client-auth - validate the email and password + create JWT
*/

const getLoginPage = require('./handlers/login-client/get_login_page');
const validateClientCredentials = require('./handlers/login-client/validate_client_credentials');

exports.register = function (server, option, next) {

  server.route([
    {
      method: 'GET',
      path: '/client-login',
      config: {
        description: 'return a login page for the clients',
        auth: false,
        handler: getLoginPage
      }
    },
    {
      method: 'POST',
      path: '/client-auth',
      config: {
        description: 'Validate email and password of a client',
        auth: false,
        handler: validateClientCredentials
      }
    }
  ]);
  return next();
}

exports.register.attributes = {
  name: 'Login Clients'
}
