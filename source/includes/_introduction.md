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

`POST` requests must have a JSON encoded body and the 
`Content-Type: application/json` header.

All requests must be made over HTTPS.  Any HTTP requests are met with a HTTP 302 to its HTTPS equivalent.

<aside class="notice">
Remember to [url-encode](http://en.wikipedia.org/wiki/Percent-encoding) all GET querystring parameters!
</aside>

## Responses

> Success response

```shell
{
    "Success": true,
    "Message": "Success",
    "Response": 71332,
    "_links": null
}
```

> Error response

```shell
cf-ray → 20365e143336220a-EWR
content-length → 48
content-type → application/json; charset=UTF-8
date → Thu, 09 Jul 2015 19:17:10 GMT
server → cloudflare-nginx
status → 401 Unauthorized
version → HTTP/1.1
x-request-id → cc94309f-d6f2-4687-9a51-463ba0593f4c

{
  "code": 1,
  "description": "Expired access token."
}
```

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

| Error String | Description |
|--------------|-------------|
|foo | bar
