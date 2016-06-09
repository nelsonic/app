'use strict';

const getCandidate = require('../../database-helpers/elasticsearch/candidate/get_candidate');
const udpateCurrentStatus = require('../../database-helpers/elasticsearch/candidate/update_current_status');
const getJob = require('../../database-helpers/elasticsearch/get_jobs');

module.exports = function (request, reply) {


  if( !request.auth.isAuthenticated) {

    return reply({code: 500});
  }

  getJob(request.payload.idJob, function (errJob, job) {

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

      //define next stage
      const stagesAllowed = job.stagesAllowed;
      const currentStageIndex = stagesAllowed.indexOf(request.payload.nextStage);
      const nextStageNew = (currentStageIndex + 1) === stagesAllowed.length ? stagesAllowed[currentStageIndex] : stagesAllowed[currentStageIndex + 1];
      //update status on elasticsearch
      udpateCurrentStatus(request.payload.idCandidate, statusCurrent, function(error, response) {

        const payload = {
          currentStage: request.payload.nextStage,
          nextStage: nextStageNew
        }
        JSON.stringify(payload);
        return reply({code: 200, payload: payload});
      });
    });
  });
}
