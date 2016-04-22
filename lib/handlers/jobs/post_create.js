const clientES = require('../../es.js');
const listUsers = require('../../database-helpers/elasticsearch/list_gm_users');
const getJobObject = require('./helpers/get_payload_object.js');
const updateJobsClient = require('../../database-helpers/elasticsearch/update_jobs_client');
const deleteJobClient = require('../../database-helpers/elasticsearch/delete_job_client');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {

    return reply.redirect('login');
  } else {

    listUsers(function (errUsers, users) {
      // $lab:coverage:off$
      if (errUsers) {
        console.log(errUsers);
      }
      // $lab:coverage:on$

      request.payload.startDate = Date.now();
      request.payload.dateEnd = null;

      var paramsES = {
        index: process.env.ES_INDEX,
        type: process.env.ES_TYPE_JOBS,
      };

      var jobObj = getJobObject(request.payload, users);

      if (request.payload.id) {
         //update
        paramsES.id = request.payload.id;
        jobObj.id = request.payload.id;
        paramsES.body = {doc: jobObj};

        //update keep the property jobs
        clientES.update(paramsES, function(errorUpdate, responseUpdate) {
          //update the list of jobs in the client objectType

          deleteJobClient(jobObj.previousClient, responseUpdate._id, function(errDeleteJobs, responseJobsDelete) {

            updateJobsClient(jobObj.client, responseUpdate._id, function(errUpdateJobs, responseJobsUpdate) {

              return reply.redirect('/jobs/list');
            })

          })

        })

      } else {

        //create
        paramsES.body = jobObj;

        clientES.index(paramsES, function (err, response) {

          updateJobsClient(jobObj.client, response._id, function(errUpdateJobs, responseJobsUpdate) {
            //update the job with the new id
            clientES.update({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE_JOBS,
              id: response._id,
              body: {doc: {id: response._id}}
            }, function(errUpdateId, responseUpdateId){

                return reply.redirect('/jobs/list');
            })
          })
        });
      }
    });
  }
}
