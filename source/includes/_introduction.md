# Introduction

Welcome to the Dwolla API V2 documentation, currently in active development. Gradually, the functionality of API V1 will be implemented in API V2.  The two versions will operate in parallel for the foreseeable future.

The initial focus of API Version 2 centers around a premium feature: [White Label](https://www.dwolla.com/white-label), and will not provide the same functionality as Version 1 does.  Over time, we will add the same functionality currently available in V1 to V2.

Official SDKs for Java, Node.JS, PHP, Ruby, and Python are being actively developed.

It is important to note: White Label is a premium feature that cannot be activated in our production environment until you’ve received our approval to use it and have entered into an agreement with us. Feel free to [contact a sales representative](https://www.dwolla.com/contact?b=apidocs) to find the package that best suits your needs.

## Making Requests

```noselect
POST https://api.dwolla.com/customers
Content-Type: application/json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer myOAuthAccessToken123

{
  "foo": "bar"
}

... or ...

GET https://www.dwolla.com/oauth/rest/transactions?client_id=XYZ&client_secret=JJJ&limit=10
```

All requests should supply the `Accept: application/vnd.dwolla.v1.hal+json` header. `POST` requests must have a JSON encoded body and the `Content-Type: application/vnd.dwolla.v1.hal+json` header.

Requests must be made over HTTPS.  Any non-secure requests are met with a redirect (HTTP 302) to the HTTPS equivalent URI.

### Authorization

Request and response bodies are JSON encoded.

All requests require either an OAuth access token or a `client_id` and `client_secret`.  OAuth access tokens are passed via the `Authorization` HTTP header:

`Authorization: Bearer {access_token_here}`

Requests that require an client_id and client_secret are passed in the JSON request body for `POST` requests or as querystring parameters for `GET` requests:

`GET https://api.dwolla.com/example?client_id={client_id}&client_secret={client_secret}`

### API Host
**Production:** https://api.dwolla.com

**Sandbox:** https://api-uat.dwolla.com


## Errors

Error responses use HTTP status codes to indicate the type of error. The JSON response body will contain a top-level error code and a message which is a detailed description of the error. Errors will contain their own media type and will closely align with [this spec](https://github.com/blongden/vnd.error).

### Example HTTP 401 error

```noselect
{
  "code": "InvalidAccessToken",
  "description": "Invalid access token.",
  "message": "Invalid access token."
}
```

### Common Errors
The following errors are common across all API endpoints.

| HTTP Status | Error Code | Description
|-------------|------|-------------
| 400 | BadRequest | The request body contains bad syntax or is incomplete. |
| 400 | ValidationError | Validation error(s) present. See embedded errors list for more details. ([See below](#validation-errors)) |
| 401 | InvalidCredentials | Missing or invalid Authorization header. |
| 401 | InvalidAccessToken | Invalid access token. |
| 401 | ExpiredAccessToken | Generate a new access token using a valid refresh token. |
| 401 | InvalidAccountStatus | Invalid access token account status. |
| 401 | InvalidApplicationStatus | Invalid application status. |
| 401 | InvalidScopes | Missing or invalid scopes for requested endpoint. |
| 403 | Forbidden | The supplied credentials are not authorized for this resource. |
| 403 | InvalidResourceState | Resource cannot be modified. |
| 404 | NotFound | The requested resource was not found. |
| 405 | MethodNotAllowed | (varies) |
| 406 | InvalidVersion | Missing or invalid API version. |
| 500 | ServerError | A server error occurred. Error ID: 63e92a2a-fb48-4a23-ab4c-24a6764f1593. |
| 500 | RequestTimeout | The request timed out. |

### Validation Errors
Responses with a top-level error code of `ValidationError` are returned when you can correct a specific problem with your request. Included within the response will be a message/description of: "Validation error(s) present. See embedded errors list for more details." At least one, but possibly more, detailed errors will be present in the list of embedded errors. Multiple errors are represented in a collection of embedded error objects.

#### _embedded JSON Object

| Parameter | Description
|-----------|------------|
|errors | An array of JSON object(s) that contain a `code`, `message`, and `path`.

The `path` field is a json pointer to the specific field in the request that has a problem. The `message` is a human readable description of the problem. The `code` fields is a detailed error code that can have one of the following values:

- Required
- Invalid - not a valid value for this field
- InvalidFormat - chars in an amount field, for instance
- Duplicate - "A customer with the specified email already exists."
- ReadOnly - this field is not allowed to be modified
- NotAllowed - value, while valid/exists, is not allowed to be used
- Restricted - account or customer restricted from this activity
- InsufficientFunds - used on source or destination fields of transfer endpoint
- RequiresFundingSource - used on destination field of transfer endpoint to indicate customer needs a bank
- FileTooLarge - used on document upload

#### Example HTTP 400 ValidationError

```json
{
    "code": "ValidationError",
    "description": "Validation error(s) present. See embedded errors list for more details.",
    "message": "Validation error(s) present. See embedded errors list for more details.",
    "_embedded": {
        "errors": [
            {
                "code": "Required",
                "message": "FirstName is required.",
                "path": "/firstName",
            }
        ]
    }
}
```

## Links

```noselect
{
  "_links": {
    "self": {
      "href": "https://api.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1"
    },
    "funding-sources": {
      "href": "https://api.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1/funding-sources"
    },
    "transfers": {
      "href": "https://api.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1/transfers"
    },
    "retry-verification": {
      "href": "https://api.dwolla.com/customers/132681FA-1B4D-4181-8FF2-619CA46235B1"
    }
  },
  "id": "132681FA-1B4D-4181-8FF2-619CA46235B1",
  "firstName": "Gordon",
  "lastName": "Zheng",
  "email": "gordon+15@dwolla.com",
  "type": "personal",
  "status": "retry",
  "created": "2015-09-29T19:47:28.920Z"
}
```

Relationships and available actions for a resource are represented with links.  All resources have a `_links` attribute.  At a minimum, all resources will have a `self` link which indicates the URL of the resource itself.

Some links, such as `funding-sources`, give you a URL which you can follow to access related resources.  For example, the customer resource has a `funding-sources` link which, when followed, will list the customer's available funding sources.

Responses which contain a collection of resources have pagination links, `first`, `next`, `last`, and `prev`.

Other links represent actions which can be done with the resource.  For instance, customers which are eligible to send funds have a `send` link which directs you to the [transfer](#initiate-transfer) endpoint.