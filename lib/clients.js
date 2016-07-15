'use strict';

var getListClients = require('./handlers/clients/get_list.js');
var getCreate = require('./handlers/clients/get_create.js');
var getClientForm = require('./handlers/clients/get_client_form.js');
var postSave = require('./handlers/clients/post_save.js');
var getDetailedClient = require('./handlers/clients/get_detailed_client.js');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'GET',
    path: '/clients/list',
    config: {
      description: 'return list of clients',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getListClients
    }
  },
  {
    method: 'GET',
    path: '/clients/create',
    config: {
      description: 'return create a client page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getCreate
    }
  },

  {
    method: 'GET',
    path: '/clients/edit/{id}',
    config: {
      description: 'return a edit client page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getClientForm
    }
  },

  {
    method: 'GET',
    path: '/clients/{id}',
    config: {
      description: 'return a client with the given id',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getDetailedClient
    }
  },

  {
    method: 'POST',
    path: '/clients/save',
    config: {
      description: 'update/create a client with the given id',
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
  name: 'Clients'
}
