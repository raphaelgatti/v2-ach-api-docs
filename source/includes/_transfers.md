# Transfers

```shell
{
  "_links": {},
  "_embedded": {},
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
  "created": "2015-08-24T14:05:17.448Z",
  "metadata": {}
}
```

A transfer represents money being transferred from a `source` to a `destination`. Transfers are available to the `Customer` and `Account` resources. 

### Transfer Resource 

| Parameter | Description
|-----------|------------|
|id | Transfer unique identifier.
|status | Either `sent`, `pending`, `cancelled`, `declined`, or `reclaimed`
|source | Source JSON object. See below. 
|destination | A Destination JSON object. See below.
|money| A Money JSON object. See below. 
|created | ISO-8601 timestamp.
|metadata | A metadata JSON object.

### Source/Destination JSON Object

| Parameter | Description
|-----------|------------|
|name | Name of Account or Customer. 
|accountId | Account unique identifier.
|displayId | String

### Money JSON Object

| Parameter | Description
|-----------|------------|
|amount | Amount of money. 
|currency | String, `USD`

## Initiate Transfer

> Request:

```shell
POST /transfers
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
    "_links": {
        "destination": {
            "href": "https://api.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8"
        },
        "source": {
            "href": "https://api.dwolla.com/funding-sources/707177c3-bf15-4e7e-b37c-55c3898d9bf4"
        }
    },
    "amount": {
        "currency": "USD",
        "value": "1.00"
    },
    "metadata": {
        "foo": "bar",
        "baz": "boo"
    }
}
```

> Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388
```

Initiate a transfer for either an account or customer resource. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `Send` [scope](#oauth-scopes).</aside>

### HTTP Request
`POST https://api.dwolla.com/transfers`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | Transfer failed. |
| 403 | OAuth token does not have Send scope. |

## Get Transfers (Customer) 

> Request:

```shell
GET /customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/transfers
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "first": {
      "href": "https://api.dwolla.com/customers/07d59716-ef22-4fe6-98e8-f3190233dfb8/transfers?limit=25&offset=0"
    },
    "last": {
      "href": "https://api.dwolla.com/customers/07d59716-ef22-4fe6-98e8-f3190233dfb8/transfers?limit=25&offset=0"
    },
    "self": {
      "href": "https://api.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8/transfers"
    }
  },
  "_embedded": {
    "transfers": [
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/transfers/8A1F44B6-354B-E511-80DA-0AA34A9B2388"
          }
        },
        "id": "8A1F44B6-354B-E511-80DA-0AA34A9B2388",
        "status": "Pending",
        "source": {
          "name": "Joe Schmoe",
          "accountId": "AD5F2162-404A-4C4C-994E-6AB6C3A13254",
          "displayId": "812-196-5766"
        },
        "destination": {
          "name": "Jane Doe",
          "accountId": "07D59716-EF22-4FE6-98E8-F3190233DFB8",
          "displayId": "812-743-0685"
        },
        "money": {
          "amount": 2200,
          "currency": "USD"
        },
        "created": "2015-08-25T14:29:37.623Z",
        "metadata": {
          "foo": "bar",
          "baz": "boo"
        }
      },
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/transfers/74C9129B-D14A-E511-80DA-0AA34A9B2388"
          }
        },
        "id": "74C9129B-D14A-E511-80DA-0AA34A9B2388",
        "status": "Pending",
        "source": {
          "name": "Joe Schmoe",
          "accountId": "AD5F2162-404A-4C4C-994E-6AB6C3A13254",
          "displayId": "812-196-5766"
        },
        "destination": {
          "name": "Jane Doe",
          "accountId": "07D59716-EF22-4FE6-98E8-F3190233DFB8",
          "displayId": "812-743-0685"
        },
        "money": {
          "amount": 1,
          "currency": "USD"
        },
        "created": "2015-08-25T02:32:59.243Z",
        "metadata": {
          "foo": "bar"
        }
      }
    ]
  },
  "total": 2
}
```

Retrieve a Customer's list of transfers.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` [scope](#oauth-scopes).</aside>

### HTTP Request
`GET https://api.dwolla.com/customers/{id}/transfers`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Customer unique identifier to get transfers for.
limit | yes | How many results to return.
offset | yes | How many results to skip.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 403 | Not authorized to list transfers. |
| 404 | Customer not found. |

## Get Transfers (Account) [DRAFT]

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
      "created": "2015-07-23T14:19:36.987Z"
    }
  ]
}
```
<aside class="warning">This endpoint is not yet implemented. The following specification is subject to change.</aside>

Retrieve an Account's list of transfers.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `Transactions` [scope](#oauth-scopes).</aside>

### HTTP Request
`GET https://api.dwolla.com/accounts/{id}/transfers`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Account unique identifier to get transfers for.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Account not found. |

## Get Transfers by ID 

> Request:

```shell
GET /transfers/38242332-374b-e511-80da-0aa34a9b2388
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/transfers/38242332-374B-E511-80DA-0AA34A9B2388"
    }
  },
  "id": "38242332-374B-E511-80DA-0AA34A9B2388",
  "status": "Pending",
  "source": {
    "name": "Joe Schmoe",
    "accountId": "AD5F2162-404A-4C4C-994E-6AB6C3A13254",
    "displayId": "812-196-5766"
  },
  "destination": {
    "name": "Jane Doe",
    "accountId": "07D59716-EF22-4FE6-98E8-F3190233DFB8",
    "displayId": "812-743-0685"
  },
  "money": {
    "amount": 5200,
    "currency": "USD"
  },
  "created": "2015-08-25T14:40:14.947Z",
  "metadata": {
    "foo": "bar"
  }
}
```

Retrieve a Transfer belonging to an Account or Customer by its ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `Transactions` [scope](#oauth-scopes).</aside>

### HTTP Request
`GET https://api.dwolla.com/transfers/{id}`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Account or Customer unique identifier to get transfers for.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Transfer not found. |