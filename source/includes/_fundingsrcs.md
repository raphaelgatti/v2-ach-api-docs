# Funding Sources

```json
{
    "routingNumber": "87654321",
    "accountNumber": "12345678",
    "type": "Checking",
    "name": "My Bank"
}
```

Add and retrieve ACH bank accounts via Funding Sources, which are available to the `Customers` and `Accounts` resources. 

### Funding Source Resource

Parameter | Description
----------|------------
id | The funding source unique identifier.
accountId | The Customer or Account unique identifier.
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
    "type": "Checking",
    "name": "My Bank"
}
```

> Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/funding-sources/58d20353-2b4b-4d68-8b89-3e5dab12b15a
```

Create a new Funding Source for a Customer.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` [scope](#oauth-scopes).</aside>

### HTTP Request
`POST https://api.dwolla.com/customers/{id}/funding-sources`

### Request Parameters
Parameter | Optional? | Description
----------|------------|------------
routingNumber | no | The bank account's routing number.
accountNumber | no | The bank account number.
type | no | Type of bank account: `Checking` or `Savings`.
name | no | Arbitrary nickname for the funding source.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | Duplicate funding source or validation error.
| 403 | Not authorized to create funding source.

## List Funding Sources (Customer)

> Request:

```shell
GET /customers/07d59716-ef22-4fe6-98e8-f3190233dfb8/funding-sources
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/07d59716-ef22-4fe6-98e8-f3190233dfb8/funding-sources"
    },
    "customer": {
      "href": "https://api.dwolla.com/customers/07d59716-ef22-4fe6-98e8-f3190233dfb8"
    }
  },
  "_embedded": {
    "funding-sources": [
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/funding-sources/58d20353-2b4b-4d68-8b89-3e5dab12b15a"
          }
        },
        "id": "58d20353-2b4b-4d68-8b89-3e5dab12b15a",
        "accountId": "07d59716-ef22-4fe6-98e8-f3190233dfb8",
        "status": "unverified",
        "type": "bank",
        "name": "John Doe checking account",
        "created": "2015-08-25T13:39:25.737Z"
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
    "type": "Checking",
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
type | Type of bank account: `Checking` or `Savings`.
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
          }
        },
        "id": "b268f6b9-db3b-4ecc-83a2-8823a53ec8b7",
        "accountId": "ad5f2162-404a-4c4c-994e-6ab6c3a13254",
        "status": "verified",
        "type": "balance",
        "name": "Balance",
        "created": "2014-07-09T20:39:32.940Z"
      },
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/funding-sources/707177c3-bf15-4e7e-b37c-55c3898d9bf4"
          }
        },
        "id": "707177c3-bf15-4e7e-b37c-55c3898d9bf4",
        "accountId": "ad5f2162-404a-4c4c-994e-6ab6c3a13254",
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
GET /funding-sources/6c8ac833-444a-4eff-979c-c56cef6be26b
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/funding-sources/f25a65c4-494b-4619-bbb0-b4babd5093c0"
    }
  },
  "id": "f25a65c4-494b-4619-bbb0-b4babd5093c0",
  "accountId": "07d59716-ef22-4fe6-98e8-f3190233dfb8",
  "status": "unverified",
  "type": "bank",
  "name": "Jane Doe checking account",
  "created": "2015-08-20T22:00:07.626Z"
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
      "href": "https://api.dwolla.com/funding-sources/f25a65c4-494b-4619-bbb0-b4babd5093c0"
    }
  },
  "id": "f25a65c4-494b-4619-bbb0-b4babd5093c0",
  "accountId": "07d59716-ef22-4fe6-98e8-f3190233dfb8",
  "status": "unverified",
  "type": "bank",
  "name": "Jane Doe checking account",
  "created": "2015-08-20T22:00:07.626Z"
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