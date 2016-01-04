# Documents

Customers of type `personal` or `business` and of status `document` require photos of identifying documents to be uploaded for manual review in order to be verified. Currently, SDK support only exists for retrieving data with regards to a `Document` resource. To create a document, you must use an external HTTP library.

### Document resource

| Parameter | Description
|-----------|------------|
|id | Document unique identifier 
|type | Either `passport`, `driversLicense`, `idCard`, or `other`.
|status| Either `pending` or `reviewed`.  When a document has been manually reviewed by Dwolla, its status will be `reviewed`.  A reviewed document does not necessarily indicate that the customer has completed the identity verification process.
| created | ISO 8601 Timestamp of document upload time and date

```noselect
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/documents/56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc"
    }
  },
  "id": "56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc",
  "status": "pending",
  "type": "passport",
  "created": "2015-09-29T21:42:16.000Z"
}
```

## Create a document

Create a document for a Customer pending verification by uploading a photo of the document.  This requires a multipart form-data POST request.  The file must be either a `.jpg` or `.png` up to 5MB in size.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request

|Form Field| Description|
|----------|-------------|
| documentType | One of `passport`, `license`, `idCard`, or `other` |
| file | File contents.

### Request and response

```noselect
curl -X POST 
\ -H "Authorization: Bearer tJlyMNW6e3QVbzHjeJ9JvAPsRglFjwnba4NdfCzsYJm7XbckcR" 
\ -H "Accept: application/vnd.dwolla.v1.hal+json" 
\ -H "Cache-Control: no-cache" 
\ -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" 
\ -F "documentType=passport" 
\ -F "file=@foo.png" 
\ 'https://api.dwolla.com/customers/1DE32EC7-FF0B-4C0C-9F09-19629E6788CE/documents'

...

HTTP/1.1 201 Created
Location: https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0
```

## List documents

This section contains information on how to retrieve a list of documents that belong to a Customer.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/customers/{id}/documents`

### Request and response

```raw
GET https://api.dwolla.com/customers/176878b8-ecdb-469b-a82b-43ba5e8704b2/documents
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/176878b8-ecdb-469b-a82b-43ba5e8704b2/documents"
    }
  },
  "_embedded": {
    "documents": [
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/documents/56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc"
          }
        },
        "id": "56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc",
        "status": "pending",
        "type": "passport",
        "created": "2015-09-29T21:42:16.000Z"
      },
      {
        "_links": {
          "self": {
            "href": "https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0"
          }
        },
        "id": "11fe0bab-39bd-42ee-bb39-275afcc050d0",
        "status": "pending",
        "type": "passport",
        "created": "2015-09-29T21:45:37.000Z"
      }
    ]
  },
  "total": 2
}
```
```ruby
a_customer = 'https://api.dwolla.com/customers/176878b8-ecdb-469b-a82b-43ba5e8704b2/documents'

retrieved = DwollaSwagger::CustomersApi.get_customer_documents(a_customer)
p retrieved.firstName # => "Bob"
```
```php
<?php
$aCustomer = 'https://api.dwolla.com/customers/176878b8-ecdb-469b-a82b-43ba5e8704b2/documents';

$customersApi = DwollaSwagger\CustomersApi($apiClient);

$retrieved = $customersApi->getCustomerDocuments($aCustomer);
print($retrieved->total); # => "2"
?>
```
```python
a_customer = 'https://api.dwolla.com/customers/176878b8-ecdb-469b-a82b-43ba5e8704b2/documents'

customers_api = dwollaswagger.CustomersApi(client)

retrieved = customers_api.get_customer_documents(a_customer)
print(retrieved.total) # => 2
```
```javascript
// coming soon
```

## Retrieve a document

This section contains information on how to retrieve a document by its id.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP request
`GET https://api.dwolla.com/documents/{id}`

### Request and response

```raw
GET https://api.dwolla.com/documents/56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

...

{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/documents/56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc"
    }
  },
  "id": "56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc",
  "status": "pending",
  "type": "passport",
  "created": "2015-09-29T21:42:16.000Z"
}
```
```ruby
a_document = 'https://api.dwolla.com/documents/56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc'

retrieved = DwollaSwagger::DocumentsApi.get_customer(a_document)
p retrieved.type # => "passport"
```
```php
<?php
$aCustomer = 'https://api.dwolla.com/documents/56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc';

$documentsApi = DwollaSwagger\DocumentsApi($apiClient);

$retrieved = $documentsApi->getCustomer($aCustomer);
print($retrieved->type); # => "passport"
?>
```
```python
a_document = 'https://api.dwolla.com/documents/56502f7a-fa59-4a2f-8579-0f8bc9d7b9cc'

documents_api = dwollaswagger.DocumentsApi(client)

retrieved = documents_api.get_customer(a_document)
print(retrieved.type) # => "passport"
```
```javascript
// coming soon
```