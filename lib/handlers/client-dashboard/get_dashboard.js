'use strict';

const getClient = require('../../database-helpers/elasticsearch/get_clients');
const listJobs = require('../../database-helpers/elasticsearch/jobs/list_jobs_by_client_id');
const getCandidatesWithStatus = require('../../database-helpers/elasticsearch/get_candidates_with_status');

module.exports = function (request, reply) {

  if( !request.auth.isAuthenticated) {

    return reply.redirect('/client-login');
  }

  getClient(request.auth.credentials.idClient, function (errClient, client) {

    listJobs(request.auth.credentials.idClient, function (errJobs, jobs) {
    
      getCandidatesWithStatus(function (errCandidates, candidates) {

        console.log(candidates[0].statusCurrent);
        return reply.view('dashboardClient', {client: client, jobs: jobs});
      })
    })
  });
}
