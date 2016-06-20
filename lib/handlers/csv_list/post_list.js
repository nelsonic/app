'use strict';

/**
* Index a new list if it doesn't exists in the es
* Add the name of the list to the candidates found
* Create empty profiles for the emails not matching any elasticsearch profiles
*/

const listNameExists = require('../../database-helpers/elasticsearch/csv_list/list_name_exists');
const createList = require('../../database-helpers/elasticsearch/csv_list/create_list');
const csvToJson = require('./helpers/csv_to_json');
const getCandidatesByEmails = require('../../database-helpers/elasticsearch/csv_list/get_candidates_by_emails');
const createNewProfiles = require('../../database-helpers/elasticsearch/csv_list/create_new_profiles');
const updateCandidateListNames = require('../../database-helpers/elasticsearch/csv_list/update_candidate_listNames')

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
      csvToJson(request.payload.csvFile, function(csvJson){

        let emails = csvJson.map(csvRow => {
          return csvRow.Email
        });

        //filter the empty emails
        emails = emails.filter(Boolean);

        getCandidatesByEmails(emails, function(error, candidates){

          const candidateEmails = candidates.map( candidate => {
            return candidate.email;
          });

          /**
          * List of profiles not found in Elasticsaerch
          */
          const newProfiles = csvJson.filter(profile => {
            return candidateEmails.indexOf(profile.Email) === -1;
          });

          /**
          * Create new profiles with listNames containing the listName created
          */
          createNewProfiles(newProfiles, request.payload.listName, function(errorNewProfile, responseNewProfiles) {

            /**
            * Filter the candidates where the listName is not already define
            */
            const candidateUpdates = candidates.filter(candidate => {

              return candidate.listNames.indexOf(request.payload.listName) === -1
            })

            /**
            * Add the listName to the candidates found
            */
            updateCandidateListNames(candidateUpdates, request.payload.listName, function(errorUpdate, responseUpdate){

              createList(request.payload.listName, function(error, response){

                return reply.redirect('/csv-list/list')
              })
            })

          })

        })
      })
    }
  })
}
