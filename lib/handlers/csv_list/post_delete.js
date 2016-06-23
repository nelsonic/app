'use strict';

/**
* Delete the list
*/

const deleteListCandidates = require('../../database-helpers/elasticsearch/csv_list/delete_list_candidates');
const deleteListCsv = require('../../database-helpers/elasticsearch/csv_list/delete_list_csv')

module.exports = function(request, reply) {

  /*
  * Delete the listName from the listNames properties of the candiates
  */
  deleteListCandidates(request.payload.listName, function(errorDelete, responseDelete) {

    /*
    * Delete the list name from the type csv-list
    */
    deleteListCsv(request.payload.listId, function(errorDeleteList, responseDeleteList){

      return reply.redirect('/csv-list/list');
    });

  });
}
