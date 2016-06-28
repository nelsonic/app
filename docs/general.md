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
.
├── assets                   # Public resources css, js files
├── lib                      # API routes
|    ├── database-helpers    # ElasticSearch and Redis helpers
|    ├── handlers            # Handlers
|    ├── helpers             # Helpers for handlers
├── views                    # Handlebars templates - layouts, pages, partials and helpers
└── test                     # Unit and integration tests
```

## Database structure

- index: **globalm**, type: **contacts** - all candidates
- index: **globalm**, type: **gmusers** - globalm users

  ```
  {
  "url": string,
  "connections": number,
  "connectedTo": array of strings (users fullname),
  "fullname": string,
  "location": string,
  "favourite": array of strings (users id),
  "current": string,
  "picture": string,
  "contacts": {
      "email": string,
      "phone": string,
      "im": array of strings,
      "address": string
    },
  "summary": string,
  "skills": [{"level": number, "skill": string}],
  "languages":[{"lang": string, "fluency": string}],
  "experience": {
      "current": [{"title": string, "org": string, "date" : string, "desc": string, "location": string}],
      "past": [{"title": string, "org": string, "date" : string, "desc": string, "location": string}]
    },
   "notes": [{createdAt: string, author: string, notes: string, status: string, company: string}]
  }

  ```

  ### Example:

  ```
  { "url": "https://uk.linkedin.com/in/fakeprofile1",
      "connections": 500,
      "connectedTo": ["Bob"],
       "fullname": "Maria Dolores",
       "location": "London, United Kingdom",
       "favourite": ["12"],
       "current": "The best company ever",
       "picture":"https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_150x150_v1.png",
       "contacts": {
           "email": "fakecontact1@gmail.com",
           "phone":"+44777777777 (Mobile)",
           "im": [ "contactskype (SKYPE)", "ircContact (IRC)"],
           "address": "London" },
      "summary": "This is the summary of the first profile",
      "skills":[{ "level": 0, "skill": "Agile Methodologies" },{ "level": 0,"skill": "JavaScript" },{ "level": 0, "skill": "Node.js" }],
      "languages":[{"lang": "English", "fluency": "Native or bilingual proficiency"},{"lang" : "French" , "fluency": "Elementary proficiency" } ],
      "experience":{
          "current": [{"title": "JS developer","org": "the best company","date": "October 2014 – Present (1 year 2 months)","desc": "I work as a developer and I'm creating some cool stuff","location": "London, United Kingdom"},{   "title": "Gardener","org": "The lovely tree","date": "October 2013 – Present (2 years 2 months)","desc": "I work as a gardener on my spare time","location": "London, United Kingdom"}],
          "past":[{  "title": "Guitar player","org": "Pink Floyd","date": "October 1984 – October 1985 (1 year)","desc": "I was a guitar hero","location": "The world"},{   "title": "Tennis player","org": "National French Team","date": "October 2010 – October 2013 (3 years)","desc": "I was the number 1","location": "Paris, France"}]}
  }
  ```

## Env file
## List of API's
## Basic explanation how the features works
## Github flow - list of labels
