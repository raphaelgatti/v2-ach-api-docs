# Hooks

```json
{
  "_links": {},
  "_embedded": {},
  "id": "string",
  "topic": "string",
  "accountId": "string",
  "eventId": "string",
  "subscriptionId": "string",
  "attempts": [
    {
      "id": "string",
      "request": {
        "timestamp": "2015-08-24T14:05:17.431Z",
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
        "timestamp": "2015-08-24T14:05:17.431Z",
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

## Get Webhook by ID

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

Retrieve a webhook by ID. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`GET https://api.dwolla.com/hooks/{id}`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Id of hook to get.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Hook not found. |

## Retry a Hook by ID

> Request:

```shell
POST /hooks/10d4133e-b308-4646-b276-40d9d36def1c/retries
Accept: application/vnd.dwolla.v1.hal+json
Content-Type: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json

```

Retry a webhook by ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`GET https://api.dwolla.com/hooks/{id}/retries`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Id of hook to retry.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Hook not found. |

## Get Retries by ID

> Request:

```shell
GET /hooks/10d4133e-b308-4646-b276-40d9d36def1c/retries
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json

```

Retrieve webhook retries by ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth *Application* access token.</aside>

### HTTP Request
`GET https://api.dwolla.com/hooks/{id}/retries`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Id of hook to get retries for.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Hook not found. |