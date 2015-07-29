# Webhooks and Subscriptions

```json
{
  "_links": {},
  "id": "string",
  "topic": "string",
  "accountId": "string",
  "eventId": "string",
  "subscriptionId": "string",
  "attempts": [
    {
      "id": "string",
      "request": {
        "timestamp": "2015-07-23T14:19:36.981Z",
        "url": "string",
        "headers": [
          {
            "name": "string",
            "value": "string"
          }
        ],
        "body": "string"
      },
      "response": {
        "timestamp": "2015-07-23T14:19:36.981Z",
        "headers": [
          {
            "name": "string",
            "value": "string"
          }
        ],
        "statusCode": 0,
        "body": "string"
      }
    }
  ]
}
```

A webhook notification is sent as a `POST` request to a user defined destination. Dwolla will send webhooks to notify an application about the status of a Transfer. As required in the White Label TOS you will use webhooks to notify your customers via email on the status of a Transfer.

### Webhook Resource

| Parameter      | Description                                       |
|----------------|---------------------------------------------------|
| id             | Unique UUIDv4 identifier.                         |
| topic          | Type of webhook subscription.                     |
| accountId      | Account associated with the webhook notification. |
| eventId        | Event ID for this webhook.                        |
| subscriptionId | Webhook subscription ID for this event.           |
| attempts       | Array of Attempt JSON object.                     |

### Attempt JSON Object

| Parameter      | Description                             |
|----------------|-----------------------------------------|
| id             | Unique ID of webhook delivery attempt.  |
| request        | Request JSON object                     |
| response       | Response JSON object                    |

### Request/Response JSON Object

| Parameter      | Description                                                                   |
|----------------|-------------------------------------------------------------------------------|
| timestamp      | ISO-8601 timestamp.                                                           |
| url            | URL where data was sent to/received from.                                     |
| headers        | Array of objects with keys `name` and `value` representative of HTTP headers. |
| body           | Event ID for this webhook.                                                    |

## Retrieve webhook by ID

> Request:

```shell
GET /hooks/76ce47b9-5b3c-4ac8-a743-ce318afbaecd
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/hooks/76ce47b9-5b3c-4ac8-a743-ce318afbaecd"
    }
  },
  "id": "76ce47b9-5b3c-4ac8-a743-ce318afbaecd",
  "topic": "string",
  "accountId": "string",
  "eventId": "string",
  "subscriptionId": "string",
  "attempts": [
    {
      "id": "string",
      "request": {
        "timestamp": "2015-07-23T14:19:36.981Z",
        "url": "string",
        "headers": [
          {
            "name": "string",
            "value": "string"
          }
        ],
        "body": "string"
      },
      "response": {
        "timestamp": "2015-07-23T14:19:36.981Z",
        "headers": [
          {
            "name": "string",
            "value": "string"
          }
        ],
        "statusCode": 0,
        "body": "string"
      }
    }
  ]
}
```

Fetch a list of webhooks that the authorized user is currently subscribed to. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`
GET https://api.dwolla.com/customers/webhook-subscriptions
`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## List Webhook Subscriptions

> Request:

```shell
GET /webhook-subscriptions
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/webhook-subscriptions"
    }
  },
  "total": 1,
  "items": [
    {
      "_links": {
        "self": {
          "href": "https://api.dwolla.com/webhook-subscriptions/10d4133e-b308-4646-b276-40d9d36def1c"
        }
      },
      "id": "10d4133e-b308-4646-b276-40d9d36def1c",
      "url": "http://destination.url",
      "createdDate": "2015-07-23T14:19:36.993Z"
    }
  ]
}
```

Fetch a list of webhooks that the authorized user is currently subscribed to. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`
GET https://api.dwolla.com/customers/webhook-subscriptions
`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## Subscription by ID

> Request:

```shell
GET /webhook-subscriptions/10d4133e-b308-4646-b276-40d9d36def1c
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/webhook-subscriptions/10d4133e-b308-4646-b276-40d9d36def1c"
    }
  },
  "id": "10d4133e-b308-4646-b276-40d9d36def1c",
  "url": "http://destination.url",
  "createdDate": "2015-07-23T14:19:36.993Z"
}
```

Fetch a webhook subscription by its ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`
GET https://api.dwolla.com/customers/webhook-subscriptions/{id}
`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## Hooks belonging to subscription

> Request:

```shell
GET /webhook-subscriptions/10d4133e-b308-4646-b276-40d9d36def1c/hooks
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {},
  "total": 0,
  "items": [
    {
      "_links": {},
      "id": "string",
      "topic": "string",
      "accountId": "string",
      "eventId": "string",
      "subscriptionId": "string",
      "attempts": [
        {
          "id": "string",
          "request": {
            "timestamp": "2015-07-23T14:19:37.006Z",
            "url": "string",
            "headers": [
              {
                "name": "string",
                "value": "string"
              }
            ],
            "body": "string"
          },
          "response": {
            "timestamp": "2015-07-23T14:19:37.006Z",
            "headers": [
              {
                "name": "string",
                "value": "string"
              }
            ],
            "statusCode": 0,
            "body": "string"
          }
        }
      ]
    }
  ]
}
```

View all fired webhooks that are associated to a specific subscription, via that subscription's ID. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`
GET https://api.dwolla.com/customers/webhook-subscriptions/{id}/hooks
`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## Subscribe to a Webhook

> Request:

```shell
POST /webhook-subscriptions
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
  "url": "http://deliver.webhooks/here",
  "secret": "shush!"
}
```

> Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/webhook-subscriptions/10d4133e-b308-4646-b276-40d9d36def1c
```

Create a webhook subscription to deliver webhooks to a desired URL. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`
POST https://api.dwolla.com/customers/webhook-subscriptions
`

### Request Parameters

Parameter | Description
----------|------------
url | Where Dwolla should deliver the webhook notification.
secret | Your application secret. 

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## Unsubscribe from a webhook

> Request:

```shell
DELETE /webhook-subscriptions/10d4133e-b308-4646-b276-40d9d36def1c
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```shell
HTTP 200
```

Fetch a list of webhooks that the authorized user is currently subscribed to. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`
DELETE https://api.dwolla.com/customers/webhook-subscriptions/{id}
`

### Request Parameters

Parameter | Description
----------|------------
id | Webhook UUID.


### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |