'use strict';

/**
* update listNames of a list of candidates
* @param {Array} profiles - array of new profiles
* @param {String} listName - the name of the list
* @param {Function} callback - err or response
*/


const clientES = require('../../../es.js');

module.exports = function (profiles, listName, callback) {

  const bulk = [];

  profiles.forEach(profile => {

    let listNamesUpdate = profile.listNames;
    listNamesUpdate.push(listName);
    bulk.push({update: {_index: process.env.ES_INDEX, _type: process.env.ES_TYPE, _id: profile.id }})
    bulk.push({doc: {listNames: listNamesUpdate}});

  });

  if(bulk.length > 0){
    clientES.bulk({body: bulk}, function(error, response){

      return callback(error, response);
    })
  } else {

    return callback(null, 'empty bulk');
  }

}
