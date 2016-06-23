'use strict';

/**
* Check for the properties Email and Name
*/

module.exports = function(json) {

  let result = true;
  json.forEach(profile => {

    if(!profile.Email || !profile.Name) {
      result = false;
    }
  });

  return result;
}
