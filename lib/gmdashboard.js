'use strict';

const getList = require('./handlers/gmdashboard/get_list');
const getFilteredList = require('./handlers/gmdashboard/get_filtered_list');
const getUserDashboard = require('./handlers/gmdashboard/get_user_dashboard');

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
      method: 'POST',
      path: '/gmdashboard/client/{idClient}',
      config: {
        description: 'return the gmdasboard filtered by client',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getFilteredList
      }
    },
    {
      method: 'POST',
      path: '/gmdashboard/user',
      config: {
        description: 'return the dashboard of a user',
        auth: {
          mode: 'try',
          strategy: 'jwt',
          scope: 'admin'
        },
        handler: getUserDashboard
      }
    }
  ]
);
  return next()
}

exports.register.attributes = {
  name: 'GmDashboard'
};
