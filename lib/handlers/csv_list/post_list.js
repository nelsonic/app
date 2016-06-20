'use strict';

/**
* Index a new list if it doesn't exists in the es
* Add the name of the list to the candidates found
* Create empty profiles for the emails not matching any elasticsearch profiles
*/

const listNameExists = require('../../database-helpers/elasticsearch/csv_list/list_name_exists');
const createList = require('../../database-helpers/elasticsearch/csv_list/create_list');
const csvToEmails = require('./helpers/csv_to_emails');
const getCandidatesByEmails = require('../../database-helpers/elasticsearch/csv_list/get_candidates_by_emails');

module.exports = function (request, reply) {

  /**
  * exists is true if the name of the list already exists in es, otherwise it is false
  */
  listNameExists(request.payload.listName, function(error, exists) {

    if(exists) {

      return reply.view('csvListForm', {errorMessage: 'Sorry the name of the list already exists'});
    } else {

      /**
      * Parse the csv file to an array of emails
      */
      csvToEmails(request.payload.csvFile, function(emails){

        //find candidates + update candidates to the list
        getCandidatesByEmails(emails, function(error, candidates){

          console.log(candidates);

          createList(request.payload, function(error, response){

            // console.log(emails);
            return reply.redirect('/csv-list/list')
          })

        })
      })
    }
  })
}
