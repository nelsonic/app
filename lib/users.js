'use strict';

const getList = require('./handlers/users/get_list');
const getUserForm = require('./handlers/users/get_user_form');
const postSave = require('./handlers/users/post_save');

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
      path: '/users/edit/{idGoogle}',
      config: {
        description: 'return a user edit page',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler:getUserForm
      }
    },
    {
      method: 'POST',
      path: '/users/save',
      config: {
        description: 'update/create a user with the given id',
        auth: {
          mode: 'try',
          strategy: 'jwt'
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
