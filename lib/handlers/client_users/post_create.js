'use strict';

/*
* Save or update a client user and redirect to the GET /client-users/list
* This handler is also responsible to encrypt the password of the user with bcrypt.hash
*/

const bcrypt = require('bcrypt');
const saveClientUser = require('../../database-helpers/elasticsearch/client_users/save_client_user');
const updateClientUser = require('../../database-helpers/elasticsearch/client_users/update_client_user');
const existsEmail = require('../../database-helpers/elasticsearch/client_users/exists_email');
const listClients = require('../../database-helpers/elasticsearch/list_clients');

module.exports = (request, reply) => {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  }

  const clientUser = {
    idClient: request.payload.client,
    email: request.payload.email,
    authorized: (request.payload.authorized === 'on') ? true : false,
  };

  bcrypt.hash(request.payload.password, 12, (err, hash) => {
    clientUser.password = hash;

    if (request.payload.idClientUser) {
        //update clientUser
      updateClientUser(request.payload.idClientUser, clientUser, (errUpdate, resUpdate) => {

        return reply.redirect('/client-users/list');
      });
    } else {
      //save clientUser

      existsEmail(clientUser.email, function(exists) {

        if(exists) {
          listClients((err, clients) => {

            return reply.view('clientUserForm', {clientUser: clientUser, clients: clients, errorMessage: 'This email is already used!'})
          });
        } else {
          
          saveClientUser(clientUser, (errSave, responseSave ) => {
            return reply.redirect('/client-users/list');
          });
        }
      })
    }
  });
}
