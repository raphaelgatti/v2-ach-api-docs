#OAuth
```always
  /$$$$$$   /$$$$$$              /$$     /$$      
 /$$__  $$ /$$__  $$            | $$    | $$      
| $$  \ $$| $$  \ $$ /$$   /$$ /$$$$$$  | $$$$$$$ 
| $$  | $$| $$$$$$$$| $$  | $$|_  $$_/  | $$__  $$
| $$  | $$| $$__  $$| $$  | $$  | $$    | $$  \ $$
| $$  | $$| $$  | $$| $$  | $$  | $$ /$$| $$  | $$
|  $$$$$$/| $$  | $$|  $$$$$$/  |  $$$$/| $$  | $$
 \______/ |__/  |__/ \______/    \___/  |__/  |__/                                                          
                             
```

Dwolla's API lets you interact with a user's Dwolla account and act on its behalf to send money, request money, and more.  To do so, your application first needs to request authorization from users.  

Dwolla implements the [OAuth 2.0 standard](http://oauth.net/2/) to facilitate this authorization. Similar to Facebook and Twitter's authentication flow, the user is first presented with a permission dialog for your application, at which point the user can either approve the permissions requested, or reject them. Once the user approves, an `authorization_code` is sent to your application, which will then [be exchanged](#finish-authorization) for an `access_token` and a `refresh_token` pair. 

The `access_token` can then be used to make API calls which require user authentication like [Send](#send-money) or [List Transactions](#list-a-user's-transactions). 

### Token lifetimes

**Access tokens** are *short lived*: 1 hour.

**Refresh tokens** are *long lived*: 60 days.

A refresh token can be used within 60 days to generate a new access_token and refresh_token pair.  So long as you [refresh your authorization](#refresh-authorization) at least every 60 days, your application can maintain authorization indefinitely without requiring the user to re-authorize.

## Request User Authorization

```php
<?php

$OAuth = new Dwolla\OAuth();
$OAuth->settings->client_id = $apiKey;
$OAuth->settings->client_secret = $apiSecret;

$url = $OAuth->genAuthUrl("https://myredirect.com/redirect");

?>
```
```python
# Generate OAuth URL with redirect to requestb.in
print(oauth.genauthurl("http://requestb.in/122rdhc1"))
```
```js
// where to send the user after they grant permission:
var redirect_uri = "https://www.myredirect.com/redirect";  

// generate OAuth initiation URL
var authUrl = Dwolla.authUrl(redirect_uri);
```

```ruby
redirect_uri = "https://www.myredirect.com/redirect"
authUrl = Dwolla::OAuth.get_auth_url(redirect_uri)
```

> Example initiation URL (send the user there):

```shell
https://uat.dwolla.com/oauth/v2/authenticate?client_id=PO%2BSzGAsZCE4BTG7Cw4OAL40Tpf1008mDjGBSVo6QLNfM4mD%2Ba&response_type=code&redirect_uri=https://developers.dwolla.com/dev/token/callback?env=sandbox&scope=Balance%7CAccountInfoFull
```

To start the OAuth process, construct the initiation URL which the user will visit in order to grant permission to your application.  It describes the permissions your application requires (`scope`), who the client application is (`client_id`), and where the user should be redirected to after they grant or deny permissions to your application (`redirect_uri`).


### URL Format:

`
https://www.dwolla.com/oauth/v2/authenticate?client_id={client_id}&response_type=code&redirect_uri={redirect_uri}&scope={scope}
`


Parameter | Optional |Description
----------|----------|------------
client_id | | Application key
response_type | | This must always be set to `code`
redirect_uri | | URL where the user will be redirected to afterwards. The value of this parameter must match one of the values that appear in your [application details](https://www.dwolla.com/applications) page. (We compare: protocol, subdomain, domain, tld, and file path. Querystring parameters are ignored)
scope | | Permissions you are requesting.  See [below](#oauth-scopes) for list of available scopes.  Scopes are delimited by a pipe ("&#124;")
verified_account | yes | Require new users opting to register for Dwolla to create a fully-verified Dwolla account instead of a default lightweight Direct account.

<aside class="notice">
Remember to url-encode all querystring parameters!
</aside>


### OAuth Scopes

Applications may request the following permission scopes when generating an access token:

Scope Name | Description
-----------|-------------
AccountInfoFull | Access detailed account profile
Contacts | Access the user's contacts
Transactions | Access the user's transaction data
Balance | Access the user's Dwolla account balance
Send | Send money on the user's behalf
Request | Send money requests, list them, fulfill them
Funding | Access the user's funding sources (i.e. connected bank accounts)
ManageAccount | Manage the user's account settings
Scheduled | Allow scheduling one-time and recurring payments.
ManageCustomers | Includes create customer records, manage their funding sources, and allow related money movement

## Finish User Authorization

```json
{
  "client_id": "JCGQXLrlfuOqdUYdTcLz3rBiCZQDRvdWIUPkw++GMuGhkem9Bo",
  "client_secret": "g7QLwvO37aN2HoKx1amekWi8a2g7AIuPbD5C/JSLqXIcDOxfTr",
  "code": "h6TvQZH+5BsV//O43uOJ0uRkBLk=",
  "grant_type": "authorization_code",
  "redirect_uri": "https://www.myredirect.com/redirect"
}
```

> Successful Response:

```shell
{
  "access_token": "4Qu79qhO5GkPwo4fsbuc9ve4mJKN/XnxcT34F812y6SBIyGrnP",
  "expires_in": 3600,
  "refresh_token": "mRRYs+CXrwe67kIDa1XFIiZJsEzUEbMerrU3zlmFSqo51obG3d",
  "refresh_expires_in": 5183765,
  "token_type": "bearer",
  "scope": "balance|accountinfofull|send|request|transactions|contacts|funding|manageaccount|scheduled|managecustomers"
}
```

Once the user returns to your application via the `redirect_uri` you specified, there will be a `code` querystring parameter appended to that URL.  Exchange the authorization `code` for an `access_token` and `refresh_token` pair.

### HTTP Request
`POST https://www.dwolla.com/oauth/v2/token`

Parameter | Description
----------|------------
client_id | Application key
client_secret | Application secret
code | The authorization code included in the redirect URL
grant_type | This must be set to `authorization_code`
redirect_uri | The same redirect_uri specified in the intiation step

### Response Parameters

Parameter | Description
----------|------------
access_token | A new access token with requested scopes
expires_in | The lifetime of the access token, in seconds.  Default is 3600.
refresh_token | New refresh token
refresh_expires_in | The lifetime of the refresh token, in seconds.  Default is 5184000.
token_type | Always `bearer`.
scope | Pipe (`&#124;`) delimited list of permission scopes granted

## Refresh Authorization
```json
{
  "client_id": "JCGQXLrlfuOqdUYdTcLz3rBiCZQDRvdWIUPkw++GMuGhkem9Bo",
  "client_secret": "g7QLwvO37aN2HoKx1amekWi8a2g7AIuPbD5C/JSLqXIcDOxfTr",
  "refresh_token": "Pgk+l9okjwTCfsvIvEDPrsomE1er1txeyoaAkTIBAuXza8WvZY",
  "grant_type": "refresh_token"
}
```

> Successful Response:

```shell
{
  "access_token": "4Qu79qhO5GkPwo4fsbuc9ve4mJKN/XnxcT34F812y6SBIyGrnP",
  "expires_in": 3600,
  "refresh_token": "mRRYs+CXrwe67kIDa1XFIiZJsEzUEbMerrU3zlmFSqo51obG3d",
  "refresh_expires_in": 5184000,
  "token_type": "bearer",
  "scope": "balance|accountinfofull|send|request|transactions|contacts|funding|manageaccount|scheduled|managecustomers"
}
```

> Invalid or Expired Refresh Token Response:

```shell
{
  "error": "access_denied",
  "error_description": "Invalid refresh token."
}
{
  "error": "access_denied",
  "error_description": "Expired refresh token."
}
```

Use a valid `refresh_token` to generate a new `access_token` and `refresh_token` pair.

**NOTE:** The `refresh_token` you receive will *change* every time you exchange either an `authorization_code` or `refresh_token` for a new token pair. Only the most recently issued `refresh_token` will allow you to receive a new pair.

### HTTP Request
`POST https://www.dwolla.com/oauth/v2/token`

Parameter | Description
----------|------------
client_id | Application key
client_secret | Application secret
refresh_token | A valid refresh token
grant_type | This must be set to `refresh_token`
scope | Pipe (`|`) delimited list of permission scopes granted

### Response Parameters

Parameter | Description
----------|------------
access_token | A new access token with requested scopes
expires_in | The lifetime of the access token, in seconds.  Default is 3600.
refresh_token | New refresh token
refresh_expires_in | The lifetime of the refresh token, in seconds.  Default is 5184000.
token_type | Always `bearer`.


## Client Access Token

```
{
  "client_id": "JCGQXLrlfuOqdUYdTcLz3rBiCZQDRvdWIUPkw++GMuGhkem9Bo",
  "client_secret": "g7QLwvO37aN2HoKx1amekWi8a2g7AIuPbD5C/JSLqXIcDOxfTr",
  "grant_type": "client_credentials"
}
```

> Successful Response

```
{
  "access_token": "SF8Vxx6H644lekdVKAAHFnqRCFy8WGqltzitpii6w2MVaZp1Nw",
  "token_type": "bearer",
  "expires_in": 3600,
  "scope": "AccountInfoFull|ManageAccount|Contacts|Transactions|Balance|Send|Request|Funding"
}
```

Some endpoints require a *client access token*, which is different from a user access token.  Client access tokens don't require any particular user's authorization, since they grant your application access to resources which belong to the application itself, rather than an account.  You'll only need to provide your client credentials to receive a client access token.

### HTTP Request

`POST https://www.dwolla.com/oauth/v2/token`

Parameter | Description
----------|------------
client_id | Application key
client_secret | Application secret
grant_type | This must be set to `client_credentials`

### Response Parameters

Parameter | Description
----------|------------
access_token | A new access token with requested scopes
expires_in | The lifetime of the access token, in seconds.  Default is 3600.
token_type | Always `bearer`.
scope | Pipe (`&#124;`) delimited list of permission scopes granted