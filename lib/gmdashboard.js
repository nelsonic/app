'use strict';

const listMyClients = require('./database-helpers/elasticsearch/list_my_clients');
const getUserIdByIdGoogle = require('./database-helpers/elasticsearch/get_user_by_id_google');

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
      handler: function(request, reply) {

        getUserIdByIdGoogle(request.auth.credentials.id, function (errUser, user) {

          listMyClients(user.id, function (errClients, clients) {

            console.log('clients from dash', clients);
            return reply.view('gmdasboard', {clients: clients})
          });
        });
      }
    }

  });
  return next()
}


exports.register.attributes = {
  name: 'GmDashboard'
};
