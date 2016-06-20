'use strict';

const clientES = require('../../es.js');
const completeProfile = require('../../helpers/complete_profile.js');
const createCandidate = require('../../database-helpers/elasticsearch/create_candidate.js');
const existProfile = require('../../database-helpers/elasticsearch/exist_url.js');
const updateCandidteWebsite = require('../../database-helpers/elasticsearch/update_candidate_website.js');
const linkedinCanonical = require('linkedin-canonical-url');

module.exports = function (request, reply) {

  var url = linkedinCanonical(request.payload.linkedInURL);

  existProfile(url, function (err, idProfile) {

    if (idProfile) {

      updateCandidteWebsite(idProfile, request.payload, function (errUpdate, resUpdate) {

        return reply(resUpdate);
      })

    } else {

      var profile = completeProfile({});
      profile.fullname = request.payload.name;
      profile.picture = '/assets/img/square-global-m-logo.png';
      profile.contacts.email = request.payload.email;
      profile.contacts.emailRaw = request.payload.email;
      profile.contacts.phone = request.payload.phone;
      profile.url = linkedinCanonical(request.payload.linkedInURL);

      profile.jobApplications = [];
      var application = {};
      application.comments = request.payload.comments;
      application.skillset = request.payload.skillset;
      application.jobID = request.payload.jobID;
      application.timestamp = Date.now();
      profile.jobApplications.push(application);

      createCandidate(profile, function (err, response) {
        // $lab:coverage:off$
        if (err) {
          console.log(err)
        }
         // $lab:coverage:on$
        return reply(response);
      })
    }

  });


}
