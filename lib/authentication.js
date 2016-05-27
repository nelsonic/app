var HapiAuthJWT =  require('hapi-auth-jwt2');
var validate = require('./validate');
var clientValidate = require('./handlers/login-client/clientValidate');

exports.register = function (server, options, next) {

  server.register(HapiAuthJWT, function (err) {

    server.auth.strategy('jwt', 'jwt', true,
    { key: process.env.JWT_SECRET,  validateFunc: validate,
      verifyOptions: { ignoreExpiration: true }
    });

  });

  return next();
}

exports.register.attributes = {
  name: 'Authentication'
};
