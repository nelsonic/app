'use strict';

/**
* Return candidate object {"idJob" : { "idStage" : {"idCandidate" :{name: "Anita", picture: "url", id: '124'}}}}
* @param {Array} candidates - list of all candidates
*/

module.exports = function (candidates) {

  var candidateObj = {};

  candidates.forEach(function (candidate) {

    candidate.statusCurrent.forEach(function (status) {

      if(!candidateObj[status.idJob]) {

        candidateObj[status.idJob] = {};
      }

      if(!candidateObj[status.idJob][status.idStage]) {

        candidateObj[status.idJob][status.idStage] = {};
      }
      
      candidateObj[status.idJob][status.idStage][candidate.id] = {
        name: candidate.fullname,
        picture: candidate.picture,
        id: candidate.id,
        url: candidate.url
      }
    });
  });

  return candidateObj;
}
