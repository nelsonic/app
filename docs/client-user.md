##  Client User - Technical Overview

Client users have separate endpoint to be able to use the platform. For more on this endpoint, please refer to [login_client](https://github.com/FAC-GM/app/blob/master/lib/login_client.js).

There is a separate interface for the client users, see [client_layout](https://github.com/FAC-GM/app/blob/master/views/layout/client.html), which has separate [css](https://github.com/FAC-GM/app/tree/master/assets/css) and 
[js](https://github.com/FAC-GM/app/blob/master/assets/js/client_dashboard.js) files.

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

- client-user can access customised dashboard
- client-user can customise the stages for the specific jobs
- client-user can move the candidate from stage to stage

More information on the client-user dashboard, please see [client-user-dashboard](./client-user-dashboard.md).
