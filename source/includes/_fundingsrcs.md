# Funding Sources

```json
{
    "account_number": "12345678",
    "routing_number": "87654321",
    "account_type": "Checking",
    "name": "My Bank",
    "isVerified": true
}
```

<aside class="warning">
This is a draft specification for preview only.  Endpoint URL, request and response parameters are subject to change.  Do not develop against this documentation.
</aside>

Add ACH bank accounts via Funding Sources, which are available to the `Customers` and `Accounts` resources. 

### Funding Source Resource

Parameter | Description
----------|------------
id | The funding source's unique identifier.
account_number | The bank account number
routing_number | The bank account's routing number.
account_type | Type of bank account: `Checking` or `Savings`.
name | Arbitrary nickname for the funding source
isVerified | (Boolean) Is the funding source verified? 


## List Funding Sources (Customer)

> Request:

```shell
GET /customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources"
    }
  },
  "total": 1,
  "items": [
    {
      "_links": {
        "self": {
          "href": "https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources/684862bc-8d94-4e53-9c41-26398b4b7fac"
        }
      },
      	"id": "684862bc-8d94-4e53-9c41-26398b4b7fac",
		"account_number": "12345678",
		"routing_number": "87654321",
		"account_type": "Checking",
		"name": "My Bank",
		"isVerified": true
    }
  ]
}
```

Fetch a list of Funding Sources that belong to a Customer.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`
GET https://api.dwolla.com/customers/{id}/funding-sources
`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## New Funding Source (Customer)

> Request:

```shell
POST /customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources/create
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
    "account_number": "12345678",
    "routing_number": "87654321",
    "account_type": "Checking",
    "name": "My Bank"
}
```

> Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources/create
```

Create a new Funding Source for a Customer.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`POST https://api.dwolla.com/customers/{id}/create`

### Request Parameters
Parameter | Description
----------|------------
account_number | The bank account number
routing_number | The bank account's routing number.
account_type | Type of bank account: `Checking` or `Savings`.
name | Arbitrary nickname for the funding source

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | A customer record with this information already exists.
| 400 | Validation errors. Another object is included the response to list the parameters and errors. 
| 401 | You do not have access to this resource.
| 500 | An unexpected error occurred.

## List Funding Sources (Account)

> Request:

```shell
GET /accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources"
    }
  },
  "total": 1,
  "items": [
    {
      "_links": {
        "self": {
          "href": "https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources/684862bc-8d94-4e53-9c41-26398b4b7fac"
        }
      },
      	"id": "684862bc-8d94-4e53-9c41-26398b4b7fac",
		"account_number": "12345678",
		"routing_number": "87654321",
		"account_type": "Checking",
		"name": "My Bank",
		"isVerified": true
    }
  ]
}
```

Fetch a list of Funding Sources that belong to an Account.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`
GET https://api.dwolla.com/accounts/{id}/funding-sources
`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | No active customer record |

## New Funding Source (Account)

> Request:

```shell
POST https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources/create
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
    "account_number": "12345678",
    "routing_number": "87654321",
    "account_type": "Checking",
    "name": "My Bank"
}
```

> Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources/create
```

Create a new Funding Source for an Account.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` scope.</aside>

### HTTP Request
`POST https://api.dwolla.com/accounts/{id}/create`

### Request Parameters
Parameter | Description
----------|------------
account_number | The bank account number
routing_number | The bank account's routing number.
account_type | Type of bank account: `Checking` or `Savings`.
name | Arbitrary nickname for the funding source

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | A customer record with this information already exists.
| 400 | Validation errors. Another object is included the response to list the parameters and errors. 
| 401 | You do not have access to this resource.
| 500 | An unexpected error occurred.