'use strict';

/**
* Download the list of candidates who belongs to specific list
*/
const json2csv = require('json2csv');
const listCandidates = require('../../database-helpers/elasticsearch/csv_list/list_candidates_with_label_list')

module.exports = function (request, reply) {

  var filename = request.payload.listName;

  //get the list of candidates for the specific list
  listCandidates(request.payload.listName, function (err, candidates) {

    json2csv({ data: candidates }, function(err, csv) {

      if (err) {
        console.log(err);
      }

      reply(csv)
        .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .header('Content-Disposition', 'attachment; filename="'+ filename +'.csv"');
    });
  });
}
