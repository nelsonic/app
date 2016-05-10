'use strict';

module.exports = function (stages, idJob, jobsDetail, stagesDetail) {

  let job = jobsDetail[idJob];
  let result = "";

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
      result += '<div class="candidate">';
      result += '<form class="delete-status-form" action="/status/delete" method="POST">';
      result += '<input type="hidden" name="idCandidate" value="' + candidate.id +'">';
      result += '<input type="hidden" name="timestamp" value="' + candidate.statusTimestamp + '">';
      result += '<input type="hidden" name="redirectDashboard" value="true">'
      result += '<button>x</button>'
      result += '</form>'
      result += '<img src=' + candidate.picture +' /><p>' + candidate.fullname +'</p></div>'
    })
    result += '</div>'
  }

  result += '</div>'
  return result;


}
