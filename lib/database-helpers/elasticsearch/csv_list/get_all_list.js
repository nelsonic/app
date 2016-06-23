'use strict';

/**
* Seach for all the lists
* @param {Function} callback - function with error and the list of client users
*/

const clientES = require('../../../es.js');

module.exports = (callback) => {

  let numberList = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_CSV_LIST,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      }
    }
  }, function getMoreUntilDone(error, response) {

      var result = [];

      response.hits.hits.forEach((listObject) => {
        const list = listObject._source;
        list.id = listObject._id;
        result.push(list);
        numberList += 1;
      });

      if (response.hits.total !== numberList) {
        clientES.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
          size: 1000,
        }, getMoreUntilDone);
      } else {

        return callback(error, result);
      }
    });
}
