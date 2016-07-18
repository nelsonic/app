# Google Authorization and Application Authentication

The authentication of the application is based on:

- [hapi-auth-google](https://github.com/dwyl/hapi-auth-google)
- the concepts of [schemes and strategies](http://hapijs.com/tutorials/auth) with the plugin [hapi-auth-jwt](https://github.com/dwyl/hapi-auth-jwt2)
- hapi's [scope feature](https://blog.andyet.com/2015/06/16/harnessing-hapi-scopes/) 

The flow of authorization/authentication is:

- A user is authorized to the application by using their Google account (at the moment the application asks for permission to send emails and see the basic profile information)
- When the user has authorized the application to use their Google account, the application saves a JWT encoded cookie which contains the data to allow the user to access the application
- Each time a user attempts to access a page where an authentication is necessary, `hapi-auth-jwt` decodes the cookie and checks if the user can access the page
- If the page has a scope, hapi also checks the credentials of the user and allow him/her to access the page or redirects them to an error page if not


## hapi-auth-google


The application registers all the plugins in [index.js](https://github.com/FAC-GM/app/blob/67ef0263dcb418713717c88b56ec4c3a4900f9bf/lib/index.js#L1-L79).

The [`hapi-auth-google` plugin documentation](hapi-auth-google plugin) explains in detail how to use it. In brief, only the options of the plugin need to be defined:
- `redirect-url`: Where Google redirects the user after she accepts the permissions required at login
- `scope`: Define which Google APIs the application can access
- `handler`: A function which is called as the last step of the authorization

The plugin adds a function `generate_google_oauth2_url` which returns the google url which allows the user to accept the application's conditions or not. If the user accepts then google redirects to the `redirect-url` which is defined in the option. The redirect-url handler gets the user's basic google information and calls the handler. The handler checks if the user has the right to access the application (she exists in the Elasticsearch database, has the `active` property, property valid is true) and creates a JWT cookie.


## hapi-auth-jwt

Each time a user accesses an endpoint where the JWT authentication is defined the [`validate`](https://github.com/FAC-GM/app/blob/67ef0263dcb418713717c88b56ec4c3a4900f9bf/lib/validate.js) function is called. After extracting the user's Google ID defined in the JWT cookie, the `validate` function searches for the user in Redis. If a user is found and if the user's property `valid`is set to `true` then the function returns `true` (otherwise returning `false`). Depending on the response of the `validate` function, the user is granted access to the endpoint or not.
