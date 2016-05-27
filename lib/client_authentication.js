'use strict';

const HapiAuthJWT =  require('hapi-auth-jwt2');
const clientValidate = require('./handlers/login-client/clientValidate');

exports.register = function (server, options, next) {

  server.auth.strategy('jwt-client', 'jwt', false,
  { key: process.env.JWT_SECRET,  validateFunc: clientValidate,
    verifyOptions: { ignoreExpiration: true }
  });

  return next();
}

exports.register.attributes = {
  name: 'ClientAuthentication'
};
