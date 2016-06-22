'use strict';

/**
*  Create a rejected object {timestamp: {title: -, idUserClient: -, timestamp: -}}
* @param {Array} - rejectedList, the list of the rejected jobs for a candidate; created when a client reject a candidate
* @param {Array} - jobs, the list of all the jobs object, contains all the details of the jobs
* @param {Array} - clients, the list of all the clients
*/

module.exports = function(rejectedList, jobs, clients) {


  //create the object jobs
  const jobObjects = {};

  jobs.forEach( job => {
    jobObjects[job.id] = job;
  })

  //create the object clientList
  const clientObjects = {};
  clients.forEach( client => {
    clientObjects[client.id] = client;
  })

  const rejectedObj = {};

  rejectedList.forEach(rejected => {

      let idJob = rejected.idJob;
      let idClient = jobObjects[rejected.idJob].client;

      rejectedObj[rejected.timestamp] = {}
      rejectedObj[rejected.timestamp].nameJob = jobObjects[idJob].title;
      rejectedObj[rejected.timestamp].nameClient = clientObjects[idClient].name;
      rejectedObj[rejected.timestamp].idJob = idJob;
      rejectedObj[rejected.timestamp].timestamp = rejected.timestamp;

  });

  return rejectedObj;

}
