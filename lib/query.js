'use strict';

const getList = require('./handlers/query/get_list');

exports.register = function(server, options, next) {

  server.route(
    {
      method: 'GET',
      path: '/query/{page?}',
      config: {
        description: 'return the search results using job, name, location and skills fields',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getList
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'Query'
};
