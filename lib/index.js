var Authentication = require('./authentication.js');
var Assets = require('./assets.js');
var Api = require('./api.js');
var CandidateView = require('./candidateView.js');
var Connected = require('./connected.js');
var Dashboard = require('./dashboard.js');
var Email = require('./email.js');
var Favourite = require('./favourite');
var Hapi = require('hapi');
var Analytics = require('./analytics.js');
var Candidates = require('./candidates.js');
var Countries = require('./countries.js');
var Clients = require('./clients.js');
var Cv = require('./cv.js');
var Owners = require('./owners.js');
var Home = require('./home.js');
var Handlebars = require('handlebars');
var Jobs = require('./jobs.js');
var Login = require('./login');
var Inert = require('inert');
var Search = require('./search.js');
var Sectors = require('./sector_business.js');
var Query = require('./query.js');
var Vision = require('vision');
var HapiAuthGoogle = require('hapi-auth-google');
var Permission = require('./permission');
var Delete = require('./delete');
var Notes = require('./notes');
var Activities = require('./activities');
var Status = require('./status');
var Info = require('./info');
var Users = require('./users');

exports.init = function (port, next) {

  var server = new Hapi.Server();
  server.connection({port: port});

  var scopes = [
    'https://www.googleapis.com/auth/plus.profile.emails.read',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/gmail.send'
  ];

  var opts = {
    REDIRECT_URL: '/googleauth',
    scope: scopes,
    handler: require('./google_oauth_handler.js')
  };

  var plugins = [
    {register: HapiAuthGoogle, options: opts},
    Authentication,
    Inert,
    Vision,
    Home,
    Analytics,
    CandidateView,
    Connected,
    Cv,
    Dashboard,
    Email,
    Assets,
    Api,
    Candidates,
    Countries,
    Owners,
    Clients,
    Search,
    Sectors,
    Query,
    Jobs,
    Login,
    Permission,
    Favourite,
    Delete,
    Notes,
    Activities,
    Status,
    Info,
    Users
  ];
  server.register(plugins, function (err) {
     // $lab:coverage:off$
    if (err) {
      return next(err);
    }
    // $lab:coverage:on$

    server.views({
      engines: {
        html: Handlebars
      },
      relativeTo: __dirname + '/../views/',
      path: '.',
      layout: 'default',
      layoutPath: 'layout',
      helpersPath: 'helpers',
      partialsPath: 'partials'
    });

    server.start(function (err) {

      return next(err, server);
    });
  });
};
