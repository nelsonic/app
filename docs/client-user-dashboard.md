# Client Dashboard - Technical Overview

The client dashboard can be accessed as a client user. For more information on this access, please see the [client user documentation](/client-user.md).

In addition to the dashboard, the account manager's contact details are displayed.

The dashboard displays:
- A list of jobs assigned to that client
- For each job, a list of stages
- For each stage of a job, the list of candidates in that stage

The dashboard context object (view):

```js
{ client:
   { name: 'client-name', 
     jobs: [ '5', 'AVXuK5DDzX7K12nNn-mp', '1' ],
     logoUrl: '/assets/img/square-global-m-logo.png',
     possibleNames: [ 'client-name-ltd' ],
     createdAt: 1465241341452,
     accountManager: '5',
     terms: 18,
     contactName: 'Bob',
     contactEmail: 'bob@gmail.com',
     contactPhone: '000001',
     active: false,
     id: '1' },
  owner:
   { email: 'bob@something.com',
     active: false,
     admin: false,
     idGoogle: '123',
     image: 'https://image.com',
     idWebsite: '44',
     names:
      { firstname: 'Mario',
        fullname: 'Mario Bros',
        lastname: 'Bros',
        linkedinName: 'nameLI' },
     phones: { office: '0207 000 000', mobile: '079 777 777' },
     role: 'Director',
     linkedin: 'https://linkedin.com/bob',
     dev: false,
     id: '5' },
  title: 'Dashboard',
  jobs:
   { '4': { title: 'Node.js Developer', salary: '50000', stages: [Object] },
     'AVXuK5DDzX7K12nNn-mp': { title: 'Test job', salary: '', stages: [Object] } } }

```

## Stages

A client can also define the stages for each job individually.

### Defining the stages

A client is able to define the stages for each of their job opportunities from a pre-selected list of stages. **By default all the stages are selected**.

A property is added to the job objects to define which stages are allowed in each of the jobs.

The stage object must have an order property which defines what the order of the stages is. This order property will help define the "next" stage of a stage. The order value must be *unique*.

```
job.stagesAllowed = [idStage1, idStage2, ...]
```

Further information on customising the stages can be found in the [documentation here](./client-customise-stages).

### Displaying the stages

```
POST /job/stages

{
  idJob: idJob
}
```

The endpoint replies with a page that looks like:

- [x] Stage1
- [x] Stage2
- [ ] Stage3
- [x] Stage4 (2 candidates)

save

**A stage can't be unchecked if there are any candidates on this stage!** The stage is greyed out to ensure a client is unable to do so.

### Updating the stages

```
POST /job/stages/endpoint

{
  idJob: idJob
  stagesAllowed: [idStage1, idStage2,...]
}
```

The endpoint saves the new `stagesAllowed` to the job object.

## Data Structure

To easily display the dashboard information with Handlebars, the data structure is as follows:

```
{
  idJob1: {
    idStage1: [{fullname: -, picture: -, ...}, {}, ...],
    idStage2: [...]
  },

  idJob2: {...}
}
```

A loop of this main object displays the following information:
 - For each job,
   - For each stage,
     - Display the candidate.

## Actions on the candidate

On the client dashboard, the client is able to update the stage a candidate is in:
- Reject
- Move to next stage

### Reject

Endpoint which defines the `currentStatus` of a candidate as 'reject' for a specific job. For an ajax call the endpoint returns:
- 200 if ok
- 401 if not authorized
- 404 if the candidate hasn't been found

Otherwise the endpoint changes the status to `reject` and redirects to the client-dasboard endpoint which will refresh the dashboard view.

A client can't click on the reject button if the candidate is already in the reject stage. The endpoint doesn't have to redefine the reject stage if the candidate is already in this stage.

```
POST /client-dashboard/reject

{
  idCandidate: -,
  idClient: -,
  idJob: -
}
```

### Next stage

Endpoint which alters the current stage of a candidate to the next one. A client can't click on the next button if the candidate is already in the last stage - if the endpoint is called without a next stage defined it must not change the current stage of the candidate.


## LI

The client is able to see the candidate's LinkedIn profile by clicking 'LI'.
