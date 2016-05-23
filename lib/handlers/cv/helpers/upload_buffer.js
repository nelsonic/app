'use strict';

/**
* Create a file on a Google Drive folder from a buffer
*/

const Google       = require('googleapis');
const OAuth2       = Google.auth.OAuth2;
const Oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

const tokens = {
  access_token: process.env.CV_ACCESS_TOKEN,
  token_type: process.env.CV_TOKEN_TYPE,
  id_token: process.env.CV_ID_TOKEN,
  refresh_token: process.env.CV_REFRESH_TOKEN,
  expiry_date: process.env.CV_EXPIRY_DATE
};

Oauth2Client.setCredentials(tokens);
const Drive = Google.drive({ version: 'v3', auth: Oauth2Client });
const SaveCVError = require('../../../database-helpers/elasticsearch/save-cv-error');
const UpdateCVLink = require('../../../database-helpers/elasticsearch/update-cv-link');

module.exports = function (binary, fileName, idCandidate, next) {

  const params = {
    uploadType: "media",
    media: {
      body: binary,
    },
    resource: {
      name: fileName,
      description: idCandidate,
      parents: [process.env.FOLDER_ID]
    }
  };

  const extension = fileName.split('.')[1];

  const typeMime = {
    csv:   "text/csv",
   	html:  "text/html",
   	text:  "text/plain",
    txt:   "text/plain",
    gif:   "image/gif",
    png:   "image/png",
    svg:   "image/svg+xml",
    jpeg:  "image/jpeg",
    jpg:   "image/jpeg",
    odt:   "application/vnd.oasis.opendocument.text",
    rtf:   "application/rtf",
    pdf:   "application/pdf",
    docx:  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    doc:   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    pptx:  "application/vnd.openxmlformats-officedocument.wordprocessingml.presentation",
    ppt:   "application/vnd.openxmlformats-officedocument.wordprocessingml.presentation",
    xls:   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xlsx:  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  }

  if ( extension && typeMime[extension] ) {

    params.resource.mimeType = typeMime[extension];
  }

  Drive.files.create(params, function(error, response) {

    //error during the upload of a file (the response is null or empty)
    if(!Boolean(response)) {
      console.log('Error when uploading cv', error);
      const errorPayload = {
        timestamp: Date.now(),
        candidateID: idCandidate,
        fileContent: binary.toString()
      }

      SaveCVError(errorPayload, function(errorSaveCv, responseSaveCv){
        console.log('save in error data base cv');
        return next(500);
      })

    } else {
      const documentLink = 'https://drive.google.com/file/d/' + response.id;
      UpdateCVLink(idCandidate, documentLink, function(errorUpdateCV, responseUpdateCV) {
        console.log('response upload', response);
        return next(response.id);
      })
    }
  });
}
