# Events

```json
{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/events/f8e70f48-b7ff-47d0-9d3d-62a099363a76"
    },
    "resource": {
      "href": "https://api-uat.dwolla.com/transfers/48CFDDB4-1E74-E511-80DB-0AA34A9B2388"
    },
    "account": {
      "href": "https://api-uat.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254"
    }
  },
  "id": "f8e70f48-b7ff-47d0-9d3d-62a099363a76",
  "created": "2015-10-16T15:58:15.000Z",
  "topic": "transfer_created",
  "resourceId": "48CFDDB4-1E74-E511-80DB-0AA34A9B2388"
}
```

When a resource's state changes, we create a new event resource to record the change.  For instance, if a customer's status changes to `verified`, a `customer_verified` event will be created.  When an Event is created, a [Webhook](#webhooks) will be created to deliver the Event to any URLs specified by your active [Webhook Subscriptions](#webhook-subscriptions).

### Events Resource 

| Parameter | Description
|-----------|------------|
|_links | Contains links to the event, associated resource, the account associated with the event, and the customer associated with the event (if any).
|id | Event ID
|created | ISO-8601 timestamp when event was created
|topic | Type of event
|resourceId | ID of the resource associated with the event.

### Event topics
| Topic          | Description                                                                                                       |
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
    "self": {
      "href": "https://api-uat.dwolla.com/events"
    },
    "first": {
      "href": "https://api-uat.dwolla.com/events?limit=25&offset=0"
    },
    "last": {
      "href": "https://api-uat.dwolla.com/events?limit=25&offset=150"
    },
    "next": {
      "href": "https://api-uat.dwolla.com/events?limit=25&offset=25"
    }
  },
  "_embedded": {
    "events": [
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/events/78e57644-56e4-4da2-b743-059479f2e80f"
          },
          "resource": {
            "href": "https://api-uat.dwolla.com/transfers/47CFDDB4-1E74-E511-80DB-0AA34A9B2388"
          },
          "account": {
            "href": "https://api-uat.dwolla.com/accounts/AD5F2162-404A-4C4C-994E-6AB6C3A13254"
          }
        },
        "id": "78e57644-56e4-4da2-b743-059479f2e80f",
        "created": "2015-10-16T15:58:18.000Z",
        "topic": "bank_transfer_created",
        "resourceId": "47CFDDB4-1E74-E511-80DB-0AA34A9B2388"
      },
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/events/f8e70f48-b7ff-47d0-9d3d-62a099363a76"
          },
          "resource": {
            "href": "https://api-uat.dwolla.com/transfers/48CFDDB4-1E74-E511-80DB-0AA34A9B2388"
          },
          "account": {
            "href": "https://api-uat.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254"
          }
        },
        "id": "f8e70f48-b7ff-47d0-9d3d-62a099363a76",
        "created": "2015-10-16T15:58:15.000Z",
        "topic": "transfer_created",
        "resourceId": "48CFDDB4-1E74-E511-80DB-0AA34A9B2388"
      },
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/events/9f0167e0-dce6-4a1a-ad26-30015d6f1cc1"
          },
          "resource": {
            "href": "https://api-uat.dwolla.com/transfers/08A166BC-1B74-E511-80DB-0AA34A9B2388"
          },
          "account": {
            "href": "https://api-uat.dwolla.com/accounts/AD5F2162-404A-4C4C-994E-6AB6C3A13254"
          }
        },
        "id": "9f0167e0-dce6-4a1a-ad26-30015d6f1cc1",
        "created": "2015-10-16T15:37:03.000Z",
        "topic": "bank_transfer_created",
        "resourceId": "08A166BC-1B74-E511-80DB-0AA34A9B2388"
      },
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/events/81f6e13c-557c-4449-9331-da5c65e61095"
          },
          "resource": {
            "href": "https://api-uat.dwolla.com/transfers/09A166BC-1B74-E511-80DB-0AA34A9B2388"
          },
          "account": {
            "href": "https://api-uat.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254"
          },
          "customer": {
            "href": "https://api-uat.dwolla.com/customers/07d59716-ef22-4fe6-98e8-f3190233dfb8"
          }
        },
        "id": "81f6e13c-557c-4449-9331-da5c65e61095",
        "created": "2015-10-16T15:37:02.000Z",
        "topic": "customer_transfer_created",
        "resourceId": "09A166BC-1B74-E511-80DB-0AA34A9B2388"
      }
    ]
  },
  "total": 4
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
GET /events/81f6e13c-557c-4449-9331-da5c65e61095
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/events/81f6e13c-557c-4449-9331-da5c65e61095"
    },
    "resource": {
      "href": "https://api-uat.dwolla.com/transfers/09A166BC-1B74-E511-80DB-0AA34A9B2388"
    },
    "account": {
      "href": "https://api-uat.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254"
    },
    "customer": {
      "href": "https://api-uat.dwolla.com/customers/07d59716-ef22-4fe6-98e8-f3190233dfb8"
    }
  },
  "id": "81f6e13c-557c-4449-9331-da5c65e61095",
  "created": "2015-10-16T15:37:02.000Z",
  "topic": "customer_transfer_created",
  "resourceId": "09A166BC-1B74-E511-80DB-0AA34A9B2388"
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