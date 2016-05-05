'use strict';

const getList = require('./handlers/owners/get_list.js');

exports.register = function (server, option, next) {

  server.route(
    {
      method: 'GET',
      path: '/owners/list',
      config: {
        description: 'return list of owners',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getList
      }
    }

  );
  return next();
}

exports.register.attributes = {
  name: 'Owners'
}
