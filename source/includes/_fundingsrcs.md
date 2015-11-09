# Funding Sources

```noselect
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

### Request and Response:

```raw
POST /customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
{
    "routingNumber": "222222226",
    "accountNumber": "123456789",
    "type": "checking",
    "name": "John Doe - Checking"
}

HTTP/1.1 201 Created
Location: https://api.dwolla.com/funding-sources/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```php
<?php
$fundingApi = new DwollaSwagger\FundingsourcesApi($apiClient);

$new_fs = $fundingApi->createCustomerFundingSource(
       ["routingNumber": "222222226",
        "accountNumber": "123456789",
        "type": "checking",
        "name": "John Doe - Checking"], "https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C");

print($new_fs); # => https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
?>
```
```ruby
new_fs = DwollaSwagger::FundingsourcesApi.create_customer_funding_source \ 
('https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C', {:body => {
                                                    :routingNumber => '222222226',
                                                    :accountNumber => '123456789',
                                                    :type => 'checking',
                                                    :name => 'John Doe - Checking'
                                                 }})

p new_fs # => https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
```
```python
funding_api = dwollaswagger.FundingsourcesApi(client)

new_fs = funding_api.create_customer_funding_source('https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C', body = {"routingNumber": "222222226",
        "accountNumber": "123456789",
        "type": "checking",
        "name": "John Doe - Checking"})

p new_fs # => https://api-uat.dwolla.com/funding-sources/375c6781-2a17-476c-84f7-db7d2f6ffb31
```
```javascript
// coming soon
```


Create a new Funding Source for a Customer.  Customers can have a maximum of 6 funding sources.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

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

### Request:

```shell
GET /customers/5b29279d-6359-4c87-a318-e09095532733/funding-sources
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

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

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

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

### Request:

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

### Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/accounts/99bfb139-eadd-4cdf-b346-7504f0c16c60/funding-sources
```

<ol class="alerts">
    <li class="error icon-alert-cross">This endpoint is not yet implemented. The following specification is subject to change.</li>
</ol>

Create a new Funding Source for an Account.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Funding` <a href="#oauth-scopes">scope</a>.</li>
</ol>

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

### Request:

```shell
GET /accounts/ad5f2162-404a-4c4c-994e-6ab6c3a13254/funding-sources
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

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

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Funding` <a href="#oauth-scopes">scope</a>.</li>
</ol>

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

### Request:

```shell
GET /funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c"
    },
    "customer": {
      "href": "https://api.dwolla.com/customers/36e9dcb2-889b-4873-8e52-0c9404ea002a"
    },
    "initiate-micro-deposits": {
      "href": "https://api.dwolla.com/funding-sources/692486f8-29f6-4516-a6a5-c69fd2ce854c/micro-deposits"
    }
  },
  "id": "692486f8-29f6-4516-a6a5-c69fd2ce854c",
  "status": "unverified",
  "type": "bank",
  "name": "Test checking account",
  "created": "2015-10-23T20:37:57.137Z"
}
```

Retrieve a Funding Source by ID.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Funding` <a href="#oauth-scopes">scope</a>.</li>
</ol>

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

## Initiate or Verify Micro-deposits

> Request: (Initiate Micro-deposits)

```shell
POST /funding-sources/7f057c28-66cc-45f8-8a28-5d76d27579c5/micro-deposits
Accept: application/vnd.dwolla.v1.hal+json
Content-Type: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```shell
HTTP/1.1 201 Created
https://api.dwolla.com/funding-sources/7f057c28-66cc-45f8-8a28-5d76d27579c5/micro-deposits
```

> Request: (Verify Micro-deposits)

```shell
POST /funding-sources/7f057c28-66cc-45f8-8a28-5d76d27579c5/micro-deposits
Accept: application/vnd.dwolla.v1.hal+json
Content-Type: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
  "amount1": {
    "value": "0.02",
    "currency": "USD"
  },
  "amount2": {
    "value": "0.06",
    "currency": "USD"
  }
}
```

> Response:

```json
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/funding-sources/7f057c28-66cc-45f8-8a28-5d76d27579c5/micro-deposits"
    }
  }
}
```

Initiate or verify micro deposits for bank verification. 

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Funding` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request
`
POST https://api.dwolla.com/funding-sources/{id}/micro-deposits
`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
amount1 | no | An amount JSON object of first micro-deposit. Contains `value` and `currency`.
amount2 | no | An amount JSON object of first micro-deposit. Contains `value` and `currency`.


### Errors
| HTTP Status | Message |
|--------------|-------------|
| 200 | Micro deposits verified.  |
| 201 | Micro deposits initiated. |
| 400 | Funding source not found. |
| 404 | Funding source not found. |

## Verify Pending Micro-deposits Exist

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
      "href": "https://api-uat.dwolla.com/funding-sources/6c7de5af-e73e-45a9-946a-cdadec1ee0bb/micro-deposits"
    },
    "verify-micro-deposits": {
      "href": "https://api-uat.dwolla.com/funding-sources/6c7de5af-e73e-45a9-946a-cdadec1ee0bb/micro-deposits"
    }
  }
}
```

Check if pending verification for micro-deposits exists.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Funding` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request
`GET https://api.dwolla.com/funding-sources/{id}/micro-deposits`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Funding source ID to check status of validation deposits.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 200 | Pending micro-deposits exist. |

## Remove a Funding Source

### Request:

```shell
DELETE /funding-sources/6c8ac833-444a-4eff-979c-c56cef6be26b
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

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

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Funding` <a href="#oauth-scopes">scope</a>.</li>
</ol>

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