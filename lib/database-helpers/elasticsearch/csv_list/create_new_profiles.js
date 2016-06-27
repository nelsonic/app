'use strict';

/**
* Index a list of new profiles
* @param {Array} profiles - array of new profiles
* @param {String} listName - the name of the list
* @param {Function} callback - err or response
*/

const completeProfile = require('../../../helpers/complete_profile.js');

const clientES = require('../../../es.js');

module.exports = function (profiles, listName, callback) {

  const bulk = [];

  profiles.forEach(profile => {
    /**
    * Create a candidate object
    */
    let candidate = completeProfile({});
    candidate.fullname = profile.Name;
    candidate.picture = '/assets/img/square-global-m-logo.png';
    candidate.contacts.email = profile.Email;
    candidate.contacts.emailRaw = profile.Email;
    candidate.listNames = [listName];

    /**
    * Add the canidate in the bulk array
    */
    bulk.push({index: {_index: process.env.ES_INDEX, _type: process.env.ES_TYPE }})
    bulk.push(candidate);

  });

  clientES.bulk({body: bulk}, function(error, response){

    return callback(error, response);
  })
}
