'use strict'

/**
* Define two routes to create a cv for a particular candidate
* - /cv/create is used when a candidate upload directly her cv from the website
* - /cv/upload is used by a user of the app to attach a cv to a candidate
*/

const postCreate = require('./handlers/cv/post_create');
const uploadCv = require('./handlers/cv/upload_cv');

exports.register = function (server, option, next) {

  server.route(
    [
      {
        method: 'POST',
        path: '/cv/create',
        config: {
          description: 'Save the cv for a specific candidate',
          auth: {
            mode: 'try',
            strategy: 'jwt'
          },
          handler: postCreate
        }
      },
      {
        method: 'POST',
        path: '/cv/upload',
        config: {
          description: 'upload a cv',
          auth: {
            mode: 'try',
            strategy: 'jwt'
          },
          payload: {
             output: 'stream',
             parse: true,
             allow: 'multipart/form-data'
         },
          handler: uploadCv
        }
      }
    ]
  );
  return next();
}

exports.register.attributes = {
  name: 'Cv'
}
