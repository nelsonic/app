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
