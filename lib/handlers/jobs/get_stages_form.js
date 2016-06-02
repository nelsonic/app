'use strict';

const getJob = require('../../database-helpers/elasticsearch/get_jobs');
const listStages = require('../../database-helpers/elasticsearch/list_stages');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/client-login');
  }

  getJob(request.params.id, function (errJob, job) {

    listStages(function (errStages, listStages) {

      var stages = {};
      listStages.forEach(stage => {
        stages[stage.id] = {};
        stages[stage.id].name = stage.name;
        stages[stage.id].allowed = job.stagesAllowed.indexOf(stage.id.toString()) > -1 ? true : false;
      });

      return reply.view('jobFormStages', {stages: stages, job: job});
    });
  });
}
