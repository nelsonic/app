'use strict';

const postSave = require('./handlers/li/post_save');

exports.register = function (server, options, next) {

  server.route({
    method: 'POST',
    path: '/li/save',
    config: {
      description: 'update/save LI url of the candidate',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: postSave
    }
  });

  return next();
}

exports.register.attributes = {
  name: 'Li'
}
