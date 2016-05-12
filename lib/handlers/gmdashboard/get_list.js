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
const filterJobs = require('./helpers/filter_jobs');
const filterStages = require('./helpers/filter_stages');
const listGmUsers = require('../../database-helpers/elasticsearch/list_gm_users');
const getStatus = require('./helpers/get_status');

module.exports = function (request, reply) {

  getStatus(request.auth.credentials.id, status => {

    return reply.view('gmdasboard', status);
  });

}
