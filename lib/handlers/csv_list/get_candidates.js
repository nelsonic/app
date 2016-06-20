'use strict';

const listCandidates = require('../../database-helpers/elasticsearch/csv_list/list_candidates_with_label_list');

module.exports = function (request, reply) {

  // listCandidates(request.params.param, function (err, candidates) {

    // reply.view('home', {candidates: candidates});
    reply(request.params.param);
  // });
}
