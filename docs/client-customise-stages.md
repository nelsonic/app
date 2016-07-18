## Customise Stages - Technical Overview

Clients can customise the names and number of stages for each particular job within the client dashboard.

Main features:

- clients can select and unselect the stages for each individual job
- clients cannot unselect stages if there are already candidates  in this stage

Endpoints:

- ```GET /jobs/id/stages``` - displays the form with checkboxes
- ```POST /jobs/edit/stages``` - submits the form


Context object rendered to the view:

```js
{ job: 'title',
  stages: { idStage: {name: 'string', candidates: 0, allowed: true or false},
            idStage: {name: 'string', candidates: 0, allowed: true},
            idStage: {name: 'string', candidates: 0, allowed: true},
            ...
          }  
}
```

More information can be found in the issue [475](https://github.com/FAC-GM/app/issues/475) and also on the relevant wiki page [here](https://github.com/FAC-GM/app/wiki/Customise-the-stages-by-the-client-%28feature%29)
