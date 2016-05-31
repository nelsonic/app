'use strict';

var clientValidate = require('./handlers/login-client/client_validate');

exports.register = function (server, options, next) {

  server.auth.strategy('client', 'jwt', false,
  { key: process.env.JWT_SECRET_CLIENT,  validateFunc: clientValidate,
    verifyOptions: { ignoreExpiration: true }, cookieKey: 'token_client'
  });

  return next();
}

exports.register.attributes = {
  name: 'ClientAuthentication'
};
