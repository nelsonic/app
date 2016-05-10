'use strict';

const Joi = require("joi");

const updateStatus = require('../../database-helpers/elasticsearch/update_status');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    const schema = {
      idClient: Joi.required(),
      idJob: Joi.required(),
      idStage: Joi.required()
    };

    const validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });

    if (validationObject.error) {
      return reply.redirect('/candidate/' + request.payload.idCandidate);
    }

    const status = {
      idCandidate: request.payload.idCandidate,
      idClient: request.payload.idClient,
      idJob: request.payload.idJob,
      idUser: request.auth.credentials.id,
      idStage: request.payload.idStage,
      timestamp: Date.now()
    };

    updateStatus(request.payload.idCandidate, status, function (err, response) {

      return reply.redirect('/candidate/' + request.payload.idCandidate);
    });
  }
}
