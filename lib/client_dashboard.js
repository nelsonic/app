'use strict';

const getDashboard = require('./handlers/client-dashboard/get_dashboard');
const nextStage = require('./handlers/client-dashboard/next_stage');
const reject = require('./handlers/client-dashboard/reject');

exports.register = function (server, options, next) {

  server.route(
  [
    {
    method: 'GET',
    path: '/client-dashboard',
    config: {
      auth: {
        mode: 'try',
        strategy: 'jwt-client'
      },
      handler: getDashboard
    }

  },
  {
    method: 'POST',
    path: '/nextStage',
    config: {
      auth: {
        mode: 'try',
        strategy: 'jwt-client'
      },
      handler: nextStage
    }
  },
  {
    method: 'POST',
    path: '/reject',
    config: {
      auth: {
        mode: 'try',
        strategy: 'jwt-client'
      },
      handler: reject
    }
  }

  ]

  );
  return next();
}

exports.register.attributes = {
  name: 'ClientDashboard'
};
