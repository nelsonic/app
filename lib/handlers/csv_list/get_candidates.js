'use strict';

const listCandidates = require('../../database-helpers/elasticsearch/csv_list/full_list_candidates');

module.exports = function (request, reply) {

  listCandidates(request.params.param, function (err, candidates) {

    reply.view('home', {candidates: candidates});
  });
}
