'use strict';

const postCreate = require('./handlers/candidates/post_create.js');
const postDelete = require('./handlers/candidates/post_delete');

exports.register = function (server, option, next) {

  server.route([
    {
      method: 'POST',
      path: '/candidates/create',
      config: {
        description: 'Create the candidate',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: postCreate
      }
    },
    {
      method: 'POST',
      path: '/candidates/delete-list',
      config: {
        description: 'Delete the candidate from the specific list',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: postDelete
      }
    }
  ]
  );
  return next();
}

exports.register.attributes = {
  name: 'Candidates'
}
