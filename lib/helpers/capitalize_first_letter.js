'use strict';

/**
* Return a string with the capitalize first letter
* @param {String} string
*/

module.exports = function (string) {

  return string.charAt(0).toUpperCase() + string.slice(1);
}
