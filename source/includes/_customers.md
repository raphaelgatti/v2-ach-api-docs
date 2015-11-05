# Customers

```noselect
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/730CA23F-06C5-45CC-AA6B-8EC2D6EE109F"
    },
    "receive": {
      "href": "https://api.dwolla.com/transfers"
    },
    "funding-sources": {
      "href": "https://api.dwolla.com/customers/730CA23F-06C5-45CC-AA6B-8EC2D6EE109F/funding-sources"
    },
    "transfers": {
      "href": "https://api.dwolla.com/customers/730CA23F-06C5-45CC-AA6B-8EC2D6EE109F/transfers"
    },
    "send": {
      "href": "https://api.dwolla.com/transfers"
    }
  },
  "id": "730CA23F-06C5-45CC-AA6B-8EC2D6EE109F",
  "firstName": "Gordon",
  "lastName": "Zheng",
  "email": "gordon+20@dwolla.com",
  "type": "personal",
  "status": "verified",
  "created": "2015-10-06T01:18:26.923Z"
},
```

A customer represents an individual or business with whom you intend to transact with. In order to manage an account's Customers, the `ManageCustomers` OAuth scope is required.

### Verified and unverified customers

In any transfer, at least one party -- either the sender or the recipient -- must have their identity verified by Dwolla.  In cases where a customer is sending funds to or receiving funds from your account, the customer can remain unverified because your account is already verified.

However, if you need to transfer funds between your customers, at least one of them will need to be verified.

### Customer Links
| Link | Description|
|------|------------|
| self | URL of the Customer resource
| receive | Follow the link the create a transfer to this customer.
| funding-sources | GET this link to list the customer's funding sources.
| transfers | GET this link to list the customer's transfers
| send | (optional) If this link exists, this user can send funds.  POST to this URL to create a transfer.
| retry-verification | If the customer has a `status` of `retry`, POST to this link to attempt to correct their identity verification information.
| verify-with-document | If the customer has a `status` of `document`, POST to this link to upload a new photo document to verify the customer's identity.  Read about [Documents](#documents).

### Customer Resource

| Parameter | Description
|-----------|------------|
|id | Customer unique identifier.
|firstName | Customer's first name.
|lastName | Customer's last name.
|email | Customer's email address.
|type | Either `unverified`, `personal`, or `business`.
|status | Either `unverified`, `retry`, `document`, `verified`, or `suspended`.
|created | ISO-8601 timestamp.

### Customer statuses

| Status | Description
|--------|------------|
| unverified | Customers of type `unverified` always have this status.
| retry | The initial verification attempt failed because the information provided did not satisfy our check.  You can make one additional attempt by changing some or all the attributes of the existing customer with a POST request.
| document | Dwolla requires additional documentation to identify the customer.  Read about [Documents](#documents).
| verified | The customer is currently verified.
| suspended | The customer is suspended, and may neither send nor receive funds.

## New Customer

### Unverified customer:

```raw
POST /customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "Bob",
  "lastName": "Merchant",
  "email": "bmerchant@nomail.net",
  "ipAddress": "99.99.99.99"
}

HTTP/1.1 201 Created
Location: https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```ruby
new_customer = DwollaSwagger::CustomersApi.create({:body => {
  :firstName => 'Bob',
  :lastName => 'Merchant',
  :email => 'bmerchant@nomail.net',
  :ipAddress => '99.99.99.99'
}})

p new_customer # => https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```php
<?php
$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$new_customer = $customersApi->create([
  'firstName' => 'Bob',
  'lastName' => 'Merchant',
  'email' => 'bmerchant@nomail.net',
  'ipAddress' => '99.99.99.99'
]);

print($new_customer); # => https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
?>
```
```python
customers_api = dwollaswagger.CustomersApi(client)

new_customer = customers_api.create(body = {
  'firstName': 'Bob', 
  'lastName': 'Merchant',
  'email': 'bmerchant@nomail.net',
  'ipAddress': '99.99.99.99'
})

print(new_customer) # => https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```javascript
// coming soon
```

### Verified customer:

```raw
POST /customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "Bob",
  "lastName": "Merchant",
  "email": "bmerchant@nomail.net",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "99-99 33rd St",
  "city": "Some City",
  "state": "NY",
  "postalCode": "11101",
  "dateOfBirth": "1970-01-01",
  "ssn": "1234",
  "phone": "3478589191"
}

HTTP/1.1 201 Created
Location: https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```php
<?php
$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$new_customer = $customersApi->create([
  'firstName' => 'Bob',
  'lastName' => 'Merchant',
  'email' => 'bmerchant@nomail.net',
  'type' => 'personal',
  'address1' => '99-99 33rd St',
  'city' => 'Some City',
  'state' => 'NY',
  'postalCode' => '11101',
  'dateOfBirth' => '1970-01-01',

  # For the first attempt, only 
  # the last 4 digits of SSN required

  # If the entire SSN is provided, 
  # it will still be accepted
  'ssn' => '1234',
  'phone' => '3478589191'
]);

print($new_customer); # => https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
?>
```
```ruby
new_customer = DwollaSwagger::CustomersApi.create({:body => {
  :firstName => 'Bob',
  :lastName => 'Merchant',
  :email => 'bmerchant@nomail.net',
  :type => 'personal',
  :address1 => '99-99 33rd St',
  :city => 'Some City',
  :state => 'NY',
  :postalCode => '11101',
  :dateOfBirth => '1970-01-01',

  # For the first attempt, only 
  # the last 4 digits of SSN required

  # If the entire SSN is provided, 
  # it will still be accepted

  :ssn => '1234',
  :phone => '3478589191'}})

p new_customer # => https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```python
customers_api = dwollaswagger.CustomersApi(client)

new_customer = customers_api.create(body = {'firstName': 'Bob', 
                                            'lastName': 'Merchant',
                                            'email': 'bmerchant@nomail.net',
                                            'type': 'personal',
                                            'address1': '99-99 33rd St',
                                            'city': 'Some City', 
                                            'state': 'NY',
                                            'postalCode': '11101',
                                            'dateOfBirth': '1970-01-01', 

                                            # For the first attempt, only 
                                            # the last 4 digits of SSN required

                                            # If the entire SSN is provided, 
                                            # it will still be accepted
                                            'ssn': '1234',
                                            'phone': '3478589191'})

print(new_customer) # => https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```javascript
// coming soon
```

### Validation error:

```noselect
{
  "code": "ValidationError",
  "description": "Phone invalid."
}
```

Create a new Customer.  To create an unverified customer, you only need to provide the customer's full name and email address.  Verified customers require additional information.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request
`POST https://api.dwolla.com/customers`

### Request Parameters - unverified customer
Parameter | Optional? | Description
----------|----------|-------------
firstName | no | Customer's first name.
lastName | no | Customer's last name.
email | no | Customer's email address.
ipAddress | no | Customer's IP address

### Request Parameters - verified customer
Parameter | Optional? | Description
----------|----------|-------------
firstName | no | Customer's first name.
lastName | no | Customer's last name.
email | no | Customer's email address.
ipAddress | no | Customer's IP address
type | no | Must be set to `personal`.  Note: eventually, `business` will be supported.
address1 | no | First line of the street address of the customer's permanent residence
address2 | yes | Second line of the street address of the customer's permanent residence
city | no | City of customer's peramanent residence
state | no | Two letter abbreviation of the state in which the customer resides.  e.g. `NY`
postalCode | no | Postal code of customer's peramanent residence
dateOfBirth | no | Customer's date of birth in `YYYY-MM-DD` format.
ssn | no | Last four digits of the customer's Social Security Number.
phone | no | Customer's 10 digit phone number.  No hyphens or other separators.  e.g. `3334447777`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | Duplicate customer or validation error.
| 403 | Not authorized to create customers.

## Retry Verification

### Customer must be in the retry state:

```noselect
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/730CA23F-06C5-45CC-AA6B-8EC2D6EE109F"
    },
    "funding-sources": {
      "href": "https://api.dwolla.com/customers/730CA23F-06C5-45CC-AA6B-8EC2D6EE109F/funding-sources"
    },
    "transfers": {
      "href": "https://api.dwolla.com/customers/730CA23F-06C5-45CC-AA6B-8EC2D6EE109F/transfers"
    },
    "retry-verification": {
      "href": "https://api.dwolla.com/customers/730CA23F-06C5-45CC-AA6B-8EC2D6EE109F"
    }
  },
  "id": "730CA23F-06C5-45CC-AA6B-8EC2D6EE109F",
  "firstName": "Gordon",
  "lastName": "Zheng",
  "email": "gordon+20@dwolla.com",
  "type": "personal",
  "status": "retry",
  "created": "2015-10-06T01:18:26.923Z"
}
```

### Request and Response:

```raw
POST /customers/132681FA-1B4D-4181-8FF2-619CA46235B1
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "Gordon",
  "lastName": "Zheng",
  "email": "gordon+15@dwolla.com",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "221 Corrected Address St..",
  "address2": "Fl 8",
  "city": "Ridgewood",
  "state": "NY",
  "postalCode": "11385",
  "dateOfBirth": "1990-07-11",
  "tin": "202-99-1516"
}

HTTP/1.1 200 OK
Location: https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```php
<?php
$customersApi = DwollaSwagger\CustomersApi($apiClient);

$retryLocation = 'https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F';

$retryCustomer = $customersApi->updateCustomer($retryLocation, array (
  'firstName' => 'Gordon',
  'lastName' => 'Zheng',
  'email' => 'gordon+15@dwolla.com',
  'ipAddress' => '10.10.10.10',
  'type' => 'personal',
  'address1' => '221 Corrected Address St..',
  'address2' => 'Fl 8',
  'city' => 'Ridgewood',
  'state' => 'NY',
  'postalCode' => '11385',
  'dateOfBirth' => '1990-07-11',
  'tin' => '202-99-1516',
););

print($retryCustomer); # => https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
?>
```
```ruby
retry_location = 'https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F'

retry_customer = DwollaSwagger::CustomersApi.update_customer(retry_location, {:body => {
      "firstName" => "Gordon",
       "lastName" => "Zheng",
          "email" => "gordon+15@dwolla.com",
      "ipAddress" => "10.10.10.10",
           "type" => "personal",
       "address1" => "221 Corrected Address St..",
       "address2" => "Fl 8",
           "city" => "Ridgewood",
          "state" => "NY",
     "postalCode" => "11385",
    "dateOfBirth" => "1990-07-11",
            "tin" => "202-99-1516"
}})

p retry_customer # => https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```python
customers_api = dwollaswagger.CustomersApi(client)

retry_location = 'https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F'

retry_customer = customers_api.update_customer(retry_location, body = {
  "firstName": "Gordon",
  "lastName": "Zheng",
  "email": "gordon+15@dwolla.com",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "221 Corrected Address St..",
  "address2": "Fl 8",
  "city": "Ridgewood",
  "state": "NY",
  "postalCode": "11385",
  "dateOfBirth": "1990-07-11",
  "tin": "202-99-1516"
})

print(retry_customer) # => https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```javascript
// coming soon
```

### Validation error:

```noselect
{
  "code": "ValidationError",
  "description": "Phone invalid."
}
```

### If you try more than once, or customer is not in retry state:

```noselect
{
  "code": "InvalidResourceState",
  "description": "Resource cannot be modified."
}
```

If the customer has a status of `retry`, some information may have been miskeyed. You have one more opportunity to correct any mistakes using this endpoint. This time, you’ll need to provide the customer’s full SSN.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request
`POST https://api.dwolla.com/customers/{id}`

### Request Parameters - retry verified customer
Parameter | Optional? | Description
----------|----------|-------------
firstName | no | Customer's first name.
lastName | no | Customer's last name.
email | no | Customer's email address.
ipAddress | no | Customer's IP address
type | no | Must be set to `personal`.  Note: eventually, `business` will be supported.
address1 | no | First line of the street address of the customer's permanent residence
address2 | yes | Second line of the street address of the customer's permanent residence
city | no | City of customer's peramanent residence
state | no | Two letter abbreviation of the state in which the customer resides.  e.g. `NY`
postalCode | no | Postal code of customer's peramanent residence
dateOfBirth | no | Customer's date of birth in `YYYY-MM-DD` format.
ssn | no | The customer's *full* Social Security Number.
phone | yes | Customer's 10 digit phone number.  No hyphens or other separators.  e.g. `3334447777`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | Duplicate customer or validation error.
| 403 | Not authorized to create customers.

## List Customers

### Request:

```raw
GET /customers
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

```json
{
  "_links": {
    "first": {
      "href": "https://api.dwolla.com/customers?limit=25&offset=0"
    },
    "last": {
      "href": "https://api.dwolla.com/customers?limit=25&offset=0"
    },
    "self": {
      "href": "https://api.dwolla.com/customers?limit=25&offset=0"
    }
  },
  "_embedded": {
    "customers": [
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F"
          }
        },
        "id": "FC451A7A-AE30-4404-AB95-E3553FCD733F",
        "firstName": "Bob",
        "lastName": "Dole",
        "email": "bob@dole.com",
        "type": "unverified",
        "status": "unverified",
        "created": "2015-09-03T23:56:10.023Z"
      }
    ]
  },
  "total": 1
}
```

Retrieve a list of Customers which belong to the authorized user.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request
`GET https://api.dwolla.com/customers`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
limit | yes | How many results to return.
offset | yes | How many results to skip.

### Errors
| HTTP Status | Message |
|--------------|-------------|

## Get a Customer by ID

### Request:

```raw
GET /customers/07D59716-EF22-4FE6-98E8-F3190233DFB8
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

```raw
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F"
    }
  },
  "id": "FC451A7A-AE30-4404-AB95-E3553FCD733F",
  "firstName": "Bob",
  "lastName": "Dole",
  "email": "bob@dole1.com",
  "type": "unverified",
  "status": "unverified",
  "created": "2015-09-03T23:56:10.023Z"
}
```

Retrieve a Customer which belongs to the authorized user.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request
`GET https://api.dwolla.com/customers/{id}`

### Request Parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Customer unique identifier.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 403 | Not authorized to get a customer by id. |
| 404 | Customer not found. |