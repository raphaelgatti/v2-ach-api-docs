# Envio

## Envio de SMS simples

Allows you to send a single SMS message:

```http
POST https://api-messaging.movile.com/v1/send-sms
Content-Type: application/json
```

[Try It](try.html#eyJ1c2VyIjoiIiwiYXV0aCI6IiIsIm1ldGhvZCI6IlBPU1QiLCJ1cmwiOiJodHRwczovL2FwaS1tZXNzYWdpbmcubW92aWxlLmNvbS92MS9zZW5kLXNtcyIsImNvbnRlbnRUeXBlIjoiYXBwbGljYXRpb24vanNvbiIsImJvZHkiOiJ7XG4gIFwiZGVzdGluYXRpb25cIjogXCIxMjNcIiAsXG4gIFwibWVzc2FnZVRleHRcIjogXCJteSBtc2dcIlxufSIsInBhcmFtcyI6e319)

### Request

The body of the request has to contain a ```Json``` object in which the information is enveloped with the following allowed fields.

<span class="green-asterisk">`*`</span> field is required

Field              | Details                                | Type            
------------------ | -------------------------------------- | :-------------:
`destination*`      | Phone number to which the message will be sent (included country code). Example: `5519900001111` | ```String```    
`messageText*`      | Text message that will be sent to the destination number | ```String```    
`correlationId`    | Your defined `id` that will be returned in a confirmation message(callback). This is useful in case you want to keep track of the sent message, since you can set different `id`s for different messages | ```String```    
`extraInfo`        | Any extra info you want to attach to the message. For example, a `Json` | ```String```    
`timeWindow`       | Messages will be sent only during the given window. For example, if you set the `timeWindow` with `[11, 12, 18]`, the message will be sent between 11:00 and 11:59, 12:00 and 12:59 and between 18:00 and 18:59 | ```Integer[]```
`expiresAt`        | The message will not be sent after this date. It is an [Epoch Date](https://en.wikipedia.org/wiki/Unix_time). The fields `expiresAt`, `expiresInMinutes` and `expiresDate` are mutually exclusives (use only one of them) | ```Long```      
`expiresInMinutes` | Time in minutes after the request during which the message is still valid for sending. After this time, the message will not be sent. The fields `expiresAt`, `expiresInMinutes` and `expiresDate` are mutually exclusives (use only one of them) | ```Long```      
`expiresDate`      | The message will not be sent after this date. This field follows the format `yyyy-MM-dd'T'HH:mm:ss`. The fields `expiresAt`, `expiresInMinutes` and `expiresDate` are mutually exclusives (use only one of them) | ```String```    
`scheduledAt`      | The message will be sent after this date. It is an [Epoch Date](https://en.wikipedia.org/wiki/Unix_time). The fields `scheduledAt`, `delayedInMinutes` and `scheduledDate` are mutually exclusives (use only one of them) | ```Long```      
`delayedInMinutes` | Minutes after the request to be waited before sending the message. The fields `scheduledAt`, `delayedInMinutes` and `scheduledDate` are mutually exclusives (use only one of them) | ```Long```      
`scheduledDate`    | The message will not be sent before this date. This field follows the format `yyyy-MM-dd'T'HH:mm:ss`. The fields `scheduledAt`, `delayedInMinutes` and `scheduledDate` are mutually exclusives (use only one of them) | ```String```    
`timeZone`         | Specifies the desired time zone that directly refers to the fields: `expiresDate`, `scheduledDate` and `timeWindow` (which will be changed in case of dynamic time zones, such as the ones with summer times). If the `timeZone` is not present on the request, the system will check the user's time zone - if present - or the user country's time zone in last case. If none of these settings are present, the system will use `GMT` time zone | ```String```
`campaignAlias` | Campaign identifier previously registered. [Click here](https://messaging.movile.com/messaging/user/campaigns) to register a new campaign | ```String```


<!--
 * **destination**: ```String``` (required)  
 The message will be sent to this phone
 * **messageText**: ```String``` (required)  
 Message text to be sent
 * **correlationId**: ```String``` (optional)  
 You can set your business id to track this send event
 * **expiresAt**: ```Long``` (optional)  
 Messages will not be sent after it. It is an [Epoch Date](https://en.wikipedia.org/wiki/Unix_time)
 * **expiresInMinutes**: ```Long``` (optional)  
 It will not be sent after theses minutes
 * **expiresDate**: ```String``` (optional)  
 It will not be sent after this date. Format ```yyyy-MM-dd'T'HH:mm:ssZ```
 * **extraInfo**: ```String``` (optional)  
 Any information you want to attach. A json for example
 * **timeWindow**: ```Integer[]``` (optional)  
 Messages will only be sent in the given hours of the day. -->

##### Single SMS ```Json``` request examples

Example #1:

```json
{
  "destination":"5519900001111",
  "messageText":"Hello, I am a simple message"
}
```

Example #2:

```json
{
  "destination":"5519900001111",
  "messageText":"Hello, I am a message",
  "correlationId":"myId",
  "extraInfo":"{\"name\": \"Bob\"}",
  "timeWindow":[
    11, 12, 18, 19, 20, 21
  ]
}
```

Example #3:

```json
{
  "destination":"5519900001111",
  "messageText":"Hello, I am a message",
  "correlationId":"myId",
  "extraInfo":"{\"name\": \"Bob\"}",
  "timeWindow":[
    11, 12, 18, 19, 20, 21
  ],
  "expiresDate":"2016-06-10T21:00:00",
  "scheduledDate":"2016-06-08T10:00:00",
  "timeZone":"America/Sao_Paulo"
}
```
<!-- >_This example json allows messages to be sent from 11:00 to 12:59 and 19:00 to 21:59_ -->

#### Single SMS Response

The response body will contain a ```Json``` object with tracking information about the sent message:

Field              | Details                                | Type            
------------------ | -------------------------------------- | :-------------:
`id`      | UUID generated to this SMS | ```String```   
`correlationId`      | The same ```correlationId``` from the request | ```String```   

Example ```Json``` response object:

```json
{
  "id":"9cb87d36-79af-11e5-89f3-1b0591cdf807",
  "correlationId":"myId"
}
```

## Envio em lote

Allows you to send SMS messages in bulk

<ol class="alerts">
    <li class="information icon-alert-info">Cada lote tem um limite de **1.000 mensagens** por chamada. Deseja enviar um volume maior de mensagens? Consume a sessão de FTP ou envie por nossa plataforma WEB.</li>
</ol>




```http
POST https://api-messaging.movile.com/v1/send-bulk-sms
Content-Type: application/json
```

[Try It](try.html#eyJ1c2VyIjoiIiwiYXV0aCI6IiIsIm1ldGhvZCI6IlBPU1QiLCJ1cmwiOiJodHRwczovL2FwaS1tZXNzYWdpbmcubW92aWxlLmNvbS92MS9zZW5kLWJ1bGstc21zIiwiY29udGVudFR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIiwiYm9keSI6IntcbiAgICBcIm1lc3NhZ2VzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJkZXN0aW5hdGlvblwiOiBcIjEyM1wiLFxuICAgICAgICAgICAgXCJtZXNzYWdlVGV4dFwiOiBcImFiY1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiZGVzdGluYXRpb25cIjogXCI0NTZcIixcbiAgICAgICAgICAgIFwibWVzc2FnZVRleHRcIjogXCJhYmNcIlxuICAgICAgICB9XG4gICAgXVxufSIsInBhcmFtcyI6e319)

#### Request

The body of the request has to contain a Json object in which the information is enveloped with the following allowed fields.

<span class="green-asterisk">`*`</span> field is required

Field              | Details                                | Type            
------------------ | -------------------------------------- | :-------------:
`messages*`      | Array of messages to be sent. It is the same as in [Send one SMS](#sendonesms) | ```Message[]```    
`expiresAt`<sup>1</sup>        | The message will not be sent after this date. It is an [Epoch Date](https://en.wikipedia.org/wiki/Unix_time). The fields `expiresAt`, `expiresInMinutes` and `expiresDate` are mutually exclusives (use only one of them) | ```Long```      
`expiresInMinutes`<sup>1</sup> | Time in minutes after the request during which the message is still valid for sending. After this time, the message will not be sent. The fields `expiresAt`, `expiresInMinutes` and `expiresDate` are mutually exclusives (use only one of them) | ```Long```      
`expiresDate`<sup>1</sup>      | The message will not be sent after this date. This field follows the format `yyyy-MM-dd'T'HH:mm:ss`. The fields `expiresAt`, `expiresInMinutes` and `expiresDate` are mutually exclusives (use only one of them) | ```String```    
`scheduledAt`<sup>1</sup>      | The message will be sent after this date. It is an [Epoch Date](https://en.wikipedia.org/wiki/Unix_time). The fields `scheduledAt`, `delayedInMinutes` and `scheduledDate` are mutually exclusives (use only one of them) | ```Long```      
`delayedInMinutes`<sup>1</sup> | Minutes after the request to be waited before sending the message. The fields `scheduledAt`, `delayedInMinutes` and `scheduledDate` are mutually exclusives (use only one of them) | ```Long```      
`scheduledDate`<sup>1</sup>    | The message will not be sent before this date. This field follows the format `yyyy-MM-dd'T'HH:mm:ss`. The fields `scheduledAt`, `delayedInMinutes` and `scheduledDate` are mutually exclusives (use only one of them) | ```String```    
`timeZone`<sup>1</sup>         | Specifies the desired time zone that directly refers to the fields: `expiresDate`, `scheduledDate` and `timeWindow` (which will be changed in case of dynamic time zones, such as the ones with summer times). If the `timeZone` is not present on the request, the system will check the user's time zone - if present - or the user country's time zone in last case. If none of these settings are present, the system will use `GMT` time zone | ```String```    
`timeWindow`<sup>1</sup>       | Messages will be sent only during the given window. For example, if you set the `timeWindow` with `[11, 12, 18]`, the message will be sent between 11:00 and 11:59, 12:00 and 12:59 and between 18:00 and 18:59 | ```Integer[]```
`campaignAlias`<sup>1</sup> | Campaign identifier previously registered. [Click here](https://messaging.movile.com/messaging/user/campaigns) to register a new campaign | ```String```
`defaultValues`         | Define here default messages' values for all the messages on this bulk. | ```Message```    

<sup>1</sup> If this field is present inside the `messages[]` array, it will be discarded. Please declare this field directly on the request `Json`.

##### Multiple SMS ```Json``` request examples

<!--
 * **messages**: ```Message[]``` (required)  
 Array of messages to be sent. It is the same as in ```Send one SMS```
 * **scheduledAt**: ```Long``` (optional)  
 This bulk will not be sent before it. It is an [Epoch Date](https://en.wikipedia.org/wiki/Unix_time). If this field is set, ```scheduledDate``` and ```timeZone``` will not be used
 * **scheduledDate**: ```String``` (optional)  
 These messages will not be sent before this date. Format ```yyyy-MM-dd'T'HH:mm:ss```
 * **timeZone**: ```String``` (optional)  
 [Time zone id](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) which all your dates will be formated with. Examples: ```America/Sao_Paulo```, ```+03:00```, ```-0100```, ```UTC```.
 * **delayedInMinutes**: ```Long``` (optional)  
 These messages will not be sent before these minutes
 * **defaultValues**: ```Message``` (optional)  
 Here you can set default property values for each field present on ```messages``` -->

Example #1:

```json
{
  "messages":[
    {
      "destination":"5519900001111",
      "messageText":"First message"
    },
    {
      "destination":"5519900002222"
    },
    {
      "destination":"5519900003333"
    }
  ],
  "defaultValues":{
    "messageText":"Default message"
  }
}
```
Example #2:

```json
{
  "messages":[
    {
      "destination":"5519900001111",
      "messageText":"First message"
    },
    {
      "destination":"5519900002222"
    }
  ],
  "timeZone":"America/Sao_Paulo",
  "scheduleDate": "2017-01-28T02:30:43",
  "timeWindow": [12, 15, 20],
  "defaultValues":{
    "messageText":"Default message"
  }
}
```

In the given example, because destinations ```5519900002222``` and ```5519900003333``` do not have a messageText, they will be assigned ```"Default message"``` as their message.

#### Bulk SMS Response

The response body will contain a ```Json``` object with tracking information about the sent message:


Field              | Details                                | Type            
------------------ | -------------------------------------- | :-------------:
`id`      | UUID generated to this bulk | ```String```   
`messages`      | This field is an array of [Single SMS Responses](#singlesmsresponse), each data containing an `id` and a `correlationId` of the sent messages | ```SingleSMSResponse[]```   

Example ```Json``` response object:

```json
{
  "id":"317b925a-79b0-11e5-82d3-9fb06ba220b3",
  "messages":[
    {
      "id":"715773da-79b0-11e5-afc8-dfdd0dedf87a",
      "correlationId":"myid1"
    },
    {
      "id":"717fb4bc-79b0-11e5-819e-57198aac792e",
      "correlationId":"myid2"
    }
  ]
}
```
