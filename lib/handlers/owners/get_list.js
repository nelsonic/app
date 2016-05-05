'use strict';

const clientES = require('../../es.js');
const listOwners = require('../../database-helpers/elasticsearch/list_owners');

module.exports = function (request, reply) {

  listOwners(function(owners) {
    return reply(owners);
  });

}
