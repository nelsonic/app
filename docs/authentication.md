# Google Authorization and Application Authentication

The authentication of the application is based on:

- [hapi-auth-google](https://github.com/dwyl/hapi-auth-google)
- the concepts of [schemes and strategies](http://hapijs.com/tutorials/auth) with the plugin [hapi-auth-jwt](https://github.com/dwyl/hapi-auth-jwt2)
- the [scope feature](https://blog.andyet.com/2015/06/16/harnessing-hapi-scopes/) of Hapi

The flow of authorization/authentication is:

- A user is authorized to the application by using its Google account (At the moment the application can send emails and see the basic profile information).
- When the user has authorized the application to use its Google account the application is saving an JWT encoded cookie which contains the data to allow the user to access the application
- Each time a user attempt to access a page where an authentication is necessary the hapi-auth-jwt decode the cookie and check if the user can access the page
- If the page as a scope Hapi is also checking the credentials of the user and allow her to access the page or redirect if not


## Hapi auth google


The application register all the plugins in [index.js](https://github.com/FAC-GM/app/blob/67ef0263dcb418713717c88b56ec4c3a4900f9bf/lib/index.js#L1-L79).

The [hapi-auth-google plugin documentation](hapi-auth-google plugin) of DWYL explain in detail how to use it. In brief you just need to define the options of the plugin:
- redirect-url: Where Google redirect the user after she accept
- scope: Define which Google APIs the application can access
- the handler: A function which is called at the last step of the authorization

The plugin adds a function "generate_google_oauth2_url" which returns the google url which allow user to accept or not the application. If the user accepts then google redirects to the redirect-url which is defined in the option. The redirect-url handler get the basic Google information of the user and call the handler. The handler is checking if the user has the right to access the application (exists in the Elasticsearch database, active property, property valid is true) and create a JWT cookie.


## hapi-auth-jwt

Each time a user access an endpoint where the JWT authentication is defined the [validate](https://github.com/FAC-GM/app/blob/67ef0263dcb418713717c88b56ec4c3a4900f9bf/lib/validate.js) function is called. After extracting the id Google of the user defined in the JWT cookie the validate function search for the user on Redis. If a user is found and if the property valid of the user is true then the function returns true (false otherwise). Depending of the response of the validate function the user can access or not the endpoint.
