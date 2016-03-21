# Accounts

An `Account` represents a Dwolla account that was either established on dwolla.com, or created inline with the capture of the user account's permissions via Dwolla's OAuth flow. A user account grants authorization to an application via [OAuth](#oauth), which gives the application permission to interact with the API on their behalf.

### Verified and unverified Accounts

With a transfer of money, at least one party must complete the identity verification process through creation of a Traditional CIP Verified Dwolla account, either the sender or the receiver. It’s your decision about which party completes this process, based on your business model, and you may want to have both parties complete the identity verification process. In cases where a Dwolla user `Account` is sending funds to or receiving funds from your `Account`, the `Account` can remain unverified because your account is already verified. However, if you need to transfer funds between your users, at least one of them will need to have a Traditional CIP Verified Dwolla account.

For more information on Traditional Dwolla accounts, both Tradtional CIP Verified and Dwolla Direct, reference the [account types](https://developers.dwolla.com/resources/account-types/traditional-accounts.html) resource article.

### Account links
| Link | Description|
|------|------------|
| self | URL of the Account resource
| receive | Follow the link to create a transfer to this Account.
| funding-sources | GET this link to list the Accounts's funding sources.
| transfers | GET this link to list the Account's transfers
| customers | (optional) If this link exists, this account can create and manage white label Customers.
| send | Follow the link to create a transfer to this Account.

```noselect
{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b"
    },
    "receive": {
      "href": "https://api-uat.dwolla.com/transfers"
    },
    "funding-sources": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/funding-sources"
    },
    "transfers": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/transfers"
    },
    "customers": {
      "href": "https://api-uat.dwolla.com/customers"
    },
    "send": {
      "href": "https://api-uat.dwolla.com/transfers"
    }
  },
  "id": "ca32853c-48fa-40be-ae75-77b37504581b",
  "name": "Charlotte Gillman"
}
```

## Get an Account by id

This section shows you how to retrieve account information belonging to the authorized user. The developer can pass either an `id` or the entire `location` resource to make this request.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token but does not require a particular scope.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/accounts/{id}`

### Request parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Account unique identifier.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 403 | Not authorized to get an Account by id. |
| 404 | Account not found. |

### Request and response

```raw
GET https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b"
    },
    "receive": {
      "href": "https://api-uat.dwolla.com/transfers"
    },
    "funding-sources": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/funding-sources"
    },
    "transfers": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/transfers"
    },
    "customers": {
      "href": "https://api-uat.dwolla.com/customers"
    },
    "send": {
      "href": "https://api-uat.dwolla.com/transfers"
    }
  },
  "id": "ca32853c-48fa-40be-ae75-77b37504581b",
  "name": "Charlotte Gillman"
}
```
```ruby
an_account = 'https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b'

retrieved = DwollaSwagger::AccountsApi.id(an_account)
p retrieved.name # => "Charlotte Gillman"
```
```php
<?php
$anAccount = 'https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b';

$accountsApi = DwollaSwagger\AccountsApi($apiClient);

$retrieved = $accountsApi->id($anAccount);
print($retrieved->name); # => "Charlotte Gillman"
?>
```
```python
an_account = 'https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b'

accounts_api = dwollaswagger.AccountsApi(client)

retrieved = accounts_api.id(an_account)
print(retrieved.name) # => Charlotte Gillman
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.accounts.id({id:'ca32853c-48fa-40be-ae75-77b37504581b'}).then(function(data) {
        console.log(data.obj._embedded.name); // Charlotte Gillman
    })
})
```

## Create an Account funding source

This section details how to add a bank account to a Dwolla account. The bank account will have a status of `unverified` upon creation. Before a Dwolla account is eligible to transfer money from their bank or credit union account they need to verify ownership of the account via [micro-deposit verification](#initiate-or-verify-micro-deposits).

For more information on micro-deposit verification, reference the [funding source verification](https://developers.dwolla.com/resources/funding-source-verification.html) resource article.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Funding` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`POST https://api.dwolla.com/funding-sources`

### Request parameters
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


### Request and response

```noselect
POST /funding-sources
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
{
    "routingNumber": "87654321",
    "accountNumber": "12345678",
    "type": "checking",
    "name": "My Bank"
}

...

HTTP/1.1 201 Created
Location: https://api-uat.dwolla.com/funding-sources/04173e17-6398-4d36-a167-9d98c4b1f1c3
```
## List an Account's funding sources

Retrieve a list of funding sources that belong to an Account.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Funding` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/accounts/{id}/funding-sources`

### Request parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Account's unique identifier.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 403 | Not authorized to list funding sources.
| 404 | Account not found. |

### Request and response

```raw
GET https://api.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/funding-sources
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/funding-sources"
    }
  },
  "_embedded": {
    "funding-sources": [
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/funding-sources/04173e17-6398-4d36-a167-9d98c4b1f1c3"
          },
          "account": {
            "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b"
          }
        },
        "id": "04173e17-6398-4d36-a167-9d98c4b1f1c3",
        "status": "verified",
        "type": "bank",
        "name": "First Midwestern Bank",
        "created": "2014-07-09T20:39:37.000Z"
      },
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/funding-sources/b268f6b9-db3b-4ecc-83a2-8823a53ec8b7"
          },
          "account": {
            "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b"
          },
          "with-available-balance": {
            "href": "https://api-uat.dwolla.com/funding-sources/b268f6b9-db3b-4ecc-83a2-8823a53ec8b7"
          }
        },
        "id": "b268f6b9-db3b-4ecc-83a2-8823a53ec8b7",
        "status": "verified",
        "type": "balance",
        "name": "Balance",
        "created": "2014-07-09T20:39:33.000Z"
      }
    ]
  }
}
```
```ruby
account = 'https://api.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b'

acct_fs = DwollaSwagger::FundingsourcesApi.get_account_funding_sources(account)
p acct_fs[0].name # => "Vera Brittain’s Checking"
```
```php
<?php
$account = 'https://api.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b';

$fsApi = DwollaSwagger\FundingsourcesApi($apiClient);

$acctFs = $fsApi->getAccountFundingSources($account);
print($acctFs[0]->name); # => "Vera Brittain’s Checking"
?>
```
```python
account = 'https://api.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b'

fs_api = dwollaswagger.FundingsourcesApi(client)
acct_fs = fs_api.get_account_funding_sources(account)

print(acct_fs[0].name) # => Vera Brittain’s Checking
```
```javascript
dwolla.then(function(dwolla) {
    dwolla['funding-sources'].getAccountFundingSources()
    .then(function(data) {
       console.log(data.obj._embedded[0].name); // Vera Brittain’s Checking
    });
});
```

## List an Account's transfers

This section covers how to retrieve an Account's list of transfers.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Transactions` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/accounts/{id}/transfers`

### Request parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Account unique identifier to get transfers for.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Account not found. |

### Request and response

```raw
GET https://api.dwolla.com/accounts/a84222d5-31d2-4290-9a96-089813ef96b3/transfers
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/accounts/a84222d5-31d2-4290-9a96-089813ef96b3/transfers"
    },
    "first": {
      "href": "https://api-uat.dwolla.com/accounts/a84222d5-31d2-4290-9a96-089813ef96b3/transfers?limit=25&offset=0"
    },
    "last": {
      "href": "https://api-uat.dwolla.com/accounts/a84222d5-31d2-4290-9a96-089813ef96b3/transfers?limit=25&offset=0"
    }
  },
  "_embedded": {
    "transfers": [
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/transfers/DC68A3DC-3C61-E511-80DA-0AA34A9B2388"
          },
          "source": {
            "href": "https://api-uat.dwolla.com/accounts/CA32853C-48FA-40BE-AE75-77B37504581B"
          },
          "destination": {
            "href": "https://api-uat.dwolla.com/accounts/A84222D5-31D2-4290-9A96-089813EF96B3"
          }
        },
        "id": "DC68A3DC-3C61-E511-80DA-0AA34A9B2388",
        "status": "processed",
        "amount": {
          "value": "50.00",
          "currency": "USD"
        },
        "created": "2015-09-22T15:16:14.180Z"
      },
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/transfers/D36FD9AA-6E5C-E511-80DA-0AA34A9B2388"
          },
          "source": {
            "href": "https://api-uat.dwolla.com/funding-sources/2BFF2631-4006-45D6-BBBD-A7BE4853E870"
          },
          "destination": {
            "href": "https://api-uat.dwolla.com/accounts/A84222D5-31D2-4290-9A96-089813EF96B3"
          }
        },
        "id": "D36FD9AA-6E5C-E511-80DA-0AA34A9B2388",
        "status": "processed",
        "amount": {
          "value": "5000.00",
          "currency": "USD"
        },
        "created": "2015-09-03T18:11:53.410Z"
      }
    ]
  },
  "total": 2
}
```
```ruby
account = 'https://api-uat.dwolla.com/accounts/a84222d5-31d2-4290-9a96-089813ef96b3'

acct_xfers = DwollaSwagger::TransfersApi.get_account_transfers(account)
p acct_xfers[0].status # => "processed"
```
```php
<?php
$account = 'https://api-uat.dwolla.com/accounts/a84222d5-31d2-4290-9a96-089813ef96b3';

$TransfersApi = DwollaSwagger\TransfersApi($apiClient);

$acctXfers = $TransfersApi->getAccountTransfers($account);
print($acctXfers[0]->status); # => "processed"
?>
```
```python
account = 'https://api-uat.dwolla.com/accounts/a84222d5-31d2-4290-9a96-089813ef96b3'

transfers_api = dwollaswagger.TransfersApi(client)
acct_xfers = transfers_api.get_account_transfers(account)

print(acct_xfers[0].status) # => processed
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.getAccountTransfers().then(function(data) {
        console.log(data.obj._embedded[0].status); // processed
    })
})
```

## List an Account's mass payments

This section covers how to retrieve an Account's list of previously created mass payments. Mass payments are returned ordered by date created, with most recent mass payments appearing first.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Transactions` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/accounts/{id}/mass-payments`

### Request parameters

| Parameter | Optional? | Description |
| ----------|------------|-------------|
| id | no | Account unique identifier to get mass payments for. |
| limit | yes | How many results to return. Defaults to 25. |
| offset | yes | How many results to skip. |

### HTTP Status and Error Codes
| HTTP Status | Code | Description |
|--------------|-------------|------------------------|
| 403 | NotAuthorized | Not authorized to list mass payments. |
| 404 | NotFound | Account not found. |

### Request and response

```raw
GET https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/mass-payments
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

....

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/mass-payments"
    },
    "first": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/mass-payments?limit=25&offset=0"
    },
    "last": {
      "href": "https://api-uat.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b/mass-payments?limit=25&offset=0"
    }
  },
  "_embedded": {
    "mass-payments": [
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/mass-payments/b4b5a699-5278-4727-9f81-a50800ea9abc"
          },
          "source": {
            "href": "https://api-uat.dwolla.com/funding-sources/84c77e52-d1df-4a33-a444-51911a9623e9"
          },
          "items": {
            "href": "https://api-uat.dwolla.com/mass-payments/b4b5a699-5278-4727-9f81-a50800ea9abc/items"
          }
        },
        "id": "b4b5a699-5278-4727-9f81-a50800ea9abc",
        "status": "complete",
        "created": "2015-09-03T14:14:10.000Z",
        "metadata": {
          "UserJobId": "some ID"
        }
      }
    ]
  },
  "total": 1
}
```
```ruby
# No example for this language yet. Coming soon.
```
```php
/**
 *  No example for this language yet. Coming soon.
 **/
```
```python
# No example for this language yet. Coming soon.
```
```javascript
/**
 *  No example for this language yet. Coming soon.
 **/
```