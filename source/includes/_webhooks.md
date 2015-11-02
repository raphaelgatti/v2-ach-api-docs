# Webhooks

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8"
    },
    "subscription": {
      "href": "https://api.dwolla.com/webhook-subscriptions/a0943041-7a5c-4e8f-92de-b55711ef3a83"
    },
    "retry": {
      "href": "https://api.dwolla.com/webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8/retries"
    },
    "event": {
      "href": "https://api.dwolla.com/events/03c7e14c-7f15-44a2-bcf7-83f2f7e95d50"
    }
  },
  "id": "9ece9660-aa34-41eb-80d7-0125d53b45e8",
  "topic": "transfer_created",
  "accountId": "ad5f2162-404a-4c4c-994e-6ab6c3a13254",
  "eventId": "03c7e14c-7f15-44a2-bcf7-83f2f7e95d50",
  "subscriptionId": "a0943041-7a5c-4e8f-92de-b55711ef3a83",
  "attempts": [
    {
      "id": "d4d16621-c6b0-40cb-8dc3-0469fa9dc4e8",
      "request": {
        "timestamp": "2015-10-27T17:07:34.304Z",
        "url": "https://myapp.runscope.net",
        "headers": [
          {
            "name": "X-Dwolla-Topic",
            "value": "transfer_created"
          },
          {
            "name": "X-Request-Signature",
            "value": "bd93780bd7e1ad77ab821094aaa0f9e3dece5ee3"
          }
        ],
        "body": "{\"id\":\"03c7e14c-7f15-44a2-bcf7-83f2f7e95d50\",\"resourceId\":\"81BA6F36-CD7C-E511-80DB-0AA34A9B2388\",\"topic\":\"transfer_created\",\"timestamp\":\"2015-10-27T17:07:34.207Z\",\"_links\":{\"self\":{\"href\":\"https://api.dwolla.com/events/03c7e14c-7f15-44a2-bcf7-83f2f7e95d50\"},\"account\":{\"href\":\"https://api.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254\"},\"resource\":{\"href\":\"https://api.dwolla.com/transfers/81BA6F36-CD7C-E511-80DB-0AA34A9B2388\"}}}"
      },
      "response": {
        "timestamp": "2015-10-27T17:07:34.308Z",
        "headers": [
          {
            "name": "Date",
            "value": "Tue, 27 Oct 2015 17:07:34 GMT"
          },
          {
            "name": "Content-Type",
            "value": "application/json; charset=UTF-8"
          },
          {
            "name": "Content-Length",
            "value": "1093"
          },
          {
            "name": "Connection",
            "value": "keep-alive"
          },
          {
            "name": "Access-Control-Allow-Credentials",
            "value": "true"
          },
          {
            "name": "Access-Control-Allow-Methods",
            "value": "GET, PUT, POST, PATCH, DELETE, OPTIONS, HEAD"
          },
          {
            "name": "Server",
            "value": "Runscope-Gateway/1.0"
          },
          {
            "name": "Runscope-Message-Id",
            "value": "97aa5bbd-784f-4007-80cc-8f56919000a0"
          },
          {
            "name": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ],
        "statusCode": 200,
        "body": "{\"body\":\"{\"id\":\"03c7e14c-7f15-44a2-bcf7-83f2f7e95d50\",\"resourceId\":\"81BA6F36-CD7C-E511-80DB-0AA34A9B2388\",\"topic\":\"transfer_created\",\"timestamp\":\"2015-10-27T17:07:34.207Z\",\"_links\":{\"self\":{\"href\":\"https://api.dwolla.com/events/03c7e14c-7f15-44a2-bcf7-83f2f7e95d50\"},\"account\":{\"href\":\"https://api.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254\"},\"resource\":{\"href\":\"https://api.dwolla.com/transfers/81BA6F36-CD7C-E511-80DB-0AA34A9B2388\"}}}\",\"files\":[],\"form\":{},\"fragment\":\"\",\"headers\":{\"Connection\":[\"close\"],\"Content-Length\":[\"453\"],\"Content-Type\":[\"application/json; charset=UTF-8\"],\"Host\":[\"myapp.runscope.net\"],\"User-Agent\":[\"dwolla-webhooks/1.0\"],\"X-Dwolla-Topic\":[\"transfer_created\"],\"X-Request-Signature\":[\"bd93780bd7e1ad77ab821094aaa0f9e3dece5ee3\"]},\"host\":\"myapp.runscope.net\",\"method\":\"POST\",\"params\":{},\"path\":\"/\",\"region\":\"us5\",\"runscope_host\":\"prod078.runscope.in\",\"scheme\":\"https\",\"source\":\"capture\",\"source_ip\":\"52.24.10.184\",\"timestamp\":1.4459656543078682e+09,\"url\":\"https://myapp.runscope.net/\"}"
      }
    }
  ]
}
```

When a new [Event](#events) is created and there is an active [Webhook Subscription](#webhook-subscriptions), a new Webhook is created in order to deliver that Event.  Attempted deliveries are recorded under the Webhook's `attempts` property.  Each attempt incldues the recorded request and response of the delivery attempt.

## Retrieve Webhook

### Request:

```shell
GET /webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8"
    },
    "subscription": {
      "href": "https://api.dwolla.com/webhook-subscriptions/a0943041-7a5c-4e8f-92de-b55711ef3a83"
    },
    "retry": {
      "href": "https://api.dwolla.com/webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8/retries"
    },
    "event": {
      "href": "https://api.dwolla.com/events/03c7e14c-7f15-44a2-bcf7-83f2f7e95d50"
    }
  },
  "id": "9ece9660-aa34-41eb-80d7-0125d53b45e8",
  "topic": "transfer_created",
  "accountId": "ad5f2162-404a-4c4c-994e-6ab6c3a13254",
  "eventId": "03c7e14c-7f15-44a2-bcf7-83f2f7e95d50",
  "subscriptionId": "a0943041-7a5c-4e8f-92de-b55711ef3a83",
  "attempts": [
    {
      "id": "d4d16621-c6b0-40cb-8dc3-0469fa9dc4e8",
      "request": {
        "timestamp": "2015-10-27T17:07:34.304Z",
        "url": "https://myapp.runscope.net",
        "headers": [
          {
            "name": "X-Dwolla-Topic",
            "value": "transfer_created"
          },
          {
            "name": "X-Request-Signature",
            "value": "bd93780bd7e1ad77ab821094aaa0f9e3dece5ee3"
          }
        ],
        "body": "{\"id\":\"03c7e14c-7f15-44a2-bcf7-83f2f7e95d50\",\"resourceId\":\"81BA6F36-CD7C-E511-80DB-0AA34A9B2388\",\"topic\":\"transfer_created\",\"timestamp\":\"2015-10-27T17:07:34.207Z\",\"_links\":{\"self\":{\"href\":\"https://api.dwolla.com/events/03c7e14c-7f15-44a2-bcf7-83f2f7e95d50\"},\"account\":{\"href\":\"https://api.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254\"},\"resource\":{\"href\":\"https://api.dwolla.com/transfers/81BA6F36-CD7C-E511-80DB-0AA34A9B2388\"}}}"
      },
      "response": {
        "timestamp": "2015-10-27T17:07:34.308Z",
        "headers": [
          {
            "name": "Date",
            "value": "Tue, 27 Oct 2015 17:07:34 GMT"
          },
          {
            "name": "Content-Type",
            "value": "application/json; charset=UTF-8"
          },
          {
            "name": "Content-Length",
            "value": "1093"
          },
          {
            "name": "Connection",
            "value": "keep-alive"
          },
          {
            "name": "Access-Control-Allow-Credentials",
            "value": "true"
          },
          {
            "name": "Access-Control-Allow-Methods",
            "value": "GET, PUT, POST, PATCH, DELETE, OPTIONS, HEAD"
          },
          {
            "name": "Server",
            "value": "Runscope-Gateway/1.0"
          },
          {
            "name": "Runscope-Message-Id",
            "value": "97aa5bbd-784f-4007-80cc-8f56919000a0"
          },
          {
            "name": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ],
        "statusCode": 200,
        "body": "{\"body\":\"{\"id\":\"03c7e14c-7f15-44a2-bcf7-83f2f7e95d50\",\"resourceId\":\"81BA6F36-CD7C-E511-80DB-0AA34A9B2388\",\"topic\":\"transfer_created\",\"timestamp\":\"2015-10-27T17:07:34.207Z\",\"_links\":{\"self\":{\"href\":\"https://api.dwolla.com/events/03c7e14c-7f15-44a2-bcf7-83f2f7e95d50\"},\"account\":{\"href\":\"https://api.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254\"},\"resource\":{\"href\":\"https://api.dwolla.com/transfers/81BA6F36-CD7C-E511-80DB-0AA34A9B2388\"}}}\",\"files\":[],\"form\":{},\"fragment\":\"\",\"headers\":{\"Connection\":[\"close\"],\"Content-Length\":[\"453\"],\"Content-Type\":[\"application/json; charset=UTF-8\"],\"Host\":[\"myapp.runscope.net\"],\"User-Agent\":[\"dwolla-webhooks/1.0\"],\"X-Dwolla-Topic\":[\"transfer_created\"],\"X-Request-Signature\":[\"bd93780bd7e1ad77ab821094aaa0f9e3dece5ee3\"]},\"host\":\"myapp.runscope.net\",\"method\":\"POST\",\"params\":{},\"path\":\"/\",\"region\":\"us5\",\"runscope_host\":\"prod078.runscope.in\",\"scheme\":\"https\",\"source\":\"capture\",\"source_ip\":\"52.24.10.184\",\"timestamp\":1.4459656543078682e+09,\"url\":\"https://myapp.runscope.net/\"}"
      }
    }
  ]
}
```

Retrieve a single webhook.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth *Application* access token.</li>
</ol>

### HTTP Request
`GET https://api.dwolla.com/webhooks/{id}`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Id of webhook to get.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Webhook not found. |

## Retry a Webhook by ID

### Request:

```shell
POST /webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8/retries
Accept: application/vnd.dwolla.v1.hal+json
Content-Type: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8/retries/5aa27a0f-cf99-418d-a3ee-67c0ff99a494
```

Retry a webhook by ID.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth *Application* access token.</li>
</ol>

### HTTP Request
`POST https://api.dwolla.com/webhooks/{id}/retries`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Id of webhook to retry.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Webhook not found. |

## Get Retries by ID

### Request:

```shell
GET /webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8/retries
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8/retries"
    }
  },
  "_embedded": {
    "retries": [
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8/retries/5aa27a0f-cf99-418d-a3ee-67c0ff99a494"
          },
          "webhook": {
            "href": "https://api.dwolla.com/webhooks/9ece9660-aa34-41eb-80d7-0125d53b45e8"
          }
        },
        "id": "5aa27a0f-cf99-418d-a3ee-67c0ff99a494",
        "timestamp": "2015-11-02T17:43:26.000Z"
      }
    ]
  },
  "total": 1
}
```

Retrieve webhook retries by ID.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth *Application* access token.</li>
</ol>

### HTTP Request
`GET https://api.dwolla.com/webhooks/{id}/retries`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Id of webhook to get retries for.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Webhook not found. |