

## Zoohackathon 2016 / London 

This is the SMS gateway written by Brave Pandas for the 2016 London Zoohackathon.

Report -> Analyse -> Predict

# Rafiki SMS

Receive API requests for twilio and respond in a conversational form back to the user. Used to collect responses and store them for further processing.


API Definition
--------------

**POST /api/reportsession**

Create a new reportsession for further processing

```javascript
{
    where: "Timbavati",
    when: "Yesterday at 3pm"
    description: [
        {
            text: "Description Text"
        },
        {
            text: "Further Description Text"
        }
    ]
}
```

**POST /sms/request**

Receive API request from twilio - example format.

```javascript
{
	"ToCountry": "GB",
	"ToState": "Wigan",
	"SmsMessageSid": "SMab04e45b03c82460cd25acd0b804b53a",
	"NumMedia": "0",
	"ToCity": "",
	"FromZip": "",
	"SmsSid": "SMab04e45b03c82460cd25acd0b804b53a",
	"FromState": "",
	"SmsStatus": "received",
	"FromCity": "",
	"Body": "london",
	"FromCountry": "GB",
	"To": "+441942316124",
	"ToZip": "",
	"NumSegments": "1",
	"MessageSid": "SMab04e45b03c82460cd25acd0b804b53a",
	"AccountSid": "ACa512c0bad81f66d5df539deee5e0fa96",
	"From": "+447515354259",
	"ApiVersion": "2010-04-01"
}
```

Questions
---------

Text 'RAFIKI' to +441942316124
