'use strict';

/**
* Index a new list if it doesn't exists in the es
* Add the name of the list to the candidates found
* Create empty profiles for the emails not matching any elasticsearch profiles
*/

const listNameExists = require('../../database-helpers/elasticsearch/csv_list/list_name_exists');
const createList = require('../../database-helpers/elasticsearch/csv_list/create_list');
const addListToCandidates = require('./helpers/add_list_to_candidates');

module.exports = function (request, reply) {

  /**
  * exists is true if the name of the list already exists in es, otherwise...false
  */
  listNameExists(request.payload.listName, function(error, exists) {

    if(exists) {

      return reply.view('csvListForm', {errorMessage: 'Sorry the name of the list already exists', listName: request.payload.listName});

    } else {

      /**
      * Redirect to the list of list if the list name is list. This name is reserved and used on the endpoint csv-list/list!
      */
      if(request.payload.listName === 'list') {
        return reply.view('csvListForm', {errorMessage: 'Sorry "list" is a reserd keyword', listName: request.payload.listName});
      }

      addListToCandidates(request.payload.csvFile, request.payload.listName, function(){

        createList(request.payload.listName, function(error, response){

          return reply.redirect('/csv-list/list')
        });
      });
    }
  });
}
