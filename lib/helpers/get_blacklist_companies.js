'use strict';

const clientES = require('../es.js');

/**
* Return list of companies
* @param {Function} next - function with err (null) and the list of companies
* Example of result: ['Founders And Coders', 'FacTest']
*/

const getBlacklistCompanies = function (next) {

  var numberClients = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_GM_CLIENTS,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      },
    }
  }, function getMoreUntilDone(error, response) {
    var result = [];

    response.hits.hits.forEach(function (client) {

      if (client._source.active) {

        let companyNames = client._source.possibleNames;
        companyNames.push(client._source.name);

        result = result.concat(companyNames);
      }

      numberClients += 1;
    });

    if (response.hits.total !== numberClients) {
      clientES.scroll({
        scrollId: response._scroll_id,
        scroll: '30s',
        size: 1000,
      }, getMoreUntilDone);
    } else {
    ;
      return next(null, result);
    }
  });
}

module.exports = getBlacklistCompanies
