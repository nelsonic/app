'use strict';

/**
* Load all public assets, e.g js, css, images
*/

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/assets/{params*}',
    config: {
      description: 'load assets',
      auth: false,
      handler: {
        directory: {
          path: 'assets'
        }
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'Assets'
};
