'use strict';

const listMyClients = require('../../database-helpers/elasticsearch/list_my_clients');
const getUserIdByIdGoogle = require('../../database-helpers/elasticsearch/get_user_by_id_google');
const listJobs = require('../../database-helpers/elasticsearch/list_jobs');
const listStages = require('../../database-helpers/elasticsearch/list_stages');
const createDashObj = require('./helpers/create_my_dashboard_obj');

module.exports = function (request, reply) {

  getUserIdByIdGoogle(request.auth.credentials.id, function (errUser, user) {

    listMyClients(user.id, function (errClients, clients) {

      listJobs(function (errJobs, jobs) {

        const myJobs = jobs.filter(job => job.owner.id === user.id);

        const otherJobs = jobs.filter(job => job.owner.id !== user.id);

        listStages(function (errStages, stages) {

          const dashObj = createDashObj(myJobs,stages);

          return reply.view('gmdasboard', {clients: clients, myJobs: myJobs});
        });
      });
    });
  });
}
