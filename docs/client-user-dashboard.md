# Overview

The dashboard display:
- A list of jobs
- For each jobs the list of stages
- For each stages of a jobs the list of candidates on the stage

The dashboard context object (view):

```js
{ client:
   { name: 'DWYL',
     jobs: [ '5', 'AVXuK5DDzX7K12nNn-mp', '1' ],
     logoUrl: '/assets/img/square-global-m-logo.png',
     possibleNames: [ 'Do WYL' ],
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


But before displaying the dashboard the clients can define the stages of the jobs processes

# Define the stages

A client has the possibility to define the stages for each of her job opportunity from a pre-selected list of stages. **By default all the stages are selected**

So we need to add a property to our job objects to define which stages are allowed on the jobs

The stage object must have an order property which define what is the order of the list of the stages. This order property will help us to define "next" stage of a stage. The order value must be unique!

```
job.stagesAllowed = [idStage1, idStage2, ...]
```

## Display the stages

```
POST /job/stages

{
  idJob: idJob
}
```

The endpoint reply a page which looks like:

- [x] Stage1
- [x] Stage2
- [ ] Stage3
- [x] Stage4 (2 candiates)

save

**A stage can't be unchecked if there are any candidates on this stage!**

## Update the stages

```
POST /job/stages/endpoint

{
  idJob: idJob
  stagesAllowed: [idStage1, idStage2,...]
}
```

The endpoint save the new stagesAllowed on the job object

# Data Structure

To display easily the dashboard information with Handlebars we have created the following data structure:

```
{
  idJob1: {
    idStage1: [{fullname: -, picture: -, ...}, {}, ...],
    idStage2: [...]
  },

  idJob2: {...}
}
```

We then just need to loop of the this main object to display the information:
 - For each jobs
   - For each stages
     - Display the candidate

# Actions on the candidate

On the client dashboard, the client has the possibility to update the current stage of a candidate:
- reject
- next stage

## Reject

Endpoint which define the currentStatus of a candidate for a specific job to reject.For an ajax call the endpoint returns:
- 200 if ok
- 401 if not authorized
- 404 if the candidate hasn't been found

Otherwise the endpoint change the status to reject and redirect to the client-dasboard endpoint which will refresh the dasboard view.

A client can't click on the reject button if the candidate is already on the reject stage. The endpoint doesn't have to redefine the reject stage if the candidate is already on this stage

```
POST /client-dashboard/reject

{
  idCandidate: -,
  idClient: -,
  idJob: -
}
```

## Next stage

Endpoint which define the current stage of a candidate to the next one. A client can't click on the next button if the candidate is already on the last stage and if the endpoint is called without a next stage defined it must not change the current stage of the candidate


# LI

The client has the possibility to see the LI candidate profile.
