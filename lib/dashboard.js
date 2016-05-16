'use strict';

const getList = require('./handlers/dashboard/get_list');
const getFilteredList = require('./handlers/dashboard/get_filtered_list');
const getUserDashboard = require('./handlers/dashboard/get_user_dashboard');

exports.register = function (server, options, next) {

  server.route(
  [
    {
      method: 'GET',
      path: '/dashboard',
      config: {
        description: 'return the dasboard',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getList
      }
    },
    {
      method: 'POST',
      path: '/dashboard/client/{idClient}',
      config: {
        description: 'return the dasboard filtered by client',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getFilteredList
      }
    },
    {
      method: 'POST',
      path: '/dashboard/user',
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
  name: 'Dashboard'
};
