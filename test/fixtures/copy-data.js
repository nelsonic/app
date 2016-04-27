'use strict';
require('env2')('.env');

var client = require('./elastic.js')(process.env.SEARCHBOX_URL_FIXTURES);
var clientLocal = require('./elastic.js')("http://localhost:9200");

var count = 0;

client.search({

  index: process.env.ES_INDEX_FIXTURES,
  type: process.env.ES_TYPE_CURRENT_USERS,
  scroll: '30s',
  size: 1000,
  search_type: 'scan'

}, function getMoreUntilDone(error, response) {

  if(error) {
    console.log('error', error);
  }
  var bulk = [];
  response.hits.hits.forEach(function (e) {
    // console.log(e._source);
    if (e._source.names) {
      var newData = {
        email: e._source.email,
        idGoogle: e._id,
        image: '',
        idWebsite: e._id,
        names: {
          firstname: e._source.names.firstname,
          fullname: e._source.names.fullname,
          lastname: e._source.names.lastname,
          linkedinName: e._source.names.linkedinName
        },
        phones: {
          office: e._source.phones.office,
          mobile: e._source.phones.mobile
        },
        role: e._source.role,
        linkedin: e._source.linkedin,
        active: true,
        admin: true
      };
    
      bulk.push({index: {_index: 'gmcontact', _type: process.env.ES_TYPE_GM_USERS, _id: e._id}})
      bulk.push(newData);
    }

    count += 1;
  })

  clientLocal.bulk({ body: bulk}, function (err, resp) {
    if (response.hits.total !== count) {
    // now we can call scroll over and over
      client.scroll({
        scrollId: response._scroll_id,
        scroll: '30s'
      }, getMoreUntilDone);
    } else {
      console.log('Copy users to localhost');
    }

  });
})
