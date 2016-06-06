'use strict';

const getClient = require('../../database-helpers/elasticsearch/get_clients');
const listJobs = require('../../database-helpers/elasticsearch/jobs/list_jobs_by_client_id');
const getCandidatesWithStatus = require('../../database-helpers/elasticsearch/client-candidates/get_candidates_with_status');
const listStages = require('../../database-helpers/elasticsearch/list_stages');
const convertStageToObj = require('./helpers/convert_stages_to_object');
const convertCandidatesToObj = require('./helpers/convert_candidates_to_object');

module.exports = function (request, reply) {

  if( !request.auth.isAuthenticated) {

    return reply.redirect('/client-login');
  }

  getClient(request.auth.credentials.idClient, function (errClient, client) {

    listJobs(request.auth.credentials.idClient, function (errJobs, jobs) {

      jobs.forEach(function (job) {
        job.stagesAllowed = ['1','2', '3'];
      });
      console.log(jobs);
      getCandidatesWithStatus(request.auth.credentials.idClient, function (errCandidates, candidates) {

        const candidateObj = convertCandidatesToObj(candidates);

        listStages(function (errStages, stages) {

          const stagesObj = convertStageToObj(stages);

          const view = {};

          jobs.forEach(function (job) {

            view[job.id] = {
              title: job.title,
              stages: {}
            }

            job.stagesAllowed.forEach(function (stage) {

              view[job.id].stages[stage] = {};
              view[job.id].stages[stage].name = stagesObj[stage].name;
              console.log(view);
              view[job.id].stages[stage].candidates = candidateObj[job.id][stage];

            });
          });
        
          return reply.view('dashboardClient', {client: client, view: view});
        });
      });
    });
  });
}
