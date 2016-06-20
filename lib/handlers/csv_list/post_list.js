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
          return csvRow.email
        });

        //filter the empty emails
        emails = emails.filter(Boolean);

        //find candidates + update candidates to the list
        getCandidatesByEmails(emails, function(error, candidates){


          const candidateEmails = candidates.map( candidate => {
            return candidate.email;
          });

          /**
          * List of profiles not found in Elasticsaerch
          */
          const newProfile = csvJson.filter(profile => {
            return candidateEmails.indexOf(profile.email) === -1;
          });

          // createNewProfiles(newProfile)

          console.log('candidate found',candidates.length);

          console.log('csv profile length', csvJson.length);
          console.log('new profile length',newProfile.length);
          return reply('ok')
          //
          // createList(request.payload, function(error, response){
          //
          //   // console.log(emails);
          //   return reply.redirect('/csv-list/list')
          // })

        })
      })
    }
  })
}
