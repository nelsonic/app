'use strict';

const updateCandidate = require('../../database-helpers/elasticsearch/delete_list_name_on_candidate');

module.exports = function (request, reply) {

  if( !request.auth.isAuthenticated) {

    return reply({code: 500});
  }

  //update es - remove listNames
  updateCandidate(request.payload.idCandidate, request.payload.listName, function (err, response) {

    return reply({code: 200});
  });
}
