# Funding Sources

```json
{
    "routingNumber": "87654321",
    "accountNumber": "12345678",
    "type": "checking",
    "name": "My Bank"
}
```

Add and retrieve ACH bank accounts via Funding Sources, which are available to the `Customers` and `Accounts` resources.  Customers can have a maximum of 6 funding sources.

### Funding Source Resource

Parameter | Description
----------|------------
id | The funding source unique identifier.
status | Is the funding source verified?
type | Type of funding source.
name | Arbitrary nickname for the funding source.
created | ISO-8601 timestamp.

## New Funding Source (Customer)

> Request:

```shell
POST /customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
    "routingNumber": "87654321",
    "accountNumber": "12345678",
    "type": "checking",
    "name": "My Bank"
}
```

> Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/funding-sources/58d20353-2b4b-4d68-8b89-3e5dab12b15a
```

Create a new Funding Source for a Customer.  Customers can have a maximum of 6 funding sources.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` [scope](#oauth-scopes).</aside>

### HTTP Request
`POST https://api.dwolla.com/customers/{id}/funding-sources`

### Request Parameters
Parameter | Optional? | Description
----------|------------|------------
routingNumber | no | The bank account's routing number.
accountNumber | no | The bank account number.
type | no | Type of bank account: `checking` or `savings`.
name | no | Arbitrary nickname for the funding source.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | Duplicate funding source or validation error.
| 403 | Not authorized to create funding source.

## List Funding Sources (Customer)

> Request:

```shell
GET /customers/5b29279d-6359-4c87-a318-e09095532733/funding-sources
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/5b29279d-6359-4c87-a318-e09095532733/funding-sources"
    },
    "customer": {
      "href": "https://api.dwolla.com/customers/5b29279d-6359-4c87-a318-e09095532733"
    }
  },
  "_embedded": {
    "funding-sources": [
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/funding-sources/ab9cd5de-9435-47af-96fb-8d2fa5db51e8"
          },
          "customer": {
            "href": "https://api.dwolla.com/customers/5b29279d-6359-4c87-a318-e09095532733"
          },
          "with-available-balance": {
            "href": "https://api.dwolla.com/funding-sources/ab9cd5de-9435-47af-96fb-8d2fa5db51e8"
          }
        },
        "id": "ab9cd5de-9435-47af-96fb-8d2fa5db51e8",
        "status": "verified",
        "type": "balance",
        "name": "Balance",
        "created": "2015-10-02T21:00:28.153Z"
      },
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/funding-sources/98c209d3-02d6-4bee-bc0f-61e18acf0e33"
          },
          "customer": {
            "href": "https://api.dwolla.com/customers/5b29279d-6359-4c87-a318-e09095532733"
          }
        },
        "id": "98c209d3-02d6-4bee-bc0f-61e18acf0e33",
        "status": "verified",
        "type": "bank",
        "name": "John Doe - Checking account1",
        "created": "2015-10-02T22:03:45.537Z"
      }
    ]
  }
}
```

Retrieve a list of Funding Sources that belong to a Customer.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` [scope](#oauth-scopes).</aside>

### HTTP Request
`
GET https://api.dwolla.com/customers/{id}/funding-sources
`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Customer unique identifier.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 403 | Not authorized to list funding sources.
| 404 | Customer not found. |

## New Funding Source (Account) [DRAFT]

> Request:

```shell
POST /accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
    "routingNumber": "87654321",
    "accountNumber": "12345678",
    "type": "checking",
    "name": "My Bank"
}
```

> Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources
```
<aside class="warning">This endpoint is not yet implemented. The following specification is subject to change.</aside>

Create a new Funding Source for an Account.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `Funding` [scope](#oauth-scopes).</aside>

### HTTP Request
`POST https://api.dwolla.com/accounts/{id}/funding-sources`

### Request Parameters
Parameter | Description
----------|------------
accountNumber | The bank account number.
routingNumber | The bank account's routing number.
type | Type of bank account: `checking` or `savings`.
name | Arbitrary nickname for the funding source.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | Duplicate funding source or validation error.
| 403 | Not authorized to create funding source.

## List Funding Sources (Account)

> Request:

```shell
GET /accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254/funding-sources
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254/funding-sources"
    }
  },
  "_embedded": {
    "funding-sources": [
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/funding-sources/b268f6b9-db3b-4ecc-83a2-8823a53ec8b7"
          },
          "account": {
            "href": "https://api.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254"
          },
          "with-available-balance": {
            "href": "https://api.dwolla.com/funding-sources/b268f6b9-db3b-4ecc-83a2-8823a53ec8b7"
          }
        },
        "id": "b268f6b9-db3b-4ecc-83a2-8823a53ec8b7",
        "status": "verified",
        "type": "balance",
        "name": "Balance",
        "created": "2014-07-09T20:39:32.940Z"
      },
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/funding-sources/707177c3-bf15-4e7e-b37c-55c3898d9bf4"
          },
          "account": {
            "href": "https://api.dwolla.com/accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254"
          }
        },
        "id": "707177c3-bf15-4e7e-b37c-55c3898d9bf4",
        "status": "verified",
        "type": "bank",
        "name": "First Midwestern Bank",
        "created": "2014-07-09T20:39:37.043Z"
      }
    ]
  }
}
```

Retrieve a list of Funding Sources that belong to an Account.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `Funding` [scope](#oauth-scopes).</aside>

### HTTP Request
`
GET https://api.dwolla.com/accounts/{id}/funding-sources
`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Account unique identifier to get funding sources for.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 403 | Not authorized to list funding sources.

## Get a Funding Source by ID

> Request:

```shell
GET /funding-sources/ab9cd5de-9435-47af-96fb-8d2fa5db51e8
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/funding-sources/ab9cd5de-9435-47af-96fb-8d2fa5db51e8"
    },
    "customer": {
      "href": "https://api.dwolla.com/customers/5b29279d-6359-4c87-a318-e09095532733"
    }
  },
  "id": "ab9cd5de-9435-47af-96fb-8d2fa5db51e8",
  "status": "verified",
  "type": "balance",
  "name": "Balance",
  "created": "2015-10-02T21:00:28.153Z",
  "balance": {
    "value": "0.00",
    "currency": "USD"
  }
}
```

Retrieve a Funding Source by ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `Funding` [scope](#oauth-scopes).</aside>

### HTTP Request
`
GET https://api.dwolla.com/funding-sources/{id}
`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Funding source ID to get.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Funding source not found. |

## Remove a Funding Source

> Request:

```shell
DELETE /funding-sources/6c8ac833-444a-4eff-979c-c56cef6be26b
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/funding-sources/c2cefde3-b3a9-4a72-b0a4-1c844dae3604"
    },
    "customer": {
      "href": "https://api.dwolla.com/customers/01b47cb2-52ac-42a7-926c-6f1f50b1f271"
    }
  },
  "id": "c2cefde3-b3a9-4a72-b0a4-1c844dae3604",
  "status": "verified",
  "type": "bank",
  "name": "John Doe - Checking account1",
  "created": "2015-10-02T19:25:50.548Z"
}
```

Remove a Funding Source by ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `Funding` [scope](#oauth-scopes).</aside>

### HTTP Request
`
DELETE https://api.dwolla.com/funding-sources/{id}
`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Funding source ID to delete.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Funding source not found. |