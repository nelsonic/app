'use strict';

module.exports = function (jobs) {

  let obj = {};

  jobs.forEach(job => {

    let jobDetail = {};
    jobDetail.title = job.title;
    obj[job.id] = jobDetail;
  })
  // console.log(obj);
  return obj;
}
