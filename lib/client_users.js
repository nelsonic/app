'use strict';

/**
* Define routes for managing client users
*  GET /client-users/create - Display the client users creating form-data
*  POST /client-users/save - Save or Edit a client user
*  GET /client-users/list - Display the list of the client users
*  GET /client-users/edit/{id} - Dispaly the form to update a client user
*/

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
        description: 'return create client user form page',
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
        description: 'create or update a client user',
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
