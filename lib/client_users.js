'use strict';

const getCreate = require('./handlers/client_users/get_create');
const postCreate = require('./handlers/client_users/post_create');

exports.register = function (server, options, next) {

  server.route([
    {
      method: 'GET',
      path: '/client-users/create',
      config: {
        description: 'return create client user page',
        auth: {
          mode: 'try',
          strategy: 'jwt',
          scope: 'admin'
        },
        handler: getCreate
      }
    },
    {
      method: 'POST',
      path: '/client-users/save',
      config: {
        description: 'save/create the new client',
        auth: {
          mode: 'try',
          strategy: 'jwt',
          scope: 'admin'
        },
        handler: postCreate
      }
    }
  ])
  return next();
}

exports.register.attributes = {
  name: 'ClientUsers'
}
