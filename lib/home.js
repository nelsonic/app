'use strict';

var es = require('./es.js');
var getBlacklistCompanies = require('./helpers/get_blacklist_companies');
var blacklist = require('./helpers/blacklist.js');
var lastEmailDate = require('./helpers/last_email_date.js');
var lastEmail30 = require('./helpers/lastEmail30.js');
const listClients = require('./database-helpers/elasticsearch/list_clients');
const listStages = require('./database-helpers/elasticsearch/list_stages');

exports.register = function (server, options, next) {
  server.route([
  {
    method: 'GET',
    path: '/{page?}',
    config: {
      description: 'return the home page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {

          return reply.redirect('login');

        } else {
          var myId = request.auth.credentials.id;
          var pageNum = request.params.page || 1;
          var perPage = Number(process.env.RESULTS_PER_PAGE);

          if( !Number(request.params.page) && request.params.page !== undefined ) {

             return reply.view('404').code(404);
          }


          if(Number(pageNum) < 1) {

              return reply.redirect('/');
          }

          es.search({
            index: process.env.ES_INDEX,
            type: process.env.ES_TYPE,
            from: (pageNum - 1) * perPage,
            size: perPage,
            _source: ['id', 'picture','fullname', 'current', 'location', 'connectedTo', 'favourite', 'contacts.email', 'headline', 'statusCurrent', 'emails', 'viewedBy'],
            body: {
              query: {
                  match_all: {}
              },
              sort: { "date": {"order": "desc"}}
            }
            }, function (error, response) {
                // $lab:coverage:off$
              if (error) {

                next(error);
              }
              // $lab:coverage:on$
              var results = [];
              response.hits.hits.forEach(function (profile) {
                var contact = {};
                contact.listFavourite = profile._source.favourite;
                contact.favourite = false;

                if(contact.listFavourite.indexOf(myId) !== -1) {
                  contact.favourite = true;
                }

                contact.id = profile._id;
                contact.fullname = profile._source.fullname;
                contact.firstName = contact.fullname.split(' ')[0];
                contact.headline = profile._source.headline;
                contact.current = profile._source.current;
                contact.picture = profile._source.picture;
                contact.location = profile._source.location;
                contact.connectedTo = profile._source.connectedTo || [];
                contact.viewedBy = profile._source.viewedBy || [];

                var emails = profile._source.emails || [];
                contact.emails = emails;
                contact.lastEmail = lastEmailDate(emails);

                //status
                contact.statusCurrent = profile._source.statusCurrent;
                //filter on emails to take out emails that has been sent within last month
                contact.emailLast30 = lastEmail30(contact.emails);

                if (profile._source.contacts.email) {
                  contact.email = profile._source.contacts.email;
                } else {
                  contact.email = '';
                }

                results.push(contact);
              });

              var nbPages = Math.ceil(response.hits.total / perPage);

              if( Number(pageNum) > nbPages ) {
                 return reply.redirect('/');
              }

              var page_url_prev = 1;
              var page_url_next = Math.ceil(response.hits.total / perPage);

              if (pageNum > 1) {
                page_url_prev = '/' + (pageNum - 1);
              }

              if (pageNum < page_url_next) {
                pageNum++;
                page_url_next = '/' + pageNum;
              }
              getBlacklistCompanies(function(error, clientList){
                results.forEach(function(profile) {
                  blacklist(profile, clientList);
                });

                listClients(function (errClients, clients) {

                  listStages(function (errStages, stages) {

                    return reply.view('home',
                      {
                          candidates: results,
                          page_url_prev: page_url_prev,
                          page_url_next: page_url_next,
                          page: request.params.page || 1,
                          pages: nbPages,
                          clients: clients,
                          stages: stages
                    });
                  })
                })
              })
             });
           }
       }
    }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Home'
};
