'use strict';

module.exports = function (candidates, jobsObject, myId) {

  candidates.forEach( candidate => {

    let status = candidate.statusCurrent;

    status.forEach(st => {
      let idJob = st.idJob;
      let idStage = st.idStage;
      if(myId === st.idUser) {
        if (jobsObject.hasOwnProperty(idJob)) {
          jobsObject[idJob][idStage].push(candidate)
        }
      }
    })
  })
  return jobsObject;
}
