'use strict';

const clientES = require('../../es.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {
    var clientObj = {};

    clientObj.name = request.payload.name;
    clientObj.logoUrl = request.payload.logoUrl;
    var possibleNames = request.payload.possibleNames.split(',');
    possibleNames = possibleNames.map(name => {return name.trim()});
    possibleNames = possibleNames.filter(Boolean);
    clientObj.possibleNames = possibleNames;

    clientObj.accountManager = request.payload.accountManager;
    clientObj.terms = request.payload.terms;
    clientObj.contactName = request.payload.contactName;
    clientObj.contactEmail = request.payload.contactEmail;
    clientObj.contactPhone = request.payload.contactPhone;
    clientObj.active = (request.payload.active === 'on') ? true : false;
    clientObj.createdAt = parseInt(request.payload.createdAt) || Date.now();

    var paramsES = {
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE_GM_CLIENTS,
    };

    if (request.payload.id) {
      //update
      paramsES.id = request.payload.id;
      paramsES.body = {doc: clientObj};

      //update keep the property jobs
      clientES.update(paramsES, function(errorUpdate, responseUpdate) {
        return reply.redirect('/clients/list');
      })
    } else {

      clientObj.jobs = [];
      paramsES.body = clientObj;

      clientES.index(paramsES, function (err, response) {
        return reply.redirect('/clients/list');
      });

    }


  }
}
