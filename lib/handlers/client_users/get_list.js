'use strict';

const clientUsersList = require('../../database-helpers/elasticsearch/list_client_users');
const listClients = require('../../database-helpers/elasticsearch/list_clients');

module.exports = (request, reply) => {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  }

  clientUsersList((err, clientUsers) => {

    listClients((errClients, clients) => {
      
      clientUsers.forEach((clientUser) => {

        let client = clients.filter((clientObj) => {
          return clientUser.idClient === clientObj.id;
        });

        client[0] ? clientUser.nameClient = client[0].name : clientUser.nameClient = '';

      });

      return reply.view('clientUsers', {clientUsers: clientUsers});
    });
  });
}
