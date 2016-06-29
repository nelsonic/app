'use strict';

/*
* Return Array of 4 objects - skills; sorted by the level and by search query, the last three skills
* are display by highest level
* Example - search query: css (first one), last three sorted by the level highest number:
[ { level: 9, skill: 'css' },
  { level: 42, skill: 'javascript' },
  { level: 29, skill: 'Smart' },
  { level: 10, skill: 'Service' } ]

* @param {Array} searchedSkills - searched skill e.g ['css']
* @param {Array} candidateObj.skills - property skills on candidate
* Example of the candidateObj.skills
  [ { level: 10, skill: 'JS' },
    { level: 9, skill: 'Css' }
  ]
*/

var intersection = require('./intersection.js');
var union = require('./union.js');
var sortByLevel = require('./sort_by_level_skill.js');

module.exports = function (searchedSkills, candidateObj) {

  var intersectionSkills = intersection(searchedSkills, candidateObj);
  var sortedSkills = sortByLevel(candidateObj);

  return union(intersectionSkills, sortedSkills).slice(0,4);
};
