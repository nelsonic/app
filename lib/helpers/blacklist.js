'use strict'

/*
* Add a property clientProfile to true if the current property of the profile contains a client
* @param {Object} profile - profile of the candidate
* @param {Array} clientList - list of clients
*/

let blacklist = function(profile, clientList) {

  profile.clientProfile = false;
  //lower case the list of companies
  let list = clientList.map(client => {return client.toLowerCase()} );
  if(list.indexOf(profile.current.toLowerCase()) !== -1) {
    profile.clientProfile = true;
  } else {
    list.forEach(function(client) {
      if(profile.current.toLowerCase().indexOf(client) !== -1) {
        profile.clientProfile = true;
      }
    })
  }
  return profile;
}

module.exports = blacklist;
