'use strict';

module.exports = function (stages, idJob, jobsDetail, stagesDetail) {
  let job = jobsDetail[idJob];
  let result = "";
  let data = false
  for(let idStage in stages) {
    if(stages[idStage].length > 0) {
      data = true;
    }
  }

  if(data) {
    //job info
    result += '<div class="job-info-dash">';
    result += '<p>title: '+ job.title  +'</p>';
    result += '<p>salary:' + job.salary + '</p></div>';

    result += '<div class="job-parent">'


    //stages
    for(let idStage in stages) {
      result += '<div class="stage-child">';
      result += '<div class="candidate stage-title">' + stagesDetail[idStage].name +'</div>';
      let candidates = stages[idStage];
      candidates.forEach(candidate => {
        result += '<div class="candidate"><button>x</button><img src=' + candidate.picture +' /><p>' + candidate.fullname +'</p></div>'
      })
      result += '</div>'
    }

    result += '</div>'
    return result;
  } else {
    return ""
  }

}
