'use strict';

const getStatusbyClient = require('./helpers/get_status_by_client');
module.exports = function (request, reply) {

  const idUser = request.payload.idUser ;
  getStatusbyClient(idUser, request.params.idClient, status => {
    status.userIdGoogle = idUser;
    return reply.view('gmdasboardFiltered', status);
  });

}
