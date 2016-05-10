'use strict';

const getList = require('./handlers/gmdashboard/get_list');
const getFilteredList = require('./handlers/gmdashboard/get_filtered_list');

exports.register = function (server, options, next) {

  server.route(
  [
    {
      method: 'GET',
      path: '/gmdashboard',
      config: {
        description: 'return the gmdasboard',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getList
      }
    },
    {
      method: 'GET',
      path: '/gmdashboard/{idClient}',
      config: {
        description: 'return the gmdasboard filtered by client',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getFilteredList
      }
    }
  ]
);
  return next()
}

exports.register.attributes = {
  name: 'GmDashboard'
};
