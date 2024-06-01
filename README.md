# WhatsApp API

## About Our WhatsApp API

🔓 **Unlock the Potential of WhatsApp:** Powerful Integration with Our Unofficial API!

### Efficient Group Management on WhatsApp

📋 Our stable, though unofficial, API allows for efficient management of WhatsApp groups. Simplify administration, and easily add or remove members.

### Versatile Message Sending

💬 With our API, you can send text, audio, video, and image messages quickly and easily. Adapt to your business communication needs comprehensively.

### Receive Instant Events

🔔 Stay updated with our API, receiving real-time events when new messages are received. Stay connected and agile in responding to interactions on WhatsApp.

🔗 **Create Your Account:** Visit [https://api-wa.me/sign-up](https://api-wa.me/sign-up) to create your account and start using our API today!

🎁 **Special Discount:** Use the coupon **GIT20** and get 20% off on your first instance!

## Contact Support

- **Name:** Raphael Serafim
- **Email:** [support@api-wa.me](mailto:support@api-wa.me)
- **Website:** [https://api-wa.me](https://api-wa.me)

## Installation

```bash
 ```

```js
const whatsapp = new WhatsApp({ server: "https://us.api-wa.me", key: "12345678" });
const to = "559999999999" //  If you want to send it to the group = 123456789@us
```

### Get Information
```js
whatsapp.info().then((response) => {
  console.log(response)
}).catch(console.error)
```

### Connect to WhatsApp
```js
whatsapp.connect().then((response) => {
 console.log(response)
}).catch(console.error);
```

### Logout
```js
whatsapp.logout().then((response) => {
 console.log(response)
}).catch(console.error);
```

### Get Contacts
```js
whatsapp.contacts().then((response) => {
 console.log(response)
}).catch(console.error)
```

## Send Messages

### Presence
```js
whatsapp.sendMessage({
  type: TypeMessage.PRESENCE,
  body: {
    to: to,
    status: StatusPresence.COMPOSING
  }
}).then((response) => {
 console.log(response)
}).catch(console.error)
```

### Text
```js
whatsapp.sendMessage({
  type: TypeMessage.TEXT,
  body: {
    to: to,
    text: "Hey"
  }
}).then((response) => {
 console.log(response)
}).catch(console.error)
```

### Audio
```js
whatsapp.sendMessage({
  type: TypeMessage.AUDIO,
  body: {
    to: to,
    url: ""
  }
}).then((response) => {
 console.log(response)
}).catch(console.error)
```

### Image
```js
whatsapp.sendMessage({
  type: TypeMessage.IMAGE,
  body: {
    to: to,
    url: ""
  }
}).then((response) => {
 console.log(response)
}).catch(console.error)
```

### Video
```js
whatsapp.sendMessage({
  type: TypeMessage.VIDEO,
  body: {
    to: to,
    url: ""
  }
}).then((response) => {
 console.log(response)
}).catch(console.error)
```


### Document
```js
whatsapp.sendMessage({
  type: TypeMessage.DOCUMENT,
  body: {
    to: to,
    url: "",
    mimetype: "",
    fileName: ""
  }
}).then((response) => {
 console.log(response)
}).catch(console.error)
```

### Contact
```js
whatsapp.sendMessage({
  type: TypeMessage.CONTACT,
  body: {
    to: to,
    contact: {
      fullName: "Raphael",
      phoneNumber: to,
      organization: "api-wa.me"
    }
  }
}).then((response) => {
 console.log(response)
}).catch(console.error)
```

### Reaction
```js
whatsapp.sendMessage({
  type: TypeMessage.REACTION,
  body: {
    to: to,
    msgId: "ASDDF872AHDURBSG",
    text: "🤖"
  }
}).then((response) => {
 console.log(response)
}).catch(console.error)
```

### All types of submissions you can respond to a message, so for example

### Text
```js
whatsapp.sendMessage({
  type: TypeMessage.TEXT,
  body: {
    msgId: "SKJH455AJKJ",
    to: to,
    text: "Hey"
  }
}, true ).then((response) => {
 console.log(response)
}).catch(console.error)
```

## Group Management

### List Groups
```js
whatsapp.groups().then((response) => {
 console.log(response)
}).catch(console.error)
```

### Group Information
```js
whatsapp.infoGroup("123456789@us").then((response) => {
 console.log(response)
}).catch(console.error)
```

### Create a Group
```js
whatsapp.createGroup("Devs", [to]).then((response) => {
 console.log(response)
}).catch(console.error)
```

### Update a Group
```js
whatsapp.updateGroup("123456789@us", "Devs", "Only developers !").then((response) => {
 console.log(response)
}).catch(console.error)
```