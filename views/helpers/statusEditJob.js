var Handlebars = require('handlebars');
module.exports = function (jobs, idJob) {

  var result = "<option value="+ jobs.id +">" + jobs.title + "</option>";

  if (jobs.id === idJob) {
     result = "<option selected value="+ jobs.id +">" + jobs.title + "</option>";
  }

  return new Handlebars.SafeString(result);
};
