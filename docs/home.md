# Home - Technical Overview (home.js)

Display basic overview of the candidate

## Features:

- Search bar at the top, allowing for targeted searches on each of 5 fields: fullname, location, company, job title, skills
  - Multiple skills can be searched for using a comma-delimited query, e.g `css, javascript`

+ For each candidate in the application:
  - Basic information about the candidate: full name, picture, job title, location, company
  - Initials of who on the team a candidate is connected 
  - Number of team members who looked at the candidate on LI using the extension
  - Progress status (client name and stage title), e.g COMPANY at Interview
  - Rejected status (client name and stage title) e.g COMPANY at Rejected
  - Client employee indicator - denotes whether candidate is employee of a client (also prevents them from being emailed)
  - Star indicator - denotes if a candidate has been favourited
  - Email indicator (green, amber, red paper aeroplane)
    - green - email sent over three months ago
    - amber - email send within three months
    - red - email send within a month

+ Checkboxes to the left of a candidate's image indicate that this candidate has email address and can be contacted throught he application 
  + If this is missing, a candidate either: has no email address, has been contacted by a team member within the last month or  is the employee of a client
+ Ability to send email to all of the candidates by clicking Select all and then sending an email
+ Up and down arrows to the right are 'jump to top' and 'jump to bottom' shortcuts

## Examples of the data context:

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
    [{ name: 'client-name',
        jobs: [ '5', 'some id', '1' ],
        logoUrl: '/assets/img/logo.png',
        possibleNames: [ 'client-name-ltd' ],
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
