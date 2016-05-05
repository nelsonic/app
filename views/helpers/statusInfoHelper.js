var Handlebars = require('handlebars');
module.exports = function (statusCurrent, clients, jobs) {

  var result = "";

  clients.forEach(function (obj) {

    if (statusCurrent.idClient === obj.id) {

      result += "<span>" + obj.name + " </span>";

    }

  });


  jobs.forEach(function (obj) {

    if (statusCurrent.idClient === obj.client) {

      result += "<span>" + obj.title + " </span>";

    }

  });

  return new Handlebars.SafeString(result);
};
