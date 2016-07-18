## Overview (home.js)

Display basic overview of the candidate

## Features:

- basic information about the candidate: fullname, picture, job title, location, company
- initials of who on the team a candidate is connected to are displayed
- number of the team memebers who looked at the candidate
- checkboxes on the left indicate that this candidate has email address or the candidate has been contacted by the team memeber within the last month or the candidate is the client employee
- email indicator (green, amber, red)
  - green - email sent over three months ago
  - amber - email send within three months
  - red - email send within a month
- possibility to send email to all of the candidates by clicking Select all - at the top
- progress stages (client name and stage title), e.g DWYL at Interview
- rejected status (client name and stage title) e.g DWYL at Interview Rejected
- client employee indicator  
- star indicator (favourite candidate)
- search bar at the top: (fullname, location, company, job title, skills)
  - multiple search on skills, e.g css, javascript

## Example of the data context:

- Candidates:

  ```js
  [ { url: 'https://www.linkedin.com/in/newprofile',
  listNames: [ 'css', 'javascript', 'node dev' ],
  connections: 42,
  contacts:
   { email: 'fakecontact12@gmail.com',
     phone: '+44776777777 (Mobile)',
     im: [ 'contactskype (SKYPE)', 'ircContact (IRC)' ],
     address: 'London',
     emailRaw: 'fakecontact12@gmail.com',
     website: 'http://myportfolio.com' },
  fullname: 'Maria Dolores',
  viewedBy:
   [ { id: '12',
       fullname: 'Simon Fake',
       initials: 'SF',
       timestamp: [Object] } ],
  favourite: false,
  rejected: [],
  connectedTo: ["Simon Lab"],
  notesList: [],
  location: 'Manchaster, United Kingdom',
  current: 'Super ltd',
  picture: 'https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_150x150_v1.png',
  summary: 'This is the summary of the first profile',
  skills:
   [ { level: 0, skill: 'Agile Methodologies' },
     { level: 0, skill: 'JavaScript' },
     { level: 0, skill: 'Node.js' } ],
  languages:
   [ { lang: 'English', fluency: 'Native or bilingual proficiency' },
     { lang: 'French', fluency: 'Elementary proficiency' } ],
  experience:
   { current: [ { title: 'JS developer',
    org: 'Company name',
    date: 'October 2014 – Present (1 year 2 months)',
    desc: 'I work as a developer and I\'m creating some cool stuff',
    location: 'London, United Kingdom' },
  { title: 'Gardener',
    org: 'The lovely tree',
    date: 'October 2013 – Present (2 years 2 months)',
    desc: 'I work as a gardener on my spare time',
    location: 'London, United Kingdom' } ],
     past: [ [Object], [Object] ] },
  date: 1468579632848,
  headline: 'Developer',
  emails: [{"sentAt": "02.02.2016", "subject": "hello", "message":"Some message","senderName":"anita", "timestamp":"1455808458140","senderEmail":"email@gmail.com", "senderId":"12323"}],
  jobApplications: [{"jobID": "1", "timestamp": 1458213700542, "comments": "some comment", "skillset": "Css"}],
  info:
   { sexpected: '40000',
     scurrent: '30000',
     locations: 'London',
     idCandidate: 'Elasticsearc id',
     notice: '3 weeks' },
  statusCurrent: [{"idJob": "2", "idUser": "12", "idClient": "4", "idStage": "2", "timestamp": "5465465"}],
  statusHistory: [{"idCandidate":"88", "timestamp": "89898989", "idStage": "stage4", "idClient": "1", "idUser": "12", "idJob": "1"}],
  firstName: 'Maria',
  id: 'Elasticsearc id',
  keywords: '',
  lastEmail: {},
  clientProfile: false }
  ]
  ```

- Stages:

  ```js
  [ { id: 1, name: 'Submitted', order: 1 },
    { id: 2, name: 'Phone Screen', order: 2 },
    { id: 3, name: 'Interview Stage 1', order: 3 },
    { id: 4, name: 'Interview Stage 2', order: 4 },
    { id: 5, name: 'Interview Stage 3', order: 5 },
    { id: 6, name: 'Technical Test', order: 6 },
    { id: 7, name: 'Face to Face', order: 7 },
    { id: 8, name: 'References Requested', order: 8 },
    { id: 9, name: 'Offer', order: 9 },
    { id: 10, name: 'Placement', order: 10 }
  ]

  ```

  - Clients

    ```js
    [{ name: 'DWYL',
        jobs: [ '5', 'some id', '1' ],
        logoUrl: '/assets/img/logo.png',
        possibleNames: [ 'Do WYL' ],
        createdAt: 1465241341452,
        accountManager: '5',
        terms: 18,
        contactName: 'Bob',
        contactEmail: 'bob@gmail.com',
        contactPhone: '000001',
        active: false,
        id: '1' }
      ]
    ```
