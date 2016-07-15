'use strict';

/**
* Return a list of jobs (Array of objects), sorted alphabetically
* @param {Function} callback - callback with error and the result (list of jobs)
* Example:
[ { id: '4',
    client: '1',
    title: 'Node.js Developer',
    active: true,
    stagesAllowed: [ '1', '2', '3', '4' ],
    description: '<h1>Greate opportunity!</h1><p>This job is very cool!</p>',
    startDate: 1456840872712,
    dateAdded: 1456840872712,
    dateEnd: 1456840872712,
    skillList: 'node.js, html5, react',
    address: { city: 'London', countryID: '2188' },
    categories: { total: 1, data: [Object] },
    businessSectors: { total: 1, data: [Object] },
    customText1: 'Senior',
    customText2: 'UK & Ireland',
    customText3: 'Great Job',
    customText5: 'Very cool job',
    customText6: 'http://global-m.co.uk/wp-content/uploads/2016/01/Fireworks-Atlantis-Hotel-Dubai.jpg',
    customText7: 'Node.js!!',
    customText8: 'http://global-m.co.uk/wp-content/uploads/2016/01/tech-team-opportunities.jpg',
    customText11: 'http://global-m.co.uk/wp-content/uploads/2016/01/IT-jobs-Middle-East.jpg',
    customTextBlock1: 'Fancy a new job with Node.js',
    customTextBlock2: 'London is great',
    salary: '50000',
    payRate: '0',
    customText12: 'GBP',
    owner: { id: '2', firstName: 'Nick', lastName: 'Waller', initials: 'NW' },
    source: '',
    employmentType: 'Permanent' }
]
*/

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
    type: process.env.ES_TYPE_GM_JOBS,
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
