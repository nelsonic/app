'use strict';

const postSave = require('./handlers/status/post_save');
const postDelete = require('./handlers/status/post_delete');
const postEdit = require('./handlers/status/post_edit');

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
  },
  {
    method: 'POST',
    path: '/status/edit',
    config: {
      description: 'edit the current status',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: postEdit
    }
  }

  ]);

  return next();
}

exports.register.attributes = {
  name: 'Status'
}
