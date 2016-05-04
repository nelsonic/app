'use strict';

const postSave = require('./handlers/status/post_save');

exports.register = function (server, options, next) {

  server.route({
    method: 'POST',
    path: '/status/save',
    config: {
      description: 'save a candidate status',
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
  name: 'Status'
}
