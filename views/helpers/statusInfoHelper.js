var Handlebars = require('handlebars');
module.exports = function (statusHistory, clients, jobs) {

  var result = "";

  clients.forEach(function (obj) {

    if (statusHistory.idClient === obj.id) {

      result += "<span>" + obj.name + " </span>";

    }

  });

  
  jobs.forEach(function (obj) {

    if (statusHistory.idClient === obj.client) {

      result += "<span>" + obj.title + " </span>";

    }

  });

  return new Handlebars.SafeString(result);
};
