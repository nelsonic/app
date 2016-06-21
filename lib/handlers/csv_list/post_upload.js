'use strict';

/**
* Upload a csv file to an existing list
*/

const createList = require('../../database-helpers/elasticsearch/csv_list/create_list');
const addListToCandidates = require('./helpers/add_list_to_candidates');

module.exports = function (request, reply) {

  /**
  * exists is true if the name of the list already exists in es, otherwise...false
  */
  addListToCandidates(request.payload.csvFile, request.payload.listName, function(){

      return reply.redirect('/csv-list/list')
  });
}
