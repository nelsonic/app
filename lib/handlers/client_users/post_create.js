'use strict';

/*
* Save or update a client user and redirect to the GET /client-users/list
* This handler is also responsible to encrypt the password of the user with bcrypt.hash
*/

const bcrypt = require('bcrypt');
const saveClientUser = require('../../database-helpers/elasticsearch/save_client_user');
const updateClientUser = require('../../database-helpers/elasticsearch/update_client_user');

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
      saveClientUser(clientUser, (errSave, responseSave ) => {
        return reply.redirect('/client-users/list');
      });
    }
  });
}
