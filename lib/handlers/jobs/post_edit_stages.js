'use strict';

const updateAllowedStages = require('../../database-helpers/elasticsearch/jobs/update_job_with_allowedStages');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/client-login');
  }

  var stages = [];

  if (typeof request.payload.stages === "string") {

    stages = [request.payload.stages];
  }

  stages = request.payload.stages ? request.payload.stages : [];

  updateAllowedStages(request.payload.jobId, stages, function (err, response) {

    return reply.redirect(`/jobs/${request.payload.jobId}/stages`);
  });
}
