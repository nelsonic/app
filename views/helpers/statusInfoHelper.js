var Handlebars = require('handlebars');
module.exports = function (statusCurrent, clients, jobs) {

  var result = "";

  clients.forEach(function (client) {

    if (statusCurrent.idClient === client.id) {

      result += "<span>" + client.name + " </span>";

    }

  });


  jobs.forEach(function (job) {

    if (statusCurrent.idJob === job.id) {

      result += "<span>" + job.title + " </span>";

    }

  });

  return new Handlebars.SafeString(result);
};
