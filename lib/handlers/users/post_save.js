'use strict';

const clientES = require('../../es.js');
const updateES = require('../../database-helpers/elasticsearch/update_user');
const saveES = require('../../database-helpers/elasticsearch/save_user');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    const userObj = {
      names: {
        fullname: request.payload.fullname,
        firstname: request.payload.firstname,
        lastname: request.payload.lastname,
        linkedinName: request.payload.linkedinName
      },
      linkedin: request.payload.linkedin,
      phones: {
        office: request.payload.office,
        mobile: request.payload.mobile
      },
      email: request.payload.email,
      role: request.payload.role,
      active: (request.payload.active === 'on') ? true : false
    };

    if (request.payload.id) {
      //update

      updateES(request.payload.id, userObj, function (errUpdate, responseUpdate) {
        return reply.redirect('/users/list');
      });

    } else {
      //save
      saveES(userObj, function (errSave, responseSave) {
        return reply.redirect('/users/list');
      });
    }
  }
};
