'use strict';
require('env2')('.env');

var client = require('./elastic.js')(process.env.SEARCHBOX_URL_FIXTURES);
var clientLocal = require('./elastic.js')("http://localhost:9200");

var count = 0;

client.search({

  index: process.env.ES_INDEX_FIXTURES,
  type: process.env.ES_TYPE_STATUS,
  scroll: '30s',
  size: 1000,
  search_type: 'scan'

}, function getMoreUntilDone(error, response) {

  if(error) {
    console.log('error', error);
  }
  var bulk = [];
  response.hits.hits.forEach(function (e) {

    bulk.push({index: {_index: 'gmcontact', _type: process.env.ES_TYPE_STATUS, _id: e._id}})
    bulk.push(e._source);

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
      console.log('Copy status to localhost');
    }

  });
})
