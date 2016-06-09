'use strict';

const getCandidate = require('../../database-helpers/elasticsearch/candidate/get_candidate');
const rejectCandidate = require('../../database-helpers/elasticsearch/candidate/reject_candidate');

module.exports = function (request, reply) {


  if( !request.auth.isAuthenticated) {

    return reply({code: 500});
  }

  getCandidate(request.payload.idCandidate, function(error, candidate){
    //build the rejected object
    const rejectedObj = {
      idCandidate: request.payload.idCandidate,
      idJob: request.payload.idJob,
      idStage: request.payload.idStage, //the stage where the candidate where at when she was rejected
      timestamp: Date.now(),
      idClientUser: request.auth.credentials.id
    }

    const rejected = candidate.rejected || [];
    rejected.push(rejectedObj);

    //update the statusCurrent
    const statusCurrent = candidate.statusCurrent;
    const statusCurrentUpdated = statusCurrent.filter(function(status) {
      return (
        status.idJob !== request.payload.idJob ||
        ( status.idJob === request.payload.idJob && status.idStage !== request.payload.currentStage )
      )
    })

    rejectCandidate(request.payload.idCandidate, statusCurrentUpdated, rejected, function(error, response) {

      return reply({code: 200});
    });
  });
}
