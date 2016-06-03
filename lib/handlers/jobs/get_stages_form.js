'use strict';

const getJob = require('../../database-helpers/elasticsearch/get_jobs');
const listStages = require('../../database-helpers/elasticsearch/list_stages');
const listCandidates = require('../../database-helpers/elasticsearch/list_candidates_status_job');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/client-login');
  }

  getJob(request.params.id, function (errJob, job) {

    listStages(function (errStages, listStages) {

      var res = {};

      res.job = job.title;
      res.stages = {};
      listStages.forEach(function (stage) {
        res.stages[stage.id] =
        {
          name: stage.name,
          candidates: 0
        };

      });

      //define allowed property depending on existing idStage in job.allowedStages
      for (var id in res.stages) {
        job.allowedStages.indexOf(id) > -1 ? res.stages[id].allowed = true : res.stages[id].allowed = false;
      }

      listCandidates(request.params.id, function (errCandidates, candidates) {

        for (var prop in res.stages) {

        	candidates.forEach(function (candidate) {

        		candidate.statusCurrent.forEach(function (stageObj) {

        			if (stageObj.idStage === prop) {

        				res.stages[prop].candidates +=1;
        			}

        		});
        	});

        }
        return reply.view('jobFormStages', res);
      });
    });
  });
}
