# Email functionality - Technical Overview

Email functionality allows the gm user to send emails from the platform. Users can send multiple emails from the homepage and search page by selecting checkboxes next to candidate images or can send individual email from the candidate's profile pages.

Each of the candidate objects has an `emails` property, e.g:

```json
emails: {
    "properties": {
        "message": {
            "type": "string"
        },
        "senderEmail": {
            "type": "string"
        },
        "senderId": {
            "type": "string"
        },
        "senderName": {
            "type": "string"
        },
        "sentAt": {
            "type": "string"
        },
        "subject": {
            "type": "string"
        },
        "timestamp": {
            "type": "long"
        }
    }

}
```

Saving the above information allows us to track emails sent to specific candidates and generate the following features:

- Three different sent email indicators:
  + if an email has been sent within a month, a red 'sent icon' is displayed - in the individual's profile this will appear with the text: `Emailed within a month`
  + if an email has been sent within 3 months time, an amber 'sent icon' is displayed- in the individual's profile this will appear with the text: `Emailed in less than 3 months`
  + if email has been sent more than 3 months ago, a green 'sent icon' is displayed - in the individual's profile this will appear with the text: `Emailed over 3 months ago`

- The email checkbox next to the candidate image is disabled in the homepage and search pages if they have been emailed through the application in the last month.


Other features:
- Dynamically populates candidate's first names and text in the ```Hi {name}``` placeholder text in the email message area when sending an email through the application
- Personal signatures matching all the users have been coded into the application and are automatically included in the emails sent, based on which gm user is logged into the application when the emails are sent
