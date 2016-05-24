'use strict';

const listClients = require('../../database-helpers/elasticsearch/list_clients');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  }

  listClients((err, clients) => {
    
    return reply.view('clientUserForm', {clients: clients})
  });
}
