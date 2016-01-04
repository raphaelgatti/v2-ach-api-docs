# Customers

A Customer represents an individual or business with whom you intend to transact with. In order to manage an account's Customers, the `ManageCustomers` OAuth scope is required.

### Verified and unverified customers

With a transfer of money, at least one party must complete the identity verification process, either the sender or the receiver. It’s your decision about which party completes this process, based on your business model, and you may want to have both parties complete the identity verification process. In cases where a Customer is sending funds to or receiving funds from your account, the Customer can remain unverified because your account is already verified. However, if you need to transfer funds between your Customers, at least one of them will need to be verified.

### Customer links
| Link | Description|
|------|------------|
| self | URL of the Customer resource
| receive | Follow the link to create a transfer to this Customer.
| funding-sources | GET this link to list the Customer's funding sources.
| transfers | GET this link to list the Customer's transfers
| send | (optional) If this link exists, this Customer can send funds.  POST to this URL to create a transfer.
| retry-verification | If the Customer has a `status` of `retry`, POST to this link to attempt to correct their identity verification information.
| verify-with-document | If the Customer has a `status` of `document`, POST to this link to upload a new photo document to verify the Customer's identity.  Read about [Documents](#documents).

### Customer resource

| Parameter | Description
|-----------|------------|
|id | Customer’s unique identifier.
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
| retry | The initial verification attempt failed because the information provided did not satisfy our verification check.  You can make one additional attempt by changing some or all the attributes of the existing Customer with a POST request. If the additional attempt fails, the resulting status will be either `document` or `suspended`.
| document | Dwolla requires additional documentation to identify the Customer.  Read about [Documents](#documents).
| verified | The Customer is currently verified.
| suspended | The Customer is suspended and may neither send nor receive funds.

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
  "firstName": "Charlotte",
  "lastName": "Gillman",
  "email": "yellowwallpaper@nomail.com",
  "type": "personal",
  "status": "verified",
  "created": "2015-10-06T01:18:26.923Z"
}
```

## New Customer

This section details how to create a new Customer.  To create an unverified Customer, you need to provide only the customer's full name and email address.  Verified Customers require additional information that will give Dwolla the ability to confirm the identity of the individual or business. Verified Customers can include type `business` or `personal`. For businesses, Dwolla will need to verify information about both the business and the “authorized representative” for that business.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`POST https://api.dwolla.com/customers`

### Request parameters - unverified Customer
Parameter | Optional? | Description
----------|----------|-------------
firstName | no | Customer's first name.
lastName | no | Customer's last name.
email | no | Customer's email address.
ipAddress | yes | Customer's IP address

### Request parameters - verified Customer
Parameter | Optional? | Description
----------|----------|-------------
firstName | no | Customer's first name.
lastName | no | Customer's last name.
email | no | Customer's email address.
ipAddress | yes | Customer's IP address
type | no | Either `personal` or `business`. If business, [see below](#additional-request-parameters-for-verified-customer-with-typebusiness) for additional required information.
address1 | no | First line of the street address of the Customer's permanent residence
address2 | yes | Second line of the street address of the Customer's permanent residence
city | no | City of Customer's permanent residence
state | no | Two letter abbreviation of the state in which the Customer resides, e.g. `CA`
postalCode | no | Postal code of Customer's permanent residence
dateOfBirth | no | Customer's date of birth in `YYYY-MM-DD` format.
ssn | no | Last four digits of the Customer's Social Security Number.
phone | no | Customer's 10 digit phone number.  No hyphens or other separators, e.g. `3334447777`

### Additional request parameters for verified Customer with type=business
Parameter | Optional? | Description |
----------|----------|-------------|
businessClassification | no | The [industry classification](#list-business-classifications) id that corresponds to Customer’s business  |
businessType | no | Business structure. Possible values are `corporation`, `llc`, `partnership`, and `soleproprietorship` |
businessName | no | A business name that is different from the officially registered name of Customer’s LLC or corporation. |
ein | no | Employer Identification Number |
doingBusinessAs | yes | Name that Customer is doing business as |
website | yes | www.domain.com |

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | Duplicate customer or validation error.
| 403 | Not authorized to create customers.

### Unverified Customer

```raw
POST /customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "Jane",
  "lastName": "Merchant",
  "email": "jmerchant@nomail.net",
  "ipAddress": "99.99.99.99"
}

HTTP/1.1 201 Created
Location: https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```ruby
new_customer = DwollaSwagger::CustomersApi.create({:body => {
  :firstName => Jane,
  :lastName => 'Merchant',
  :email => 'jmerchant@nomail.net',
  :ipAddress => '99.99.99.99'
}})

p new_customer # => https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```php
<?php
$customersApi = new DwollaSwagger\CustomersApi($apiClient);

$new_customer = $customersApi->create([
  'firstName' => 'Jane',
  'lastName' => 'Merchant',
  'email' => 'jmerchant@nomail.net',
  'ipAddress' => '99.99.99.99'
]);

print($new_customer); # => https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
?>
```
```python
customers_api = dwollaswagger.CustomersApi(client)

new_customer = customers_api.create(body = {
  'firstName': 'Jane', 
  'lastName': 'Merchant',
  'email': 'jmerchant@nomail.net',
  'ipAddress': '99.99.99.99'
})

print(new_customer) # => https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.create({
      "firstName": "Bob",
      "lastName": "Merchant",
      "email": "bmerchant@nomail.net",
      "ipAddress": "99.99.99.99"})
      .then(function(data) {
          console.log(data); // https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
      });
});
```

### Verified Customer

```raw
POST /customers
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "Bill",
  "lastName": "Bibbit",
  "email": "bbibbit@nomail.net",
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
  'firstName' => 'Bill',
  'lastName' => 'Bibbit',
  'email' => 'bbibbit@nomail.net',
  'type' => 'personal',
  'address1' => '99-99 33rd St',
  'city' => 'Some City',
  'state' => 'NY',
  'postalCode' => '11101',
  'dateOfBirth' => '1970-01-01',

  # For the first attempt, only the
  # last 4 digits of SSN required

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
  :firstName => 'Bill',
  :lastName => 'Bibbit',
  :email => 'bbibbit@nomail.net',
  :type => 'personal',
  :address1 => '99-99 33rd St',
  :city => 'Some City',
  :state => 'NY',
  :postalCode => '11101',
  :dateOfBirth => '1970-01-01',

  # For the first attempt, only the
  # last 4 digits of SSN required

  # If the entire SSN is provided, 
  # it will still be accepted

  :ssn => '1234',
  :phone => '3478589191'}})

p new_customer # => https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```python
customers_api = dwollaswagger.CustomersApi(client)

new_customer = customers_api.create(body = {'firstName': 'Bill', 
                                            'lastName': 'Bibbit',
                                            'email': 'bbibbit@nomail.net',
                                            'type': 'personal',
                                            'address1': '99-99 33rd St',
                                            'city': 'Some City', 
                                            'state': 'NY',
                                            'postalCode': '11101',
                                            'dateOfBirth': '1970-01-01', 

                                            # For the first attempt, only the
                                            # last 4 digits of SSN required

                                            # If the entire SSN is provided, 
                                            # it will still be accepted
                                            'ssn': '1234',
                                            'phone': '3478589191'})

print(new_customer) # => https://api-uat.dwolla.com/customers/AB443D36-3757-44C1-A1B4-29727FB3111C
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.create({
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

        // For the first attempt, only 
        // the last 4 digits of SSN required

        // If the entire SSN is provided, 
        // it will still be accepted
        "ssn": "1234",
        "phone": "3478589191"
      })
      .then(function(data) {
          console.log(data); // https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
      });
});
```

## Update Customer

This endpoint can be used to facilitate the following use cases: Update Customer information, upgrade an `unverified` Customer to a `verified` Customer, and update a verified Customer's information to `retry` verification.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`POST https://api.dwolla.com/customers/{id}`

### Update a Customer's information
A limited set of information can be updated on an existing created Customer. **Note:** A Customer's information cannot be updated when in a [status](#customer-statuses) of `document` or `suspended`.

##### Request parameters -  unverified Customer
Parameter | Optional? | Description
----------|----------|-------------
email | no | Customer's email address.

##### Request parameters -  verified Customer
Parameter | Optional? | Description
----------|----------|-------------
email | no | Customer's email address.
ipAddress | yes | Customer's IP address
address1 | no | First line of the street address of the customer's permanent residence
address2 | yes | Second line of the street address of the customer's permanent residence
city | no | City of customer's peramanent residence
state | no | Two letter abbreviation of the state in which the customer resides.  e.g. `NY`
postalCode | no | Postal code of customer's permanent residence
phone | no | Customer's 10 digit phone number.  No hyphens or other separators.  e.g. `3334447777`

##### Request parameters - verified Customer with type=business
In addition to the table above, business verified Customers can update the following fields.

Parameter | Optional? | Description
----------|----------|-------------
doingBusinessAs | yes | Name that Customer is doing business as |
website | yes | www.domain.com |

### Upgrade an unverified Customer to verified Customer
An unverified Customer can be upgraded to a verified Customer by supplying the necessary information required to create a verified Customer. See [this table](#request-parameters-verified-customer) for required information.

### Retry verification
If the verified Customer has a status of `retry`, some information may have been miskeyed. You have one more opportunity to correct any mistakes using this endpoint. This time, you’ll need to provide the Customer’s full SSN. If the additional attempt fails, the resulting status will be either `document` or `suspended`. 

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
  "firstName": "Missy",
  "lastName": "Elliott",
  "email": "missye@nomail.com",
  "type": "personal",
  "status": "retry",
  "created": "2015-10-06T01:18:26.923Z"
}
```

### Request and response

```raw
POST /customers/132681FA-1B4D-4181-8FF2-619CA46235B1
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "firstName": "Missy",
  "lastName": "Elliott",
  "email": "missye@nomail.com",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "221 Corrected Address St..",
  "address2": "Apt 201",
  "city": "San Francisco",
  "state": "CA",
  "postalCode": "94104",
  "dateOfBirth": "1970-07-11",
  "tin": "123-45-6789"
}

HTTP/1.1 200 OK
Location: https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```php
<?php
$customersApi = DwollaSwagger\CustomersApi($apiClient);

$retryLocation = 'https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F';

$retryCustomer = $customersApi->updateCustomer($retryLocation, array (
  'firstName' => 'Missy',
  'lastName' => 'Elliott',
  'email' => 'missye@nomail.com',
  'ipAddress' => '10.10.10.10',
  'type' => 'personal',
  'address1' => '221 Corrected Address St..',
  'address2' => 'Apt 201',
  'city' => 'San Francisco',
  'state' => 'CA',
  'postalCode' => '94104',
  'dateOfBirth' => '1970-07-11',
  'tin' => '123-45-6789',
););

print($retryCustomer); # => https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
?>
```
```ruby
retry_location = 'https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F'

retry_customer = DwollaSwagger::CustomersApi.update_customer(retry_location, {:body => {
      "firstName" => "Missy",
       "lastName" => "Elliott",
          "email" => "missey@nomail.com",
      "ipAddress" => "10.10.10.10",
           "type" => "personal",
       "address1" => "221 Corrected Address St..",
       "address2" => "Apt 201",
           "city" => "San Francisco",
          "state" => "CA",
     "postalCode" => "94104",
    "dateOfBirth" => "1970-07-11",
            "tin" => "123-45-6789"
}})

p retry_customer # => https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```python
customers_api = dwollaswagger.CustomersApi(client)

retry_location = 'https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F'

retry_customer = customers_api.update_customer(retry_location, body = {
  "firstName": "Missy",
  "lastName": "Elliott",
  "email": "missey@nomail.com",
  "ipAddress": "10.10.10.10",
  "type": "personal",
  "address1": "221 Corrected Address St..",
  "address2": "Apt 201",
  "city": "San Francisco",
  "state": "CA",
  "postalCode": "94104",
  "dateOfBirth": "1970-07-11",
  "tin": "123-45-6789"
})

print(retry_customer) # => https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.updateCustomer({
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
      .then(function(data) {
          console.log(data); // https://api-uat.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F
      });
});
```

### If you try more than once, or Customer is not in retry state:

```noselect
{
  "code": "InvalidResourceState",
  "description": "Resource cannot be modified."
}
```

### Request parameters - retry verified Customer
Parameter | Optional? | Description
----------|----------|-------------
firstName | no | Customer's first name.
lastName | no | Customer's last name.
email | no | Customer's email address.
ipAddress | yes | Customer's IP address
type | no | Either `personal` or `business`. If business, [see above](#additional-request-parameters-for-verified-customer-with-typebusiness) for additional required information.
address1 | no | First line of the street address of the Customer's permanent residence
address2 | yes | Second line of the street address of the Customer's permanent residence
city | no | City of Customer's permanent residence
state | no | Two letter abbreviation of the state in which the customer resides, e.g. `CA`
postalCode | no | Postal code of Customer's permanent residence
dateOfBirth | no | Customer's date of birth in `YYYY-MM-DD` format
ssn | no | Customer's *full* Social Security Number
phone | yes | Customer's 10 digit phone number.  No hyphens or other separators, e.g. `3334447777`

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 400 | Duplicate customer or validation error.
| 403 | Not authorized to create customers.

## List Customers

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/customers`

### Request parameters

Parameter | Optional? | Description
----------|------------|-------------
limit | yes | How many results to return
offset | yes | How many results to skip

### Request and response

```raw
GET /customers
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

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
        "firstName": "Elizabeth",
        "lastName": "Warren",
        "email": "liz@nomail.com",
        "type": "unverified",
        "status": "unverified",
        "created": "2015-09-03T23:56:10.023Z"
      }
    ]
  },
  "total": 1
}
```
```ruby
my_custies = DwollaSwagger::CustomersApi.list(:limit => 10)
p my_custies[0].firstName # => "Elizabeth"
```
```php
<?php
$customersApi = DwollaSwagger\CustomersApi($apiClient);

$myCusties = $customersApi->list(10);
print($myCusties[0]->firstName); # => "Elizabeth"
?>
```
```python
customers_api = dwollaswagger.CustomersApi(client)

my_custies = customers_api.list(limit=10)

print(my_custies[0].firstName) # => Elizabeth
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.list({limit:10}).then(function(data) {
        console.log(data[0].name); // Bob
    })
})
```

## Get a Customer by id

This section shows you how to retrieve a Customer belonging to the authorized user. Each `Customer` id is a part of its location resource. The developer can pass either an `id` or the entire `location` resource to make this request.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/customers/{id}`

### Request parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Customer unique identifier.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 403 | Not authorized to get a customer by id. |
| 404 | Customer not found. |

### Request and response

```raw
GET https://api-uat.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/FC451A7A-AE30-4404-AB95-E3553FCD733F"
    }
  },
  "id": "FC451A7A-AE30-4404-AB95-E3553FCD733F",
  "firstName": "Elizabeth",
  "lastName": "Warren",
  "email": "liz@nomail.com",
  "type": "unverified",
  "status": "unverified",
  "created": "2015-09-03T23:56:10.023Z"
}
```
```ruby
a_customer = 'https://api-uat.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8'

retrieved = DwollaSwagger::CustomersApi.get_customer(a_customer)
p retrieved.firstName # => "Elizabeth"
```
```php
<?php
$aCustomer = 'https://api-uat.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8';

$customersApi = DwollaSwagger\CustomersApi($apiClient);

$retrieved = $customersApi->getCustomer($aCustomer);
print($retrieved->firstName); # => "Elizabeth"
?>
```
```python
a_customer = 'https://api-uat.dwolla.com/customers/07D59716-EF22-4FE6-98E8-F3190233DFB8'

customers_api = dwollaswagger.CustomersApi(client)

retrieved = customers_api.get_customer(a_customer)
print(retrieved.firstName) # => Elizabeth
```
```javascript
dwolla.then(function(dwolla) {
    dwolla.customers.getCustomer({id:'07D59716-EF22-4FE6-98E8-F3190233DFB8'}).then(function(data) {
        console.log(data.obj._embedded.firstName); // Bob
    })
})
```

## List business classifications

Retrieve a list of industry classifications to identify the Customer’s business. An industry classification is required by Dwolla when verifying a `business` in order to better analyze the nature of a business.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/business-classifications/{id}`

### Request and response:

```noselect
GET https://api-uat.dwolla.com/business-classifications
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "_links": {},
  "_embedded": {
    "business-classifications": [
      {
        "_links": {
          "self": {
            "href": "https://api-uat.dwolla.com/business-classifications/9ed3f669-7d6f-11e3-b545-5404a6144203"
          }
        },
        "_embedded": {
          "industry-classifications": [
            {
              "id": "9ed3f671-7d6f-11e3-803c-5404a6144203",
              "name": "Gourmet foods"
            },
            {
              "id": "9ed3f66c-7d6f-11e3-86ae-5404a6144203",
              "name": "Distilleries"
            },
            {
              "id": "9ed3f66a-7d6f-11e3-8acd-5404a6144203",
              "name": "Breweries"
            },
            {
              "id": "9ed3f66d-7d6f-11e3-9101-5404a6144203",
              "name": "Alcoholic beverage drinking places"
            },
            {
              "id": "9ed3f66e-7d6f-11e3-9480-5404a6144203",
              "name": "Beer, wine, and liquor store"
            },
            {
              "id": "9ed3f66b-7d6f-11e3-95ac-5404a6144203",
              "name": "Wineries"
            },
            {
              "id": "9ed3f674-7d6f-11e3-9619-5404a6144203",
              "name": "Tobacco"
            },
            {
              "id": "9ed3f673-7d6f-11e3-adb1-5404a6144203",
              "name": "Restaurant"
            },
            {
              "id": "9ed3f676-7d6f-11e3-af8e-5404a6144203",
              "name": "Supplement store"
            },
            {
              "id": "9ed3f675-7d6f-11e3-afad-5404a6144203",
              "name": "Pharmacy and drugstore"
            },
            {
              "id": "9ed3f670-7d6f-11e3-b1ce-5404a6144203",
              "name": "Coffee and tea"
            },
            {
              "id": "9ed3f66f-7d6f-11e3-b1df-5404a6144203",
              "name": "Catering services"
            },
            {
              "id": "9ed3f672-7d6f-11e3-b67a-5404a6144203",
              "name": "Specialty and miscellaneous food store"
            }
          ]
        },
        "id": "9ed3f669-7d6f-11e3-b545-5404a6144203",
        "name": "Food retail and service"
      }
      ...........
    ]
  },
  "total": 27
}
```

## Get business classification by id

This section shows you how to retrieve a business classification from a list of industry classifications. An industry classification id is needed in order to verify a `business` Customer. 

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/business-classifications/{id}
`

### Request parameters

Parameter | Optional? | Description
----------|------------|-------------
id | no | Business classification unique identifier.

### Request and response

```noselect
GET https://api-uat.dwolla.com/business-classifications/9ed3a866-7d6f-11e3-a0ce-5404a6144203
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/business-classifications/9ed3a866-7d6f-11e3-a0ce-5404a6144203"
    }
  },
  "_embedded": {
    "industry-classifications": [
      {
        "id": "9ed3cf58-7d6f-11e3-81a4-5404a6144203",
        "name": "Toys and games"
      },
      {
        "id": "9ed3cf50-7d6f-11e3-8ae8-5404a6144203",
        "name": "Music"
      },
      {
        "id": "9ed3cf5c-7d6f-11e3-8d0e-5404a6144203",
        "name": "Gambling"
      },
      {
        "id": "9ed3cf53-7d6f-11e3-8ee9-5404a6144203",
        "name": "Cable, satellite, and other pay TV and radio broadcasting"
      },
      {
        "id": "9ed3cf59-7d6f-11e3-9158-5404a6144203",
        "name": "Slot machines"
      },
      {
        "id": "9ed3cf57-7d6f-11e3-921d-5404a6144203",
        "name": "Theater tickets"
      },
      {
        "id": "9ed3cf4f-7d6f-11e3-97ea-5404a6144203",
        "name": "Motion picture and video"
      },
      {
        "id": "9ed3cf5a-7d6f-11e3-9a99-5404a6144203",
        "name": "Digital content"
      },
      {
        "id": "9ed3cf5b-7d6f-11e3-a368-5404a6144203",
        "name": "Entertainers"
      },
      {
        "id": "9ed3a867-7d6f-11e3-a6e4-5404a6144203",
        "name": "Memorabilia"
      },
      {
        "id": "9ed3cf52-7d6f-11e3-b0da-5404a6144203",
        "name": "Music store - CDs, cassettes and albums"
      },
      {
        "id": "9ed3cf5d-7d6f-11e3-b35e-5404a6144203",
        "name": "Online gaming"
      },
      {
        "id": "9ed3cf55-7d6f-11e3-b43c-5404a6144203",
        "name": "Adult digital content"
      },
      {
        "id": "9ed3cf51-7d6f-11e3-b49f-5404a6144203",
        "name": "Movie store - DVDs, videotapes"
      },
      {
        "id": "9ed3cf5e-7d6f-11e3-b9d5-5404a6144203",
        "name": "Video games and systems"
      },
      {
        "id": "9ed3cf56-7d6f-11e3-ba87-5404a6144203",
        "name": "Concert tickets"
      },
      {
        "id": "9ed3cf54-7d6f-11e3-bf23-5404a6144203",
        "name": "Cable and other subscription programming"
      }
    ]
  },
  "id": "9ed3a866-7d6f-11e3-a0ce-5404a6144203",
  "name": "Entertainment and media"
}
```