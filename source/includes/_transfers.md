# Transfers

A transfer represents money being transferred from a `source` to a `destination`. Transfers are available for the `Customer` and `Account` resources.

### Transfer resource 

| Parameter | Description
|-----------|------------|
|id | Transfer unique identifier
|status | Either `processed`, `pending`, `cancelled`, `failed`, or `reclaimed`
|amount| An amount JSON object. See below 
|created | ISO-8601 timestamp
|metadata | A metadata JSON object

### Amount JSON object

| Parameter | Description
|-----------|------------|
|value | Amount of money
|currency | String, `USD`

```noselect
{
  "_links": {},
  "_embedded": {},
  "id": "string",
  "status": "string",
  "amount": {
    "value": "string",
    "currency": "string"
  },
  "created": "2015-10-02T19:48:40.485Z",
  "metadata": {}
}
```

## Initiate transfer

This section covers how to initiate a transfer for either an [Account](#accounts) or [Customer](#customers) resource.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Send` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`POST https://api.dwolla.com/transfers`

### Request parameters

Parameter | Optional? | Description
----------|------------|-------------
_links | no | A _links JSON object describing the desired `source` and `destination` of a transfer. [See below](#source-and-destination-types) for possible values for `source` and `destination`.
amount | no | An amount JSON object. [See above](#amount-json-object)
metadata | yes | A metadata JSON object with a maximum of 10 key-value pairs (each key and value must be less than 255 characters).

### Source and destination types

| Source Type | URI | Description
-------|---------|---------------
Funding source | `https://api.dwolla.com/funding-sources/{id}` | A bank or balance funding source.

| Destination Type | URI | Description
-------|---------|---------------
Account | `https://api.dwolla.com/accounts/{id}` | Destination Account of a transfer.
Customer | `https://api.dwolla.com/customers/{id}` | Destination Customer of a transfer.
Email | `mailto:johndoe@email.com` | Email address of existing Dwolla Account or recipient (recipient will create a Dwolla Account to claim funds)
Funding source | `https://api.dwolla.com/funding-sources/{id}` | Destination of an Account or verified Customer's own bank or balance funding source. **OR** A Customer's bank funding source.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | Transfer failed. |
| 403 | OAuth token does not have Send scope. |

### Request and response (transfer from Account to Customer)

```raw
POST /transfers
Accept: application/vnd.dwolla.v1.hal+json
Content-Type: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
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

...

HTTP/1.1 201 Created
Location: https://api.dwolla.com/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388
```
```ruby
new_xfer = DwollaSwagger::TransfersApi.create({:body => {

"_links" => {
  "destination" => {"href"=>"https://api.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8"}, 
  "source" => {"href"=>"https://api.dwolla.com/funding-sources/707177c3-bf15-4e7e-b37c-55c3898d9bf4"}
}, 
"amount" => {"currency"=>"USD", "value"=>"1.00"}, "metadata"=>{"foo"=>"bar", "baz"=>"boo"}}})

p new_xfer # => https://api.dwolla.com/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388
```
```php
<?php
$transfersApi = new DwollaSwagger\TransfersApi($apiClient);

$new_xfer = $transfersApi->create(array (
  '_links' => 
    array (
      'destination' => 
      array (
        'href' => 'https://api.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8',
      ),
      'source' => 
      array (
        'href' => 'https://api.dwolla.com/funding-sources/707177c3-bf15-4e7e-b37c-55c3898d9bf4',
      ),
    ),
  'amount' => 
    array (
      'currency' => 'USD',
      'value' => '1.00',
    ),
    'metadata' => 
    array (
      'foo' => 'bar',
      'baz' => 'boo',
    ),
));

print($new_xfer); # => https://api.dwolla.com/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388
?>
```
```python
transfers_api = dwollaswagger.TransfersApi(client)

new_xfer = transfers_api.create(body = {
'_links': {
    'destination': {
        'href': 'https://api.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8'
    },
    'source': {
        'href': 'https://api.dwolla.com/funding-sources/707177c3-bf15-4e7e-b37c-55c3898d9bf4'
    }
},
'amount': {
    'currency': 'USD',
    'value': '1.00'
},
'metadata': {
    'foo': 'bar',
    'baz': 'boo'
}})

print(new_xfer) # => https://api.dwolla.com/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.transfers.create({
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
      }).then(function(data) {
          console.log(data.obj); // https://api.dwolla.com/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388
      })
})
```

## Get a transfer by id

This section covers how to retrieve a transfer belonging to an Account or Customer by its id.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Transactions` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/transfers/{id}`

### Request parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | The id of the transfer to be retrieved.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Transfer not found. |

### Request and response

```raw
GET https://api.dwolla.com/transfers/4C8AD8B8-3D69-E511-80DB-0AA34A9B2388
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/transfers/4C8AD8B8-3D69-E511-80DB-0AA34A9B2388"
    },
    "source": {
      "href": "https://api.dwolla.com/accounts/ca32853c-48fa-40be-ae75-77b37504581b"
    },
    "destination": {
      "href": "https://api.dwolla.com/customers/01B47CB2-52AC-42A7-926C-6F1F50B1F271"
    }
  },
  "id": "4C8AD8B8-3D69-E511-80DB-0AA34A9B2388",
  "status": "pending",
  "amount": {
    "value": "225.00",
    "currency": "USD"
  },
  "created": "2015-10-02T19:42:32.950Z",
  "metadata": {
    "foo": "bar",
    "baz": "foo"
  }
}
```
```ruby
transfer = 'https://api.dwolla.com/transfers/4C8AD8B8-3D69-E511-80DB-0AA34A9B2388'

retrieved = DwollaSwagger::TransfersApi.by_id(transfer)
p retrieved.status # => "pending"
```
```php
<?php
$transfer = 'https://api.dwolla.com/transfers/4C8AD8B8-3D69-E511-80DB-0AA34A9B2388';

$TransfersApi = DwollaSwagger\TransfersApi($apiClient);

$retrieved = $TransfersApi->byId($transfer);
print($retrieved->status); # => "pending"
?>
```
```python
transfer = 'https://api.dwolla.com/transfers/4C8AD8B8-3D69-E511-80DB-0AA34A9B2388'

transfers_api = dwollaswagger.TransfersApi(client)
retrieved = transfers_api.by_id(transfer)

print(retrieved.status) # => pending
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.byId({id: '4C8AD8B8-3D69-E511-80DB-0AA34A9B2388'})
    .then(function(data) {
        console.log(data.obj._embedded[0].status); // pending
    })
})
```

## Get transfer failure reason

When a bank transfer fails for an Account or Customer, Dwolla returns a `failure` link when [getting the transfer by Id](#get-a-transfer-by-id). This failure link is used to retrieve the return code and description. For reference, the list of possible failure codes and descriptions are shown in the [Transfer failures](https://developers.dwolla.com/resources/bank-transfer-workflow/transfer-failures.html) resource article.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `Transactions` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request
`GET https://api.dwolla.com/transfers/{id}/failure`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Transfer unique identifier

### Request and Response

```noselect
GET https://api-uat.dwolla.com/transfers/e6d9a950-ac9e-e511-80dc-0aa34a9b2388/failure
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/transfers/E6D9A950-AC9E-E511-80DC-0AA34A9B2388/failure"
    }
  },
  "code": "R1",
  "description": "Insufficient Funds"
}
```