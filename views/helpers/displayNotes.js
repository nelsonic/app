'use strict';

const Handlebars = require('handlebars');
module.exports = function (note, users) {

  note.note = Handlebars.Utils.escapeExpression(note.note);
  const author = users.filter( user => {
    return user.idGoogle.toString() === note.idUser.toString()
  });
  note.author = author[0].names.firstname;

  const date = new Date(parseInt(note.timestamp));
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day  = date.getDate().toString();
  // $lab:coverage:off$
  note.createdAt =  (day[1] ? day : "0" + day[0]) + '-' + (month[1] ? month:"0" + month[0]) + '-' +  year;
  // $lab:coverage:on$

  let results = "<p>" + "<strong>" + note.createdAt + " " + note.author + " " + "</strong>";
  results += "<br>" + note.note + "</p>";
  return new Handlebars.SafeString(results);

};
