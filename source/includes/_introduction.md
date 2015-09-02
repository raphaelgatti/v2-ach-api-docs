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

Welcome to the Dwolla API V2 documentation, currently in active development. Gradually, the functionality of API V1 will be implemented in API V2.  The two versions will operate in parallel for the foreseeable future.  

The initial focus of API Version 2 centers around a premium feature: [White Label](https://www.dwolla.com/white-label), and will not provide the same functionality as Version 1 does.  Over time, we will add the same functionality currently currently available in V1 to V2.

Official SDKs for Java, Node.JS, PHP, Ruby, and Python are being actively developed.

It is important to note: White Label is a premium feature that cannot be activated in our production environment until you’ve received our approval to use it and have entered into an agreement with us. Feel free to [contact a sales representative](https://www.dwolla.com/contact?b=apidocs) to find the package that best suits your needs.

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

### API Endpoint
**Production:** https://api.dwolla.com

**Sandbox:** https://api-uat.dwolla.com


## Errors

> Example error.  HTTP 401:

```shell
{
  "code": "InvalidCredentials",
  "description": "Invalid access token."
}
```


Error responses use HTTP status codes to indicate the type of error.  The JSON response body will contain an error code and a description of the error.


### Common Errors
The following errors are common across all API endpoints.

| HTTP Status | Error Code | Description
|-------------|------|-------------
| 400 | Validation Error | (varies) |
| 401 | InvalidCredentials | Expired access token. |
| 401 | InvalidCredentials | Invalid access token. |
| 401 | InvalidCredentials | Missing or invalid credentials. |
| 401 | InvalidScopes | Missing or invalid scopes for requested endpoint. |
| 403 | Forbidden | The supplied credentials are not authorized for this resource. |
| 404 | NotFound | The requested resource was not found. |
| 406 | InvalidVersion | Missing or invalid API version. |
| 500 | ServerError | A server error occurred. Error ID: 63e92a2a-fb48-4a23-ab4c-24a6764f1593. |
| 500 | RequestTimeout | The request timed out. |
