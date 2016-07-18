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
  [ { listFavourite: [],
      favourite: false,
      id: 'some id',
      fullname: 'CandidateCSV',
      firstName: 'CandidateCSV',
      headline: '',
      current: '',
      picture: '/assets/img/pic.png',
      location: '',
      connectedTo: [],
      viewedBy: [],
      emails: [],
      lastEmail: {},
      statusCurrent: [],
      emailLast30: false,
      email: 'candidate@csv.com',
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
