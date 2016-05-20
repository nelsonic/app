'use strict';

/**
* Upload the file to Google Drive and update the property cv of the candidate
* the payload from the form is {id: theIdOfTheCandidate, select-cv: BufferOfTheCv}
*/


const clientES     = require('../../es.js');
const Google       = require('googleapis');
const OAuth2       = Google.auth.OAuth2;
const Oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

module.exports = function (request, reply) {

  console.log(request.payload);
  return reply('upload cv!')
}
