# Transfers

```shell
{
  "_links": {},
  "id": "string",
  "status": "string",
  "source": {
    "name": "string",
    "accountId": "string",
    "displayId": "string"
  },
  "destination": {
    "name": "string",
    "accountId": "string",
    "displayId": "string"
  },
  "money": {
    "amount": 0,
    "currency": "string"
  },
  "timestamp": "2015-07-23T14:19:36.987Z"
}
```

A transfer represents money being transferred from a `source` to a `destination`. Transfers are available to the `Customer` and `Account` resources. 

### Transfer Resource 

| Parameter | Description
|-----------|------------|
|id | Transfer record unique identifier.  UUIDv4 format.
|status | Either `sent`, `pending`, `cancelled`, `declined`, or `reclaimed`
|source | Source JSON object. See below. 
|destination | A Destination JSON object. See below.
|money| A Money JSON object. See below. 
|timestamp| ISO-8601 timestamp.

### Source/Destination JSON Object

| Parameter | Description
|-----------|------------|
|name | Name of account or customer. 
|accountId | UUIDv4 account ID.
|displayId | String

### Money JSON Object

| Parameter | Description
|-----------|------------|
|amount | Amount of money. 
|currency | String, probably `USD`

## Get transfers (Customer) 

> Request:

```shell
GET https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers"
    }
  },
  "total": 1,
  "items": [
    {
      "_links": {
        "self": {
          "href": "https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers/a63526e1-cc8d-4a62-9d26-8f04a39da4f3"
        }
      },
      "id": "string",
      "status": "string",
      "source": {
        "name": "string",
        "accountId": "string",
        "displayId": "string"
      },
      "destination": {
        "name": "string",
        "accountId": "string",
        "displayId": "string"
      },
      "money": {
        "amount": 0,
        "currency": "string"
      },
      "timestamp": "2015-07-23T14:19:36.987Z"
    }
  ]
}
```

Fetch a Customer record's list of transfers.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`GET https://api.dwolla.com/customers/{id}/transfers`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## Get transfers by ID (Customer) 

> Request:

```shell
GET https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers/a63526e1-cc8d-4a62-9d26-8f04a39da4f3
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers/a63526e1-cc8d-4a62-9d26-8f04a39da4f3"
    }
  },
  "id": "string",
  "status": "string",
  "source": {
    "name": "string",
    "accountId": "string",
    "displayId": "string"
  },
  "destination": {
    "name": "string",
    "accountId": "string",
    "displayId": "string"
  },
  "money": {
    "amount": 0,
    "currency": "string"
  },
  "timestamp": "2015-07-23T14:19:36.987Z"
}
```

Fetch a Transfer belonging to a Customer record by its ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`GET https://api.dwolla.com/customers/{id}/transfers/{id}`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## Get transfers (Account) 

> Request:

```shell
GET https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers"
    }
  },
  "total": 1,
  "items": [
    {
      "_links": {
        "self": {
          "href": "https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers/a63526e1-cc8d-4a62-9d26-8f04a39da4f3"
        }
      },
      "id": "string",
      "status": "string",
      "source": {
        "name": "string",
        "accountId": "string",
        "displayId": "string"
      },
      "destination": {
        "name": "string",
        "accountId": "string",
        "displayId": "string"
      },
      "money": {
        "amount": 0,
        "currency": "string"
      },
      "timestamp": "2015-07-23T14:19:36.987Z"
    }
  ]
}
```

Fetch an Account record's list of transfers.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`GET https://api.dwolla.com/accounts/{id}/transfers`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## Get transfers by ID (Account) 

> Request:

```shell
GET https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers/a63526e1-cc8d-4a62-9d26-8f04a39da4f3
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers/a63526e1-cc8d-4a62-9d26-8f04a39da4f3"
    }
  },
  "id": "string",
  "status": "string",
  "source": {
    "name": "string",
    "accountId": "string",
    "displayId": "string"
  },
  "destination": {
    "name": "string",
    "accountId": "string",
    "displayId": "string"
  },
  "money": {
    "amount": 0,
    "currency": "string"
  },
  "timestamp": "2015-07-23T14:19:36.987Z"
}
```

Fetch a Transfer belonging to an Account record by its ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`GET https://api.dwolla.com/accounts/{id}/transfers/{id}`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## Initiate Transfer

> Request:

```shell
POST https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
  "fundingSourceUri": "string",
  "destinationUri": "string",
  "money": {
    "amount": 20,
    "currency": "USD"
  },
  "metadata": "so meta"
}
```

> Response:

```shell
HTTP 201
```

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers/a63526e1-cc8d-4a62-9d26-8f04a39da4f3"
    }
  }
}
```

Initiate a transfer for either an account or customer resource. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`POST https://api.dwolla.com/accounts/{id}/transfers`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |