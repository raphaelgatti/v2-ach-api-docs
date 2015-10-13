# Events

```json
{
  "_links": {},
  "_embedded": {},
  "id": "string",
  "created": "2015-08-24T14:05:17.399Z",
  "accountId": "string",
  "topic": "string",
  "resourceId": "string"
}
```

An event is created to notify you that an action occured on your account. When a unique event occurs(e.g. customer_created), we create a new event object. A single API request can create multiple events. For example, if you initiate a transfer from an Account to a Customer then events can be created for `transfer_created` and `transfer_completed`.

### Events Resource 

| Parameter | Description
|-----------|------------|
|id | ID of application event.
|created | ISO-8601 timestamp.
|accountId | The Customer or Account unique identifier
|topic | Type of event. 
|resourceId | A unique ID of the resource that caused the event.

### Available events
| Event              | Description                                                                                                       |
|--------------------|-------------------------------------------------------------------------------------------------------------------|
| customer_created   | A Customer was created.                                                                                    |
| transfer_created   | Transfer was created.                                                                                             |
| transfer_cancelled | A pending transfer has been cancelled, and will not process further.                                              |
| transfer_failed    | Transaction failed to clear successfully. Usually, this is a result of an ACH failure (insufficient funds, etc.). |
| transfer_completed | Transfer has cleared successfully.                                                                                |
| transfer_reclaimed | The transfer was returned to the sender after being unclaimed by the recipient for a period of time.              |
| funding_source_added | A funding source was added            |
| funding_source_removed |  A funding source was removed         |
| funding_source_verified | A funding source was marked as `verified`         |
| funding_source_unverified | A funding source was marked as `unverified`           |
| customer_funding_source_added |  A funding source was added for a Customer         |
| customer_funding_source_removed | A funding source was removed for a Customer     |
| customer_funding_source_verified | A Customer's funding source was marked as verified      |
| customer_funding_source_unverified | A Customer's funding source was marked as unverified         |
| customer_transfer_created   | Transfer was created.                                                                           |
| customer_transfer_cancelled | A pending transfer has been cancelled, and will not process further.                                     |
| customer_transfer_failed | Transaction failed to clear successfully. Usually, this is a result of an ACH failure (insufficient funds, etc.). |
| customer_transfer_completed | Transfer has cleared successfully.                                                                   |
| customer_transfer_reclaimed | The transfer was returned to the sender after being unclaimed by the recipient for a period of time. |
| customer_verification_document_uploaded | A verification document was uploaded for a Customer. |
| customer_verification_document_approved | A verification document was approved for a Customer. |
| customer_verification_document_failed | A verification document has been rejected for a Customer. |
| customer_verified | A Customer was verified. |
| customer_suspended | A Customer was suspended. |
| customer_verification_document_needed | Verification documentation is needed for a Customer. |
| customer_reverification_needed | Incomplete information received for a Customer.  Updated information is needed to verify the Customer. |
| customer_bank_transfer_created | A bank transfer was created for a Customer. |
| customer_bank_transfer_completed | A bank transfer has cleared successfully for a Customer. |
| customer_bank_transfer_cancelled |  A pending Customer bank transfer has been cancelled, and will not process further. |
| customer_bank_transfer_failed |  Transaction failed to clear successfully. Usually, this is a result of an ACH failure (insufficient funds, etc.). |
| account_suspended | An account was suspended. |
| bank_transfer_cancelled |  A pending bank transfer has been cancelled, and will not process further. |
| bank_transfer_completed | A bank transfer has cleared successfully. |
| bank_transfer_created | A bank transfer was created. |
| bank_transfer_failed |  Transaction failed to clear successfully. Usually, this is a result of an ACH failure (insufficient funds, etc.). |
















## List Events

> Request:

```shell
GET /events
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "first": {
      "href": "https://api-uat.dwolla.com/events?limit=25&offset=0"
    },
    "last": {
      "href": "https://api-uat.dwolla.com/events?limit=25&offset=25"
    },
    "next": {
      "href": "https://api-uat.dwolla.com/events?limit=25&offset=25"
    },
    "self": {
      "href": "https://api-uat.dwolla.com/events"
    }
  },
  "_embedded": {
    "events": [
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/events/0b7847ea-5520-4456-b8f6-2229196b9709"
          },
          "resource": {
            "href": "https://api-uat.dwolla.com/funding-sources/48e463c1-b00d-4cfc-80fc-4935b458b419"
          }
        },
        "id": "0b7847ea-5520-4456-b8f6-2229196b9709",
        "created": "2015-08-25T14:56:26.000Z",
        "accountId": "ad5f2162-404a-4c4c-994e-6ab6c3a13254",
        "topic": "funding_source_removed",
        "resourceId": "48e463c1-b00d-4cfc-80fc-4935b458b419"
      },
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/events/84b6a716-b239-4b08-9a7b-6e11b0ba003a"
          },
          "resource": {
            "href": "https://api-uat.dwolla.com/transfers/38242332-374B-E511-80DA-0AA34A9B2388"
          }
        },
        "id": "84b6a716-b239-4b08-9a7b-6e11b0ba003a",
        "created": "2015-08-25T14:40:15.000Z",
        "accountId": "ad5f2162-404a-4c4c-994e-6ab6c3a13254",
        "topic": "transfer_created",
        "resourceId": "38242332-374B-E511-80DA-0AA34A9B2388"
      },
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/events/5a6c7568-fae1-4e1a-84ee-a62525763244"
          },
          "resource": {
            "href": "https://api-uat.dwolla.com/transfers/8A1F44B6-354B-E511-80DA-0AA34A9B2388"
          }
        },
        "id": "5a6c7568-fae1-4e1a-84ee-a62525763244",
        "created": "2015-08-25T14:29:38.000Z",
        "accountId": "ad5f2162-404a-4c4c-994e-6ab6c3a13254",
        "topic": "transfer_created",
        "resourceId": "8A1F44B6-354B-E511-80DA-0AA34A9B2388"
      }
    ]
  },
  "total": 3
}
```

Retrieve a list of events for the authorized user.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`GET https://api.dwolla.com/events`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
limit | yes | How many results to return.
offset | yes | How many results to skip.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Resource not found. |

## Get Event by ID

> Request:

```shell
GET /events/a58be29f-ce03-4b42-9d6c-48ad2b4093ee
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/events/a58be29f-ce03-4b42-9d6c-48ad2b4093ee"
    },
    "resource": {
      "href": "https://api-uat.dwolla.com/transfers/3B192430-8D47-E511-80DA-0AA34A9B2388"
    }
  },
  "id": "a58be29f-ce03-4b42-9d6c-48ad2b4093ee",
  "created": "2015-08-20T22:45:44.000Z",
  "accountId": "ad5f2162-404a-4c4c-994e-6ab6c3a13254",
  "topic": "transfer_created",
  "resourceId": "3B192430-8D47-E511-80DA-0AA34A9B2388"
}
```

Retrieve an event by Id. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`GET https://api.dwolla.com/events/{id}`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | ID of application event to get.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Application event not found. |