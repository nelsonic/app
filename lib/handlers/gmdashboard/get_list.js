'use strict';

const listMyClients = require('../../database-helpers/elasticsearch/list_my_clients');
const getUserIdByIdGoogle = require('../../database-helpers/elasticsearch/get_user_by_id_google');
const listJobs = require('../../database-helpers/elasticsearch/list_jobs');
const listStages = require('../../database-helpers/elasticsearch/list_stages');
const createDashObj = require('./helpers/create_my_dashboard_obj');
const getCandidatesWithStatus = require('../../database-helpers/elasticsearch/get_candidates_with_status');
const linkCandidatesToJobs = require('./helpers/link_candidates_to_job');
const linkMyStatusToJob = require('./helpers/link_my_status_to_job');
const jobsToObject = require('./helpers/jobs_to_object');
const stagesToObject = require('./helpers/stages_to_object');

module.exports = function (request, reply) {

  getUserIdByIdGoogle(request.auth.credentials.id, function (errUser, me) {

    listMyClients(me.id, function (errClients, clients) {

      listJobs(function (errJobs, jobs) {

        const myJobs = jobs.filter(job => job.owner.id === me.id);
        const otherJobs = jobs.filter(job => job.owner.id !== me.id);
        const jobsDetail = jobsToObject(jobs);

        listStages(function (errStages, stages) {

          const stagesDetail = stagesToObject(stages);

          getCandidatesWithStatus( function(err, candidates) {

            const myjobsObject = createDashObj(myJobs,stages);
            const otherJobsObject = createDashObj(otherJobs, stages);

            linkCandidatesToJobs(candidates, myjobsObject);
            linkMyStatusToJob(candidates, otherJobsObject, me.idGoogle);

          return reply.view('gmdasboard', {
            admin: me.admin,
            clients: clients,
            myJobs: myjobsObject,
            otherJobs: otherJobsObject,
            jobsDetail: jobsDetail,
            stagesDetail: stagesDetail
           });
          })
        });
      });
    });
  });
}
