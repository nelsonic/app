## Overview

Email functionality allows the gm user sends emails from the platform. User can send multiple emails from the home page by selecting checkboxes next to candidate image or can send individual email.

Each of the candidate object has emails property, e.g:

```json
emails": {
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

Saving above information allow us to track sent emails to the specific candidate and generate following features:

- Three different sent email indicators:

  - if an email has been sent within a month, we display red 'sent icon' with text: Emailed within a month

  - if an email has been sent within 3 months time, we display amber'sent icon' with text: Emailed in less than 3 months

  - if email has been sent more than 3 months ago: we display green 'sent icon' with text: Emailed over 3 months ago

- Disabled checkbox next to the candidate if the email has been sent within 1 month


Other features:

- Dynamically populating candidates first names and text ```Hi {name}``` when sending an email in a message area.

- Personal signatures match to all the users are included in the email
