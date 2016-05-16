'use strict';

module.exports = function (jobs) {
  
  let obj = {};

  jobs.forEach(job => {

    let jobDetail = {};
    jobDetail.title = job.title;
    jobDetail.salary = job.salary;
    // jobDetail.address.city = job.address.city;
    obj[job.id] = jobDetail;
  })
  return obj;
}
