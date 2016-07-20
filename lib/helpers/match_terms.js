'use strict';

/**
* Return number of results
* @param {String} query e.g Js dev
* @param {String} field - ES field e.g: fullname, headline, location, current
*/

module.exports = function(query, field) {
  var result = 0;
  var termsSearched = new Set();
  var terms = query.split(' ');
  //replace all commas by an empty string (london, become london) and split to get all the words
  var fields = field.replace(/,/g, '').split(' ');

  terms = terms.map(function(w){
    return w.toLowerCase();
  });

  fields = fields.map(function(w){
    return w.toLowerCase();
  });

  //only search the term once
  terms.forEach(function(term) {
    //we check that we haven't already search for the term, that's why we use a set
    if(term !== '' && fields.indexOf(term) !== -1 && !termsSearched.has(term)) {
      result += 1;
      termsSearched.add(term);
    }
  });
  
  return result;
}
