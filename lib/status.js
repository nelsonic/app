'use strict';

const postSave = require('./handlers/status/post_save');
const postDelete = require('./handlers/status/post_delete');

exports.register = function (server, options, next) {

  server.route([{
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
  },
  {
    method: 'POST',
    path: '/status/delete',
    config: {
      description: 'delete the current status',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: postDelete
    }
  }

  ]);

  return next();
}

exports.register.attributes = {
  name: 'Status'
}
