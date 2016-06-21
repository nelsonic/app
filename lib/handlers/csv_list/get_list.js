'use strict';

/**
* Return all the list
*/

const getAllList = require('../../database-helpers/elasticsearch/csv_list/get_all_list');
const compare = require('./helpers/compare.js');

module.exports = function (request, reply) {

  getAllList(function(error, lists){

    const sortedLists = lists.sort(compare);

    return reply.view('csvList', {lists: sortedLists})
  })

}
