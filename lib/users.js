'use strict';

const getList = require('./handlers/users/get_list');
const getUserForm = require('./handlers/users/get_user_form');
const postSave = require('./handlers/users/post_save');
const getCreate = require('./handlers/users/get_create');

exports.register = function (server, option, next) {

  server.route([
    {
      method: 'GET',
      path: '/users/list',
      config: {
        description: 'return list of users',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getList
      }
    },
    {
      method: 'GET',
      path: '/users/edit/{id}',
      config: {
        description: 'return a user edit page',
        auth: {
          mode: 'try',
          strategy: 'jwt',
          scope: 'admin'
        },
        handler:getUserForm
      }
    },
    {
      method: 'GET',
      path: '/users/create',
      config: {
        description: 'return a user form',
        auth: {
          mode: 'try',
          strategy: 'jwt',
          scope: 'admin'
        },
        handler:getCreate
      }
    },
    {
      method: 'POST',
      path: '/users/save',
      config: {
        description: 'update/create a user with the given id',
        auth: {
          mode: 'try',
          strategy: 'jwt',
          scope: 'admin'
        },
        handler: postSave
      }
    }

  ]);
  return next();
}

exports.register.attributes = {
  name: 'Users'
}
