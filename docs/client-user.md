##  Client User Overview

Client users have seperate endpoint to be able to use the platform. More information in reagrds to endpoints please refer to [login-client](https://github.com/FAC-GM/app/blob/master/lib/login_client.js);

There is a seperate interface for the client-users, see [client-layout](https://github.com/FAC-GM/app/blob/master/views/layout/client.html), which has seperate css, and js files.

[css](https://github.com/FAC-GM/app/tree/master/assets/css)
[js](https://github.com/FAC-GM/app/blob/master/assets/js/client_dashboard.js)

Client user object:

```json
{
    "globalm": {
        "mappings": {
            "gmclientusers": {
                "properties": {
                    "authorized": {
                        "type": "boolean"
                    },
                    "email": {
                        "type": "string",
                        "index": "not_analyzed"
                    },
                    "idClient": {
                        "type": "string"
                    },
                    "password": {
                        "type": "string"
                    },
                    "sid": {
                        "type": "string"
                    }
                }
            }
        }
    }
}

```

Main features:

- client-user can access customized dashboard with the following information:

  - list of jobs
  - list of candidates who aplied for the client jobs
  - list of stages, e.g Interview, Face to Face etc.
  - manager contact details

- client-user can customise the stages for the specific jobs
- client-user can move the candidate from stage to stage

More information in regards the client-user dashboard, please go to [client-user-dashboard](./client-user-dashboard.md)
