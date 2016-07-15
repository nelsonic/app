'use strict';

/**
* Return a date format, e.g 6.06.2016
* @param {Number} timestamp - e.g 1468577549327
*/

const timestampToDate = function (timestamp) {

  const date = new Date(timestamp);
  return date.getDate() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
}

module.exports = timestampToDate
