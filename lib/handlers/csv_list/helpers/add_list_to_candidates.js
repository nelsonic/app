'use strict';

/**
* Add the list to the candidates
* Create new candidates if they don't exist in ES
*/

const csvToJson = require('./csv_to_json');
const getCandidatesByEmails = require('../../../database-helpers/elasticsearch/csv_list/get_candidates_by_emails');
const createNewProfiles = require('../../../database-helpers/elasticsearch/csv_list/create_new_profiles');
const updateCandidateListNames = require('../../../database-helpers/elasticsearch/csv_list/update_candidate_listNames');

module.exports = function( csvFile, listName, next) {

  /**
  * Parse the csv file to an array of emails
  */
  csvToJson(csvFile, function(csvJson){

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
      * Create new profiles with listNames property containing the listName created
      */
      createNewProfiles(newProfiles, listName, function(errorNewProfile, responseNewProfiles) {

        /**
        * Filter the candidates where the listName is not already define
        */
        const candidateUpdates = candidates.filter(candidate => {

          return candidate.listNames.indexOf(listName) === -1
        })

        /**
        * Add the listName to the candidates found
        */
        updateCandidateListNames(candidateUpdates, listName, function(errorUpdate, responseUpdate){

          return next();
        });
      });
    });
  });
}
