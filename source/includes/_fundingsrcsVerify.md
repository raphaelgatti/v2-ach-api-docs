# Funding Sources - Verify

<ol class="alerts">
    <li class="alert icon-alert-info">Instant account verification (IAV) is a premium feature available only for white label integrations. <a href="https://www.dwolla.com/contact?b=apidocs">Contact sales</a> for information about pricing.</li>
</ol>

```noselect
<script src="https://cdn.dwolla.com/dwolla.js"></script>
<script type="text/javascript">
  dwolla.config.dwollaUrl = 'https://uat.dwolla.com';
  dwolla.iav.start('container', token.value, function(err, res) {
    console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res))
  })
</script>
```

There are two ways to verify the ownership of a [Customer's](#customers) bank or credit union account. You can [initiate micro-deposits](#initiate-or-verify-micro-deposits) to an unverified bank account which may take the Customer 1-2 business days to verify, or you can send a Customer through the Instant Account Verification (IAV) flow which will verify a bank account in a matter of seconds. IAV allows Dwolla to quickly verify a Customer's bank account by having them authenticate using their online banking credentials, which are not stored by Dwolla. Once the bank or credit union account is verified, the Customer will be eligible to transfer money.

IAV is a simple and secure process which requires both server-side and client-side interaction. Your server requests a [single-use token](#generate-an-iav-token) which is used to represent the Customer that is adding/verifying their bank. The client-side implementation includes the dwolla.js library on the page that is used to render the IAV flow.

## Generate an IAV token (Customer)

Get a single-use IAV token for a Customer.

<ol class="alerts">
    <li class="alert icon-alert-alert">This endpoint <a href="#authentication">requires</a> an OAuth access token with the <code>ManageCustomers</code> <a href="#oauth-scopes">scope</a>.</li>
</ol>

### Request:

```noselect
POST /customers/99bfb139-eadd-4cdf-b346-7504f0c16c60/iav-verification
Content-Type: application/vnd.dwolla.v1.hal+json
Accept: application/vnd.dwolla.v1.hal+json
Authorization: Bearer pBA9fVDBEyYZCEsLf/wKehyh1RTpzjUj5KzIRfDi0wKTii7DqY
```

### Response:

```noselect
HTTP/1.1 200 OK

{
  "_links": {
    "self": {
      "href": "https://api-uat.dwolla.com/customers/5b29279d-6359-4c87-a318-e09095532733/iav-token"
    }
  },
  "token": "4adF858jPeQ9RnojMHdqSD2KwsvmhO7Ti7cI5woOiBGCpH5krY"
}
```

### HTTP Request
`POST https://api.dwolla.com/customers/{id}/iav-verification`

### Request Parameters
Parameter | Optional? | Description
----------|------------|------------
id | no | Customer unique identifier.

### Errors
| HTTP Status | Message |
|--------------|-------------|
| 404 | Customer not found. |

## Instant Account Verification (Customer)

Initiate instant account verification for a Customer.

<ol class="alerts">
    <li class="alert icon-alert-alert">An <a href="#generate-an-iav-token-customer">IAV token</a> is required to render the IAV flow.</li>
</ol>

### dwolla.js
`dwolla.js` is a Javascript library that gives you the ability to render the IAV flow within a specified container. You call the function `dwolla.iav.start()` and pass the following arguments: the container where you want IAV to render, the Customer's single-use [IAV token](#generate-an-iav-token-customer), and a callback to handle the `response` or `error`. This will initiate an HTTP request asking Dwolla to load IAV in the specified container. Once the Customer successfully completes the IAV flow, Dwolla sends a response that includes either an error or a link to the newly created and verified funding source resource.

#### Usage and configuration

##### Include dwolla.js

**Development version:**
`<script src="https://cdn.dwolla.com/1/dwolla.js"></script>`

**Production (minified) version:** 
`<script src="https://cdn.dwolla.com/1/dwolla.min.js"></script>`

##### Configure dwolla.js

```noselect
//Sandbox (UAT)
dwolla.config.dwollaUrl = 'https://uat.dwolla.com';
dwolla.config.apiUrl = 'https://api-uat.dwolla.com';

//Production
dwolla.config.dwollaUrl = 'https://www.dwolla.com';
dwolla.config.apiUrl = 'https://api.dwolla.com';
```
##### Example

```noselect
<head>
<script src="https://cdn.dwolla.com/dwolla.js"></script>
<!-- jQuery is used for example purposes -->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
</head>

<div id="controls">
  <input type="button" id="start" value="Start">
</div>
<div id="iavContainer"></div>

<script type="text/javascript">
$('#start').click(function() {
  var iavToken = '4adF858jPeQ9RnojMHdqSD2KwsvmhO7Ti7cI5woOiBGCpH5krY';
  dwolla.config.dwollaUrl = 'https://uat.dwolla.com';
  dwolla.iav.start('iavContainer', iavToken, function(err, res) {
    console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res));
  });
});
</script>
```

### Response:

```noselect
{
  "_links": {
    "funding-source": {
      "href": "https://api.dwolla.com/funding-sources/3daf2382-e0e4-444a-863e-544239a261e3"
    }
  }
}
```

### Errors
| Code | Message |
|--------------|-------------|
| UnexpectedPage |IAV navigated to an unexpected page and was cancelled. |
| InvalidIavToken |Invalid IAV token. |