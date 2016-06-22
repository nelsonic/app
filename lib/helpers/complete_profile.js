module.exports = function(profile) {
  var result = profile;
  var expectedProperties = {
    url: '',
    connections: 0,
    connectedTo: [],
    fullname: '',
    location: '',
    favourite: [],
    current: '',
    picture: 'https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_150x150_v1.png',
    summary: '',
    skills: [],
    languages: [],
    date: Date.now(),
    headline: '',
    emails: [],
    contacts: {},
    experience: {},
    jobApplications: [],
    viewedBy: [],
    info: {},
    statusCurrent: [],
    statusHistory: [],
    notesList: [],
    listNames: [],
    rejected: []
  }

  var contacts = {
    email: '',
    emailRaw: '',
    phone: '',
    im: [],
    address: '',
    website: ''
  };

  var info = {
    sexpected: '',
    scurrent: '',
    locations: '',
    idCandidate: '',
    notice: ''
  }

  var experience = {
    current: [],
    past: []
  };

  for(var prop in expectedProperties) {
    if(result[prop] === undefined) {
      result[prop] = expectedProperties[prop];
    }
  }

  for(var c in contacts) {
    if(result.contacts[c] === undefined) {
      result.contacts[c] = contacts[c];
    }
  }

  for(var i in info) {
    if(result.info[i] === undefined) {
      result.info[i] = info[i];
    }
  }

  return result;
}
