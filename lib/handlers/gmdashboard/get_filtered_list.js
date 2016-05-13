'use strict';

const getStatusbyClient = require('./helpers/get_status_by_client');
module.exports = function (request, reply) {

  const idUser = request.payload.idUser;
  const myId = request.auth.credentials.id;
  
  getStatusbyClient(idUser, request.params.idClient, myId,  status => {
    status.userIdGoogle = idUser;
    return reply.view('gmdasboardFiltered', status);
  });

}
