# Documents

```shell
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/documents/e6c141d5-0922-4d18-ad00-4789a37f288f"
    }
  },
  "id": "e6c141d5-0922-4d18-ad00-4789a37f288f",
  "mimetype": "image/png",
  "documentType": "passport"
}
```

<aside class="warning">
This is a draft specification for preview only.  Endpoint URL, request and response parameters are subject to change.  Do not develop against this documentation.
</aside>

A Document is used to verify the identity of a Customer

### Document Resource

| Parameter | Description
|-----------|------------|
|id | Customer unique identifier.
|mimetype | Standardized MIME type of document. Only `image/png` and `image/jpg+jpeg` are accepted. 
|documentType | Either `passport`, `driversLicense`, or `idCard`.


## Create a Document

> Request:

```shell
POST /customers/6f80efc0-b158-4df1-9b11-da85f0bffdd4/documents
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

```json
{
  "mimetype": "image/png",
  "documentType": "passport"
}
```

```shell
POST /customers/6f80efc0-b158-4df1-9b11-da85f0bffdd4/documents
Accept: image/png
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY

[bytes of image]
```

> Response:
```shell
HTTP/1.1 201 Created
Location: https://api.dwolla.com/customers/6f80efc0-b158-4df1-9b11-da85f0bffdd4/documents/e6c141d5-0922-4d18-ad00-4789a37f288f
```

Create a Document belonging to a Customer. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` [scope](#oauth-scopes).</aside>

### HTTP Request
1: `POST https://api.dwolla.com/customers/{id}/documents` with `Document` <br />
2: `POST https://api.dwolla.com/customers/{id}/documents` with a 5MB `*.png` or `*.jpg` image file.

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
      "href": "https://api.dwolla.com/customers/6f80efc0-b158-4df1-9b11-da85f0bffdd4/documents"
    }
  },
  "total": 1,
  "items": [
    {
      "_links": {
        "self": {
          "href": "https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/documents/e6c141d5-0922-4d18-ad00-4789a37f288f"
        }
      },
      "id": "e6c141d5-0922-4d18-ad00-4789a37f288f",
      "mimetype": "image/png",
      "documentType": "passport"
    }
  ]
}
```

Retrieve a list of Documents which belong to a Customer. 

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` [scope](#oauth-scopes).</aside>

### HTTP Request
`GET https://api.dwolla.com/customers/{id}/documents`

### Errors
| HTTP Status | Message |
|--------------|-------------|

## Retrieve Document by ID

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
        "href": "https://api.dwolla.com/customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/documents/e6c141d5-0922-4d18-ad00-4789a37f288f"
      }
    },
    "id": "e6c141d5-0922-4d18-ad00-4789a37f288f",
    "mimetype": "image/png",
    "documentType": "passport"
}
```

Retrieve a Document by its ID.

<aside class="reminder">This endpoint [requires](#authentication) an OAuth access token with the `ManageCustomers` [scope](#oauth-scopes).</aside>

### HTTP Request
`GET https://api.dwolla.com/customers/{id}/documents/{id}`

### Errors
| HTTP Status | Message |
|--------------|-------------|