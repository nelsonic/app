'use strict';

/**
* Return all the list
*/

const getAllList = require('../../database-helpers/elasticsearch/csv_list/get_all_list');

const compare = function (listA, listB) {
  if (listA.listName < listB.listName)
    return -1;
  else if (listA.listName > listB.listName)
    return 1;
  else
    return 0;
}

module.exports = function (request, reply) {

  getAllList(function(error, lists){

    const sortedLists = lists.sort(compare);

    return reply.view('csvList', {lists: sortedLists})
  })

}
