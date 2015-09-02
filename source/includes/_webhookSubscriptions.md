# Webhook Subscriptions

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
        "created": "2015-07-23T14:19:36.981Z",
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
        "created": "2015-07-23T14:19:36.981Z",
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

Create a Webhook Subscription to receive `POST` requests from Dwolla (called Webhooks) when Events associated with your application occur.  [Webhooks](#webhooks) are sent to a URL which you provide when creating a Webhook Subscription. If you are a White Label partner, you will use these events to notify your customers via email based on the White Label TOS. Refer to the [events](#available-events) section for the list of events that trigger webhooks.

### Acknowledgement and retries
When your application receives a [Webhook](#webhooks), it should respond with a HTTP 2xx status code to indicate successful receipt. If Dwolla receives a status code greater than a HTTP 400, or your application fails to respond within 20 seconds of the attempt, another attempt will be made.

Dwolla will re-attempt delivery 8 times over the course of 72 hours according the backoff schedule below. If a webhook was successfully received but you would like the information again, you can call [retrieve webhook by ID](#retrieve-webhook-by-id).

| Retry number | Interval (relative to last retry) | Interval (relative to original attempt) |
|:------------:|:---------------------------------:|:---------------------------------------:|
|       1      |              15 min               |                  15 min                 |
|       2      |              45 min               |                   1 h                   |
|       3      |               2 h                 |                   3 h                   |
|       4      |               3 h                 |                   6 h                   |
|       5      |               6 h                 |                  12 h                   |
|       6      |              12 h                 |                  24 h                   |
|       7      |              24 h                 |                  48 h                   |
|       8      |              24 h                 |                  72 h                   |

### Webhook Resource

| Parameter      | Description                                       |
|----------------|---------------------------------------------------|
| id             | Webhook unique identifier.                        |
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
| created        | ISO-8601 timestamp.                                                           |
| url            | URL where data was sent to/received from.                                     |
| headers        | Array of objects with keys `name` and `value` representative of HTTP headers. |
| body           | Event ID for this webhook.                                                    |

## Subscribe to Webhooks

> Request:

```shell
POST /webhook-subscriptions
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
  "url": "https://deliver.webhooks/here",
  "secret": "shush!"
}
```

> Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/webhook-subscriptions/10d4133e-b308-4646-b276-40d9d36def1c
```

Create a webhook subscription to deliver [Webhooks](#webhooks) to a specified URL. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`
POST https://api.dwolla.com/webhook-subscriptions
`

### Request Parameters

Parameter | Description
----------|------------
url | Where Dwolla should deliver the webhook notification.
secret | Your application secret. 

### Errors
| HTTP Status | Message |
|--------------|-------------|

## Delete a Webhook Subscription

> Request:

```shell
DELETE /webhook-subscriptions/f4d21628-fde2-4d3a-b69a-0a7cb42adc4c
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/webhook-subscriptions/f4d21628-fde2-4d3a-b69a-0a7cb42adc4c"
    },
    "webhooks": {
      "href": "https://api.dwolla.com/webhook-subscriptions/f4d21628-fde2-4d3a-b69a-0a7cb42adc4c/webhooks"
    }
  },
  "id": "f4d21628-fde2-4d3a-b69a-0a7cb42adc4c",
  "url": "https://destination.url",
  "created": "2015-08-19T21:43:49.000Z"
}
```

Delete a Webhook Subscription to stop receiving Webhooks at the URL specified. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`
DELETE https://api.dwolla.com/webhook-subscriptions/{id}
`

### Request Parameters

Parameter | Description
----------|------------
id | Webhook unique identifier.


### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Webhook subscription not found. |

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
  "_embedded": {
    "webhook-subscriptions": [
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/webhook-subscriptions/f4d21628-fde2-4d3a-b69a-0a7cb42adc4c"
          },
          "webhooks": {
            "href": "https://api.dwolla.com/webhook-subscriptions/f4d21628-fde2-4d3a-b69a-0a7cb42adc4c/webhooks"
          }
        },
        "id": "f4d21628-fde2-4d3a-b69a-0a7cb42adc4c",
        "url": "https://destination.url",
        "created": "2015-08-19T21:43:49.000Z"
      }
    ]
  },
  "total": 1
}
```

Retrieve a list of webhook subscriptions that belong to an application.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`
GET https://api.dwolla.com/webhook-subscriptions
`

### Errors
| HTTP Status | Message |
|--------------|-------------|

## Get Subscription by ID

> Request:

```shell
GET /webhook-subscriptions/f4d21628-fde2-4d3a-b69a-0a7cb42adc4c
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/webhook-subscriptions/f4d21628-fde2-4d3a-b69a-0a7cb42adc4c"
    },
    "webhooks": {
      "href": "https://api.dwolla.com/webhook-subscriptions/f4d21628-fde2-4d3a-b69a-0a7cb42adc4c/webhooks"
    }
  },
  "id": "f4d21628-fde2-4d3a-b69a-0a7cb42adc4c",
  "url": "https://destination.url",
  "created": "2015-08-19T21:43:49.000Z"
}
```

Retrieve a webhook subscription by its ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`
GET https://api.dwolla.com/webhook-subscriptions/{id}
`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Webhook subscription not found. |

## Get a Webhook Subscription's Hooks

> Request:

```shell
GET /webhook-subscriptions/10d4133e-b308-4646-b276-40d9d36def1c/webhooks
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
            "created": "2015-07-23T14:19:37.006Z",
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
            "created": "2015-07-23T14:19:37.006Z",
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

View all fired [Webhooks](#webhooks) for a Webhook Subscription.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`
GET https://api.dwolla.com/webhook-subscriptions/{id}/webhooks
`

### Errors
| HTTP Status | Message |
|--------------|-------------|