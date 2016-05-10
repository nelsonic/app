'use strict';

module.exports = function (candidates, jobsObject) {

  candidates.forEach( candidate => {

    let status = candidate.statusCurrent;

    status.forEach(st => {
      let idJob = st.idJob;
      let idStage = st.idStage;

      if (jobsObject.hasOwnProperty(idJob)) {
        let candidateObj = {};
        candidateObj.fullname = candidate.fullname;
        candidateObj.picture = candidate.picture;
        candidateObj.id = candidate.id;
        candidateObj.statusTimestamp = st.timestamp;
        jobsObject[idJob][idStage].push(candidateObj);
      }
    })

  })
  return jobsObject;
}
