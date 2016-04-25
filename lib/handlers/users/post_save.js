'use strict';

const clientES = require('../../es.js');
const updateES = require('../../database-helpers/elasticsearch/update_user');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    if (request.payload.idGoogle) {
      //update
      const userObj = {};
      userObj.idGoogle = parseInt(request.payload.idGoogle);
      userObj.names = {
        fullname: request.payload.fullname
      }
      userObj.linkedin = request.payload.linkedin;

      console.log(userObj);
      console.log(request.payload.idGoogle);
      updateES(request.payload.idGoogle, userObj, function (errUpdate, responseUpdate) {
        console.log(errUpdate);
        console.log(responseUpdate);
        return reply.redirect('/users/list');
      })
    } else {
      //save

    }
  }
};
