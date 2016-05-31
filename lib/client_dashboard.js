'use strict';

const getDashboard = require('./handlers/client-dashboard/get_dashboard');

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/client-dashboard',
    config: {
      auth: {
        mode: 'try',
        strategy: 'jwtclient'
      },
      handler: getDashboard
    }

  });
  return next();
}

exports.register.attributes = {
  name: 'ClientDashboard'
};
