'use strict';

const getClient = require('../../database-helpers/elasticsearch/get_clients');
const listJobs = require('../../database-helpers/elasticsearch/jobs/list_jobs_by_client_id');

module.exports = function (request, reply) {

  if( !request.auth.isAuthenticated) {

    return reply.redirect('/client-login');
  }

  getClient(request.auth.credentials.idClient, function (errClient, client) {

    listJobs(request.auth.credentials.idClient, function (errJobs, jobs) {

      return reply.view('dashboardClient', {client: client, jobs: jobs});
    })
  });
}
