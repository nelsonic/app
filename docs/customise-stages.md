## Overview

Client can customize the stages for the particular job.

Main features:

- client can select, unselect the stages for the particular job
- client can not unselect stage if the candidates are in this stage

Endpoints:

- ```GET /jobs/id/stages``` - list the form with checkboxes
- ```POST /jobs/edit/stages``` - submit the form


Context object rendered to the view:

```js
{ job: 'title',
  stages: { idStage: {name: 'string', candidates: 0, allowed: true or false},
            idStage: {name: 'string', candidates: 0, allowed: true},
            idStage: {name: 'string', candidates: 0, allowed: true},
            ....
          }  
}

```

More information are in the issue [475](https://github.com/FAC-GM/app/issues/475) and also on wiki page [here](https://github.com/FAC-GM/app/wiki/Customise-the-stages-by-the-client-%28feature%29)
