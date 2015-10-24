# Documents

```shell
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

Customers of type `personal` or `business` and of status `document` require photos of identifying documents to be uploaded for manual review in order to be verified.  

### Document Resource

| Parameter | Description
|-----------|------------|
|id | Document unique identifier 
|type | Either `passport`, `driversLicense`, or `idCard`.
|status| Either `pending` or `reviewed`.  When a document has been manually reviewed by Dwolla, its status will be `reviewed`.  A reviewed document does not necessarily indicate that the customer has completed the identity verification process.
| created | ISO 8601 Timestamp of document upload time and date


## Create a Document

> Request:

```shell
curl -X POST 
\ -H "Authorization: Bearer tJlyMNW6e3QVbzHjeJ9JvAPsRglFjwnba4NdfCzsYJm7XbckcR" 
\ -H "Accept: application/vnd.dwolla.v1.hal+json" 
\ -H "Cache-Control: no-cache" 
\ -H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" 
\ -F "documentType=passport" 
\ -F "file=@foo.png" 
\ 'https://api.dwolla.com/customers/1DE32EC7-FF0B-4C0C-9F09-19629E6788CE/documents'
```

> Response:

```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/documents/11fe0bab-39bd-42ee-bb39-275afcc050d0
```

Create a document for a customer pending verification by uploading a photo of the document.  This requires a multipart form-data POST request.  Must provide either a `.jpg` or `.png` file up to 5MB in size.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request

|Form Field| Description|
|----------|-------------|
| documentType | One of `passport`, `driversLicense`, or `idCard` |
| file | File contents.

### Errors
| HTTP Status | Message |
|--------------|-------------|

## List Documents

> Request:

```shell
GET /customers/6f80efc0-b158-4df1-9b11-da85f0bffdd4/documents
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
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

Retrieve a list of Documents which belong to a Customer. 

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request
`GET https://api.dwolla.com/customers/{id}/documents`

### Errors
| HTTP Status | Message |
|--------------|-------------|

## Retrieve a Document

> Request:

```shell
GET /customers/6f80efc0-b158-4df1-9b11-da85f0bffdd4/documents/e6c141d5-0922-4d18-ad00-4789a37f288f
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

> Response:

```json
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

Retrieve a Document.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the `ManageCustomers` <a href="#oauth-scopes">scope</a>.</li>
</ol>

### HTTP Request
`GET https://api.dwolla.com/customers/{id}/documents/{id}`

### Errors
| HTTP Status | Message |
|--------------|-------------|