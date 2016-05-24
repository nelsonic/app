'use strict';

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

        return reply.redirect('clientUsers');
      });
    } else {
      //save clientUser
      saveClientUser(clientUser, (errSave, responseSave ) => {
        return reply.redirect('clientUsers');
      });
    }
  });
}
