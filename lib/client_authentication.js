'use strict';

const clientValidate = require('./handlers/login-client/clientValidate');

exports.register = function (server, options, next) {

  server.auth.strategy('jwtclient', 'jwt', false,
  { key: process.env.JWT_SECRET_CLIENT,  validateFunc: clientValidate,
    verifyOptions: { ignoreExpiration: true }
  });

  return next();
}

exports.register.attributes = {
  name: 'ClientAuthentication'
};
