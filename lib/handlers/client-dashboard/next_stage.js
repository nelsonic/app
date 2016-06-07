'use strict';

const getCandidate = require('../../database-helpers/elasticsearch/candidate/get_candidate');
const udpateCurrentStatus = require('../../database-helpers/elasticsearch/candidate/update_current_status');

module.exports = function (request, reply) {


  if( !request.auth.isAuthenticated) {

    return reply.redirect('/client-login');
  }

  getCandidate(request.payload.idCandidate, function(error, candidate){

    const statusCurrent = candidate.statusCurrent;
    //find the status in the statusCurrent array that we will Update
    //We need to target this status to be able to keep some properties (idUser)
    let statusToUpdate = statusCurrent.filter(function(status) {

      return (status.idJob === request.payload.idJob && status.idStage === request.payload.currentStage);
    })

    //select the object
    statusToUpdate = statusToUpdate[0];
    //define the new properties of the object
    //Remember the object are passed by reference so no need to overide all the array of statuses
    statusToUpdate.idStage = request.payload.nextStage;
    statusToUpdate.timestamp = Date.now();
    statusToUpdate.idClientUser = request.auth.credentials.id;

    //update status on elasticsearch
    udpateCurrentStatus(request.payload.idCandidate, statusCurrent, function(error, response) {

      return reply.redirect('/client-dashboard');
    })
  })
}
