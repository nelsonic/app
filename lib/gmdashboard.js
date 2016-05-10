'use strict';

const getList = require('./handlers/gmdashboard/get_list');

exports.register = function (server, options, next) {

  server.route({
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
  });
  return next()
}

exports.register.attributes = {
  name: 'GmDashboard'
};
