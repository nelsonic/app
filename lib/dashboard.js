var es = require('./es.js');
exports.register = function (server, option, next) {

  server.route({
    method: 'GET',
    path: '/dashboard',
    config: {
      description: 'return user dashboard page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        } else {
          var id = (request.auth.credentials.id).toString();
          es.search({
            index: process.env.ES_INDEX,
            type: process.env.ES_TYPE,
            body: {
              query: {
                match:{
                  "notes.id": id
                }
              }
            }
          }, function (error, response) {
               // $lab:coverage:off$
              if (error) {
                next(error);
              }
              // $lab:coverage:on$

              var submitted = [];
              var phone_screen = [];
              var interview = [];
              var placement = [];

              response.hits.hits.forEach(function (profile) {
                var userProfile = profile._source;
                userProfile.id = profile._id;

                var note = userProfile.notes[userProfile.notes.length-1];

                if (note.id === id) {
                  if (note.status == 'submitted') {
                    submitted.push(userProfile);
                  }

                  if (note.status == 'phone-screen') {
                    phone_screen.push(userProfile);
                  }

                  if (note.status == 'interview') {
                    interview.push(userProfile);
                  }

                  if (note.status == 'placement') {
                    placement.push(userProfile);
                  }
                }
                userProfile.currentStatus = note.status;
              });
          
              return reply.view('dashboard', {
                user: JSON.parse(process.env.MAP_ID_USER)[id],
                submitted: submitted,
                phone_screen: phone_screen,
                interview: interview,
                placement: placement
              });

            });

        }
      }
    }
  });

  return next();
}

exports.register.attributes = {
  name: 'Dashboard'
};
