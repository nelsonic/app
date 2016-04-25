'use strict';

const getClient = require('../../database-helpers/elasticsearch/get_clients');
// const getOwners = require('../../database-helpers/elasticsearch/get_owners.js');
const listUsers = require('../../database-helpers/elasticsearch/list_gm_users');
const getJobs = require('../../database-helpers/elasticsearch/list_jobs');
const timestampToDate = require('../../helpers/timestamp-to-date');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getClient(request.params.id, function (errClient, client) {

      listUsers(function (errOwners, users) {

        var accountManagers = users.filter(function(user) {

          return user.idWebsite.toString() === client.accountManager.toString();
        })

        client.accountManagerName = accountManagers[0].names.fullname;

        getJobs(function (errJobs, jobs) {

          var clientJobs = client.jobs.map(function (idJob) {
            var jobFilter = jobs.filter(job => {return job.id === idJob});
            return jobFilter[0];
          });

          client.startFrom = timestampToDate(client.createdAt);
          client.jobs = clientJobs.filter(Boolean);

          var date = new Date(client.createdAt);
          client.startFrom = date.getDate() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();

          return reply.view('clientView', {client: client, owners: users});
        })
      })

    })
  }
}
