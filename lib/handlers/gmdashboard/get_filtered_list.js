'use strict';

const getStatusbyClient = require('./helpers/get_status_by_client');
module.exports = function (request, reply) {

  getStatusbyClient(request.auth.credentials.id, request.params.idClient, status => {

    return reply.view('gmdasboardFiltered', status);
  });

}
