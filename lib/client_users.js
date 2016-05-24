'use strict';

const getCreate = require('./handlers/client_users/get_create');
const postCreate = require('./handlers/client_users/post_create');
const getList = require('./handlers/client_users/get_list');
const getEdit = require('./handlers/client_users/get_edit');

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
    },
    {
      method: 'GET',
      path: '/client-users/list',
      config: {
        description: 'return client users list',
        auth: {
          mode: 'try',
          strategy: 'jwt',
          scope: 'admin'
        },
        handler: getList
      }
    },
    {
      method: 'GET',
      path: '/client-users/edit/{id}',
      config: {
        description: 'return edit client user page',
        auth: {
          mode: 'try',
          strategy: 'jwt',
          scope: 'admin'
        },
        handler: getEdit
      }
    }
  ])
  return next();
}

exports.register.attributes = {
  name: 'ClientUsers'
}
