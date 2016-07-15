### General information

## Tech choices:

- Hapi (http://hapijs.com/)
- Node.js (https://nodejs.org/en/)
- Handlebars (http://handlebarsjs.com/)
- Redis database (http://redis.io/)
- ElasticSearch (https://www.elastic.co/)
- lab (https://github.com/hapijs/lab)
- travis (https://travis-ci.org/)
- codecov (https://codecov.io/)
- nodemon (https://github.com/remy/nodemon)

Steps to how to run a project, please go to [README](https://github.com/FAC-GM/app/blob/master/README.md)

## Directory structure

```
├── assets                   # Public resources css, js files
├── lib                      # API routes
|    ├── database-helpers    # ElasticSearch and Redis helpers
|    ├── handlers            # Handlers
|    ├── helpers             # Helpers for handlers
├── views                    # Handlebars templates - layouts, pages, partials and helpers
└── test                     # Unit and integration tests
```

## Database structure

- index: **globalm** types:
  - **contacts** (candidates)
  - **gmusers**  (platform users)
  - **analitics** (analitics of activity)
  - **categories** (categories for jobs e.g Backend Development)
  - **countries** (countries for specific jobs)
  - **sectors** (business sector e.g FinTech)
  - **cv** (candidate's cv)
  - **gmclients** (clients who owns the job)
  - **gmclientusers** (clients who can access the application - squirrel)
  - **status** (stages for the job e.g Interview)
  - **csv-list** (lists from csv files)

To check mapping of each type, you can use this command in your browser url:

```
databaseurl/index/type/_mapping
```

Prettify version:

```
databaseurl/index/type/_mapping?pretty
```

To check example of the each type, you can use this command in your browser url:

```
databseurl/index/type/_search?pretty
```

## List of API's

- ```GET /{page*}```
- ```GET /assets/{params*}```
- ```GET /activities```
- ```GET /analytics```
- ```GET /candidate/{id}```
- ```GET /candidate/{id}/{keywords?}```
- ```POST /candidates/create```
- ```POST /delete```
- ```POST /favourite```
- ```POST /info/save```
- ```POST /li/save```
- ```POST /notes/save```
- ```POST /candidates/delete-list```
- ```GET /client-dashboard```
- ```POST /nextStage```
- ```POST /reject```
- ```GET /connected/{fullname}/{page?}```
- ```GET /owners/list```

- ```GET /users/list```
- ```GET /users/edit/{id}```
- ```GET /users/create```
- ```POST /users/save```

- ```GET /query/{page?}```

  Query parameters:

  | Name     |      Type     | Required | Description                                     |
  |----------|:-------------:|---------:|-------------------------------------------------|
  | job      |    string     |    No    | Search term                                     |
  | fullname |    string     |    No    | Search term                                     |
  | location |    string     |    No    | Search term                                     |
  | current  |    string     |    No    | Search term                                     |
  | skills   |    string     |    No    | Search term                                     |
  | page     |    integer    |    No    | Zero indexed pagination page number to retrieve |
  |totalPages|    integer    |    No    | Total found results                             |


  Example:

  ```
   GET /query?job=developer&fullname=anita&location=london&current=Dwyl&skills=css%2C+js&page=1&totalPages=1348
  ```

- ```POST /status/save```
- ```POST /status/delete```
- ```POST /status/edit```

- ```GET /dashboard```
- ```POST /dashboard/client/{idClient}```
- ```POST /dashboard/user```

- ```GET /jobs/list```
- ```GET /jobs/create```
- ```GET /jobs/{id}```
- ```GET /jobs/edit/{id}```
- ```GET /jobs/{id}/stages```
- ```POST /jobs/stages/edit```
- ```POST /jobs/create```
- ```GET /countries/list```
- ```GET /sectors/list```

- ```GET /clients/list```
- ```GET /clients/create```
- ```GET /clients/edit/{id}```
- ```GET /clients/{id}```
- ```POST /clients/save```

- ```GET /client-login```
- ```POST /client-auth```
- ```GET /client-users/list```
- ```GET /client-users/edit/{id}```
- ```GET /client-users/create```
- ```POST /client-users/save```

- ```POST /profile``` save data received from extension

- ```POST /email```
- ```POST /sendemail```

- ```GET /permission```
- ```GET /login```


## Basic explanation of the selected features

- [Authentication](./Authentication.md)
- [Home](./home.md)
- [Client-User]('./client-user.md')
- [Client Dashboard]('./client-user-dashboard.md')
- [User Dashboard](./user-dashboard.md)
- [Customise stages by client](./customise-stages.md)
- [Email](./email.md)
- Csv-list
- [Test](./test.md)
