'use strict';

var clientES = require('../../es.js');

const compare = function (a,b) {
  if (a.title < b.title)
    return -1;
  else if (a.title > b.title)
    return 1;
  else
    return 0;
}

module.exports = function (callback) {

  var numberJobs = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_JOBS,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      },
      sort: { "dateAdded": {"order": "desc"}}
    }
  }, function getMoreUntilDone(error, response) {

      var result = [];

      response.hits.hits.forEach(function (job) {
        let ownerInitials = job._source.owner.firstName[0].toUpperCase() + job._source.owner.lastName[0].toUpperCase();
        job._source.owner.initials = ownerInitials;
        job._source.id = job._id;
        result.push(job._source);
        numberJobs += 1;
      });

      if (response.hits.total !== numberJobs) {
        clientES.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
          size: 1000,
        }, getMoreUntilDone);
      } else {
        result = result.sort(compare);
        return callback(error, result);
      }

    });
}
