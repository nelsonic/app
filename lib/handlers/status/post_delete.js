'use strict';

const deleteStatus = require('../../database-helpers/elasticsearch/delete_status');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    const status = {
      idCandidate: request.payload.idCandidate,
      timestamp: request.payload.timestamp
    };

    deleteStatus(request.payload.idCandidate, status, function (err, response) {
      if(request.payload.redirectDashboard){
        //allow the elasticsearch to reindex
        setTimeout(function(){ return reply.redirect('/gmdashboard');}, 2000);

      } else {

       return reply.redirect('/candidate/' + request.payload.idCandidate);
      }
    });
  }
}
