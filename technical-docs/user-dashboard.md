## User Dashboard - Technical Overview

The standard user dashboard displays:

- A list of jobs
  + 'Owned' by the logged in user
  + Where the logged in user has added a candidate to a stage of that job 
- For each job, the list of the stages in that job
- For each stage of a job, the list of candidates in that stage


Dashboard context object:

```js
{ admin: true,
  clients:
   [ { name: 'client-name',
       jobs: [Object],
       logoUrl: '/assets/img/square-global-m-logo.png',
       possibleNames: [Object],
       accountManager: '12',
       terms: 18,
       contactName: 'Bob',
       contactEmail: 'bob@gmail.com',
       contactPhone: '000001',
       active: true,
       id: '4' } ],
  users:
   [
     { email: 'example@gmail.com',
       idGoogle: '78787878',
       image: '',
       idWebsite: '78787878',
       names: [Object],
       phones: [Object],
       role: 'Developer',
       linkedin: 'https://www.linkedin.com/in/candidateUserUrl',
       active: true,
       admin: true,
       dev: false,
       id: 'ES id' },
     { email: 'user.noidgoogle@user.com',
       active: true,
       admin: true,
       image: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50',
       names: [Object],
       phones: [Object],
       role: 'User',
       linkedin: 'https://linkedin.com/in/userNoIdGoogle',
       dev: false,
       idGoogle: '123456789',
       id: '7' } ],
  myJobs: { '3': {} },
  otherJobs: {},
  jobsDetail:
   { '3': { title: 'Test job 3', salary: '50000' },
     '4': { title: 'Node.js Developer', salary: '50000' },
     'AVXuK5DDzX7K12nNn-mp': { title: 'Test job', salary: '' } },
  stagesDetail:
   { '1': { id: 1, name: 'Submitted', order: 1 },
     '2': { id: 2, name: 'Phone Screen', order: 2 },
     '3': { id: 3, name: 'Interview Stage 1', order: 3 },
     '4': { id: 4, name: 'Interview Stage 2', order: 4 },
     '5': { id: 5, name: 'Interview Stage 3', order: 5 },
     '6': { id: 6, name: 'Technical Test', order: 6 },
     '7': { id: 7, name: 'Face to Face', order: 7 },
     '8': { id: 8, name: 'References Requested', order: 8 },
     '9': { id: 9, name: 'Offer', order: 9 },
     '10': { id: 10, name: 'Placement', order: 10 } },
  userIdGoogle: '12' }

```

For the list of endpoints, see [`dashboard.js`](https://github.com/FAC-GM/app/blob/master/lib/dashboard.js).


Main features:
- user can view all of their jobs and the candidates that are at the various stages within them
- user can view any jobs for which they have updated a candidate's status (from one stage to another)
- user can move the candidate from stage to stage
- user can delete the candidate from specific job
