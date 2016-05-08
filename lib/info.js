'use strict';

const postSave = require('./handlers/info/post_save');

exports.register = function (server, options, next) {

  server.route({
    method: 'POST',
    path: '/info/save',
    config: {
      description: 'update/save info of the candidate',
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
  name: 'Info'
}
