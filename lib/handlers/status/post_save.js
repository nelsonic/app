'use strict';

const updateStatus = require('../../database-helpers/elasticsearch/update_status');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    var status = {
      idCandidate: request.payload.idCandidate,
      idClient: request.payload.idClient,
      idJob: request.payload.idJob,
      idUser: request.auth.credentials.id,
      idStage: request.payload.idStage,
      timestamp: Date.now()
    };

    updateStatus(request.payload.idCandidate, status, function (err, response) {
      
      return reply.redirect('/candidate/' + request.payload.idCandidate);
    });
  }
}
