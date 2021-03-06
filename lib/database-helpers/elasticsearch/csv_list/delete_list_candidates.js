'use strict';

const clientES = require('../../../es.js');

/**
* Delete the listName from the listNames properties of each candidates
* @param {String} listName
* @param {Function} callback - function with error and the list of candidates
*/

module.exports = function (listName, callback) {

  var numberCandidates = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    _source: ['listNames'],
    body: {
      query: {
        term: {
          "listNames": listName
        }
      }
    }
  }, function getMoreUntilDone(error, response) {

    var result = [];

    response.hits.hits.forEach(function (candidate) {

      candidate._source.id = candidate._id;
      result.push(candidate._source);
      numberCandidates += 1;
    });

    if (response.hits.total !== numberCandidates) {
      clientES.scroll({
        scrollId: response._scroll_id,
        scroll: '30s',
        size: 1000,
      }, getMoreUntilDone);
    } else {

      //result contains all the candidates having the list name in listNameExists
      //[{id: -, listNames: -},... ]

      const bulk = [];

      result.forEach(profile => {

        //delete the name of the list from the array listNames

        let listNamesUpdate = profile.listNames.filter(name => {

          return name !== listName;
        });

        bulk.push({update: {_index: process.env.ES_INDEX, _type: process.env.ES_TYPE, _id: profile.id }})
        bulk.push({doc: {listNames: listNamesUpdate}});

      });

      clientES.bulk({body: bulk}, function(errorBulk, responseBulk){

        return callback(error, result);
      });
    }
  });
}
