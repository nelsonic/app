var validate = require('./validate');

exports.register = function (server, options, next) {


  server.auth.strategy('jwt', 'jwt', false,
  { key: process.env.JWT_SECRET,  validateFunc: validate,
    verifyOptions: { ignoreExpiration: true }
  });

  return next();
}

exports.register.attributes = {
  name: 'Authentication'
};
