# Introduction
```
  _          _ _             
 | |__   ___| | | ___        
 | '_ \ / _ \ | |/ _ \       
 | | | |  __/ | | (_) |      
 |_| |_|\___|_|_|\___/     _ 
 __      _____  _ __| | __| |
 \ \ /\ / / _ \| '__| |/ _` |
  \ V  V / (_) | |  | | (_| |
   \_/\_/ \___/|_|  |_|\__,_|

```

Welcome to the Dwolla API V2 reference guide.  Find integration resources and getting started guides at developers.dwolla.com.

## Overview

The Dwolla V2 API is built with REST principles in mind.  JSON-HAL is supported.  Swagger is also supported.

Dwolla V2 API is a work in progress.  New endpoints will be built on the Dwolla V2 API instead of the previous V1 version.  We encourage all API consumers to use the V2 API where possible, and, once the V2 API supports the same set of features as V1, we encourage all API consumers to migrate to V2.  OAuth access and refresh tokens created in V1 can be used in V2.

## Making Requests

```shell
POST https://api.dwolla.com/customers
Content-Type: application/json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer myOAuthAccessToken123

{
	"foo": "bar"
}
```

```shell
...

GET https://www.dwolla.com/oauth/rest/transactions?client_id=XYZ&client_secret=JJJ&limit=10
```

All requests should supply the following headers:

`Accept: application/vnd.dwolla.v1.hal+json`

`Content-Type: application/vnd.dwolla.v1.hal+json`

Requests must be made over HTTPS.  Any non-secure requests are met with a redirect (HTTP 302) to the HTTPS equivalent URI.

### Authorization

Request and response bodies are JSON encoded.

All requests require either an OAuth access token or a `client_id` and `client_secret`.  OAuth access tokens are passed via the `Authorization` HTTP header:

`Authorization: Bearer {access_token_here}`

Requests that require an client_id and client_secret are passed in the JSON request body for `POST` requests or as querystring parameters for `GET` requests:

`GET https://api.dwolla.com/example?client_id={client_id}&client_secret={client_secret}`


## Errors

> Example error.  HTTP 401:

```shell
{
  "code": 1,
  "description": "Expired access token."
}
```


Error responses use HTTP status codes to indicate the type of error.  The JSON response body will contain an error code and a description of the error.


### Common Errors
The following errors are common across all API endpoints.

| HTTP Status | Error Code | Description
|-------------|------|-------------
| 401 | 1 | Expired access token. |
| 401 | InvalidCredentials | Invalid access token. |
| 401 | InvalidCredentials | Missing or invalid credentials. |
| 404 | NotFound | The requested resource was not found. |
| 500 | ServerError | A server error occurred. Error ID: 63e92a2a-fb48-4a23-ab4c-24a6764f1593. |
