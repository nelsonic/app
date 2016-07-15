'use strict';

const clientES = require('../../es.js');

/**
* Return a list of countries
* Example: 
[ { value: 2188, label: 'Andorra' } ]
*/

module.exports = function (request, reply) {

  var numberCountries = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_COUNTRIES,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      },
      sort: { "label": {"order": "asc"}}
    }
  }, function getMoreUntilDone(error, response) {
    var result = [];

    response.hits.hits.forEach(function (country) {
      result.push(country._source);
      numberCountries += 1;
    });

    if (response.hits.total !== numberCountries) {
      clientES.scroll({
        scrollId: response._scroll_id,
        scroll: '30s',
        size: 1000,
      }, getMoreUntilDone);
    } else {

      return reply(result);
    }
  });
}
