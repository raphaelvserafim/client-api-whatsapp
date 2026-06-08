# WhatsApp API

## About Our WhatsApp API

**Unlock the Potential of WhatsApp:** Powerful Integration with Our Unofficial API!

### Efficient Group Management on WhatsApp

Our stable, though unofficial, API allows for efficient management of WhatsApp groups. Simplify administration, and easily add or remove members.

### Versatile Message Sending

With our API, you can send text, audio, video, and image messages quickly and easily. Adapt to your business communication needs comprehensively.

### Receive Instant Events

Stay updated with our API, receiving real-time events when new messages are received. Stay connected and agile in responding to interactions on WhatsApp.

**Create Your Account:** Visit [https://api-wa.me/sign-up](https://api-wa.me/sign-up) to create your account and start using our API today!


## Contact Support

- **Name:** Raphael Serafim
- **Email:** [support@api-wa.me](mailto:support@api-wa.me)
- **Website:** [https://api-wa.me](https://api-wa.me)

## Installation

```bash
npm i @raphaelvserafim/client-api-whatsapp
```

```bash
yarn add @raphaelvserafim/client-api-whatsapp
```

## Quick Start

```ts
import { WhatsApp, TypeMessage, StatusPresence } from '@raphaelvserafim/client-api-whatsapp';

const wa = new WhatsApp({ server: "https://us.api-wa.me", key: "YOUR_KEY" });

const to = "559999999999"; // Group: "123456789@g.us"
```

> **Backward Compatible:** All legacy methods (`wa.sendMessage()`, `wa.groups()`, etc.) still work. The new service-based API is optional.

---

## Instance

```ts
// Connect via QR Code
const qr = await wa.instance.connect();

// Connect via Pairing Code
const code = await wa.instance.pairingCode("559999999999");

// Get instance info
const info = await wa.instance.info();

// Logout
await wa.instance.logout();

// Restart
await wa.instance.restart();

// Settings
await wa.instance.setting({
  markMessageRead: true,
  saveMedia: false,
  receiveStatusMessage: false,
  receivePresence: false,
});

// Webhook
await wa.instance.updateWebhook({
  allowWebhook: true,
  allowNumber: "all",
  webhookMessage: "https://your-webhook.com/message",
  webhookGroup: "",
  webhookConnection: "",
  webhookQrCode: "",
  webhookMessageFromMe: "",
  webhookHistory: "",
});

// Webhook Statistics
const stats = await wa.instance.webhookStatistics();

// Profile
await wa.instance.updateProfileName("My Bot");
await wa.instance.updateProfileStatus("Online");
await wa.instance.updateProfilePicture("https://avatars.githubusercontent.com/u/68257896");
await wa.instance.removeProfilePicture();

// Proxy
await wa.instance.setProxy("http://user:pass@ip:port");

// MongoDB
await wa.instance.addMongoDb("mongodb+srv://...", "mydb");

// Mobile Registration (3 steps)
await wa.instance.mobileRegisterPrepare({
  phoneNumberCountryCode: "55",
  phoneNumberNationalNumber: "99999999999",
  phoneNumberMobileNetworkCode: "11",
});
await wa.instance.mobileRequestCode("sms");
await wa.instance.mobileVerifyCode("123456");
```

## Messages

### Send Messages

```ts
// Text
await wa.message.send({
  type: TypeMessage.TEXT,
  body: { to, text: "Hello!" },
});

// Image
await wa.message.send({
  type: TypeMessage.IMAGE,
  body: { to, url: "https://a.cdn-hotels.com/gdcs/production190/d988/1071675e-1bd7-4a81-8b40-735eb9241410.jpg", caption: "Toronto" },
});

// Audio
await wa.message.send({
  type: TypeMessage.AUDIO,
  body: { to, url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
});

// Video
await wa.message.send({
  type: TypeMessage.VIDEO,
  body: { to, url: "https://www.w3schools.com/html/mov_bbb.mp4", caption: "Big Buck Bunny" },
});

// Document
await wa.message.send({
  type: TypeMessage.DOCUMENT,
  body: { to, url: "https://raphaelvserafim.com/RaphaelSerafimResume.pdf", mimetype: "application/pdf", fileName: "Resume.pdf" },
});

// Contact
await wa.message.send({
  type: TypeMessage.CONTACT,
  body: {
    to,
    contact: { fullName: "Raphael", phoneNumber: "559999999999", organization: "api-wa.me" },
  },
});

// Location
await wa.message.send({
  type: TypeMessage.LOCATION,
  body: {
    to,
    location: { latitude: 37.7749, longitude: -122.4194, address: "San Francisco, CA" },
  },
});

// Reaction
await wa.message.send({
  type: TypeMessage.REACTION,
  body: { to, msgId: "MESSAGE_ID", text: "👍" },
});

// Link Preview
await wa.message.send({
  type: TypeMessage.LINK,
  body: {
    to,
    title: "API WhatsApp",
    text: "Check out our API",
    description: "Powerful WhatsApp integration",
    thumbnailUrl: "https://avatars.githubusercontent.com/u/68257896",
    sourceUrl: "https://api-wa.me",
  },
});

// Title with Footer
await wa.message.send({
  type: TypeMessage.TITLE,
  body: { to, title: "Order #123", text: "Your order is ready", footer: "Thank you!" },
});

// Presence
await wa.message.send({
  type: TypeMessage.PRESENCE,
  body: { to, status: StatusPresence.COMPOSING },
});
```

### Reply to a Message

Pass `true` as second argument and include `msgId`:

```ts
await wa.message.send({
  type: TypeMessage.TEXT,
  body: { to, text: "This is a reply!", msgId: "ORIGINAL_MSG_ID" },
}, true);
```

### Button Messages

```ts
// Quick Reply Buttons
await wa.message.send({
  type: TypeMessage.BUTTON_REPLY,
  body: {
    to,
    header: { title: "Choose an option" },
    text: "What do you prefer?",
    footer: "Select one",
    buttons: [
      { type: "quick_reply", id: "1", text: "Yes" },
      { type: "quick_reply", id: "2", text: "No" },
    ],
  },
});

// Call to Action Buttons
await wa.message.send({
  type: TypeMessage.BUTTON_ACTION,
  body: {
    to,
    header: { title: "Actions" },
    text: "Choose an action",
    footer: "Select one",
    buttons: [
      { type: "cta_url", url: "https://api-wa.me", text: "Visit website" },
      { type: "cta_call", phone_number: "+559999999999", text: "Call us" },
      { type: "cta_copy", copy_code: "PROMO2025", text: "Copy code" },
    ],
  },
});

// Buttons with Media Header
await wa.message.send({
  type: TypeMessage.BUTTON_REPLY,
  body: {
    to,
    header: {
      title: "Check this out",
      hasMediaAttachment: true,
      imageMessage: { url: "https://a.cdn-hotels.com/gdcs/production190/d988/1071675e-1bd7-4a81-8b40-735eb9241410.jpg" },
    },
    text: "What do you think?",
    buttons: [
      { type: "quick_reply", id: "1", text: "Like" },
      { type: "quick_reply", id: "2", text: "Dislike" },
    ],
  },
});
```

### List Menu

```ts
await wa.message.send({
  type: TypeMessage.MENU,
  body: {
    to,
    buttonText: "View Menu",
    text: "Choose an item",
    title: "Menu",
    description: "Our products",
    footer: "Prices may vary",
    sections: [
      {
        title: "Pizzas",
        rows: [
          { title: "Margherita", description: "Classic cheese pizza", rowId: "1" },
          { title: "Pepperoni", description: "Spicy pepperoni", rowId: "2" },
        ],
      },
      {
        title: "Drinks",
        rows: [
          { title: "Cola", description: "350ml", rowId: "3" },
        ],
      },
    ],
  },
});
```

### Poll / Survey

```ts
// Survey (via sendMessage)
await wa.message.send({
  type: TypeMessage.POLL,
  body: { to, name: "Do you like TypeScript?", options: ["Yes", "No"] },
});

// Poll (dedicated method with selectableCount)
await wa.message.sendPoll(to, "Favorite language?", ["TypeScript", "Python", "Go"], 1);
```

### PIX Payment

```ts
await wa.message.send({
  type: TypeMessage.BUTTON_PIX,
  body: {
    to,
    title: "Pizza Order",
    text: "Your order details",
    referenceId: "order-123",
    code: "0020101021226700014br.gov.bcb.pix",
    key: "23711695000115",
    merchantName: "MY STORE",
    keyType: "CNPJ",
    items: [
      { id: "1", name: "Pizza G", price: 45, quantity: 2 },
      { id: "2", name: "Soda", price: 8, quantity: 2 },
    ],
    subtotal: "106",
    totalAmount: "106",
  },
});
```

### Sticker, Video Note, Event, Pin, Call Link

```ts
// Sticker
await wa.message.sendSticker(to, "https://www.gstatic.com/webp/gallery/1.webp");

// Video Note (circular/PTV)
await wa.message.sendVideoNote(to, "https://www.w3schools.com/html/mov_bbb.mp4");

// Event
await wa.message.sendEvent({
  to,
  name: "Team Meeting",
  description: "Weekly sync",
  startTime: "2025-01-15T14:00:00Z",
  locationName: "Office",
  locationAddress: "123 Main St",
});

// Pin Message
await wa.message.pin("MESSAGE_ID", 604800); // 7 days in seconds

// Call Link
await wa.message.sendCallLink(to, "video", "Join the meeting");
```

### Base64 Messages

```ts
await wa.message.sendImageBase64(to, "data:image/png;base64,...", "Caption");
await wa.message.sendAudioBase64(to, "data:audio/mp3;base64,...");
await wa.message.sendDocumentBase64(to, "data:application/pdf;base64,...", "application/pdf", "file.pdf", "My document");
```

### Forward & List Messages

```ts
// Forward a message
await wa.message.forward(to, "MESSAGE_ID");

// List messages from a contact
const messages = await wa.message.list("559999999999", 1, 20);
```

### Additional Message Methods

```ts
// Unpin message
await wa.message.unpin("MESSAGE_ID");

// Send multiple contacts
await wa.message.sendContacts({ to, displayName: "My Contacts", contacts: [{ fullName: "Name", phoneNumber: "559999999999" }] });

// Send live location
await wa.message.sendLiveLocation({ to, latitude: 37.7749, longitude: -122.4194, caption: "I'm here" });

// Get message details
await wa.message.getDetails("MESSAGE_ID");

// Get message media
await wa.message.getMedia("MESSAGE_ID", "base64");

// Send product message
await wa.message.sendProduct({ to, businessOwnerJid: "559999999999@s.whatsapp.net", productId: "product_id", catalogId: "catalog_id" });

// Send group invite
await wa.message.sendGroupInvite({ to, groupJid: "123456789@g.us", groupName: "Developers", inviteCode: "ABC123" });

// Request phone number
await wa.message.requestPhone(to);

// Create call link (without sending)
await wa.message.createCallLink("video");
```

## Chat

```ts
// List all chats
const chats = await wa.chat.list();

// Get messages from a chat
const msgs = await wa.chat.messages("559999999999@s.whatsapp.net");

// Mark as read
await wa.chat.modify("559999999999@s.whatsapp.net", "markRead", true);

// Pin chat
await wa.chat.modify("559999999999@s.whatsapp.net", "pin", true);

// Delete chat
await wa.chat.delete("559999999999@s.whatsapp.net");

// Subscribe to presence updates
await wa.chat.presenceSubscribe("559999999999@s.whatsapp.net");

// Set disappearing messages
await wa.chat.disappearing("559999999999@s.whatsapp.net", 86400);

// Get privacy settings
const privacy = await wa.chat.privacy();
```

## Call

```ts
// Make a call
await wa.call.call(to, false);      // audio
await wa.call.call(to, true);       // video

// Reject a call
await wa.call.reject("CALL_ID", "559999999999@s.whatsapp.net");

// Accept a call
await wa.call.accept("CALL_ID", "559999999999@s.whatsapp.net");

// End a call
await wa.call.end("CALL_ID", "559999999999@s.whatsapp.net");
```

## Labels

```ts
// List labels
const labels = await wa.label.list();

// Create label
await wa.label.create("VIP");

// Add label to chat
await wa.label.addToChat("label_id", to);

// Get chats with label
const labeled = await wa.label.getChats("label_id");

// Remove label from chat
await wa.label.removeFromChat("label_id", to);

// Delete label
await wa.label.delete("label_id");
```

## Contacts

```ts
// List all contacts
const contacts = await wa.contact.list();

// Get contact profile
const profile = await wa.contact.profile("559999999999");

// Block / Unblock
await wa.contact.block("559999999999", "block");
await wa.contact.block("559999999999", "unblock");

// Check if registered on WhatsApp
const check = await wa.action.checkRegistered("559999999999");

// Add contact
await wa.contact.add("559999999999", "Raphael");

// Remove contact
await wa.contact.remove("559999999999");

// Clear contact session
await wa.contact.clearSession("559999999999");

// Get contact status
await wa.contact.getStatus("559999999999");

// List blocked contacts
const blocked = await wa.contact.listBlocked();

// Resolve LIDs
await wa.contact.resolveLids(["lid1", "lid2"]);
```

## Groups

```ts
// List groups
const groups = await wa.group.list();

// Group info
const info = await wa.group.info("123456789@g.us");

// Create group
const newGroup = await wa.group.create("Developers", ["559999999999"]);

// Update group
await wa.group.update("123456789@g.us", "New Name", "New description");

// Change settings
await wa.group.changeSettings("123456789@g.us", "announcement");     // only admins can send
await wa.group.changeSettings("123456789@g.us", "not_announcement"); // everyone can send
await wa.group.changeSettings("123456789@g.us", "locked");           // only admins edit info
await wa.group.changeSettings("123456789@g.us", "unlocked");         // everyone can edit info

// Invite code
const invite = await wa.group.getInviteCode("123456789@g.us");

// Group picture
await wa.group.updatePicture("123456789@g.us", "https://a.cdn-hotels.com/gdcs/production190/d988/1071675e-1bd7-4a81-8b40-735eb9241410.jpg");
await wa.group.removePicture("123456789@g.us");

// Participants
await wa.group.addParticipants("123456789@g.us", ["559999999999"]);
await wa.group.removeParticipants("123456789@g.us", ["559999999999"]);
await wa.group.updateParticipantRole("123456789@g.us", "promote", ["559999999999"]);
await wa.group.updateParticipantRole("123456789@g.us", "demote", ["559999999999"]);

// Pending participants
const pending = await wa.group.getRequestParticipants("123456789@g.us");
await wa.group.updateRequestParticipants("123456789@g.us", {
  participants: ["559999999999"],
  action: "approve",
});

// Leave group
await wa.group.leave("123456789@g.us");

// Get group members
const members = await wa.group.getMembers("123456789@g.us");

// Get invite info from code
const inviteInfo = await wa.group.getInviteInfo("INVITE_CODE");
```

## Community

```ts
// List communities
const communities = await wa.community.list();

// Create community
const newComm = await wa.community.create({ name: "My Community", subject: "Tech" });

// Community info
const commInfo = await wa.community.info("community_id");

// Update community
await wa.community.update("community_id", { subject: "Updated", description: "New description" });

// Community picture
await wa.community.updatePicture("community_id", "https://a.cdn-hotels.com/gdcs/production190/d988/1071675e-1bd7-4a81-8b40-735eb9241410.jpg");

// Invite code
const commInvite = await wa.community.getInviteCode("community_id");

// Participants
await wa.community.removeParticipants("community_id", ["559999999999"]);
const commPending = await wa.community.getRequestParticipants("community_id");
await wa.community.updateRequestParticipants("community_id", {
  participants: ["559999999999"],
  action: "approve",
});

// Leave community
await wa.community.leave("community_id");

// Accept invite
await wa.community.acceptInvite("INVITE_CODE");

// Get invite info
await wa.community.getInviteInfo("INVITE_CODE");

// Create group inside community
await wa.community.createGroup("community_id", { subject: "New Group", participants: ["559999999999"] });

// Set ephemeral messages
await wa.community.ephemeral("community_id", 86400);

// Update community settings
await wa.community.updateSettings("community_id", "announcement");

// Set member add mode
await wa.community.memberAddMode("community_id", "admin_add");

// Set join approval mode
await wa.community.joinApproval("community_id", "on");
```

## Business

```ts
// Get catalog
const catalog = await wa.business.getCatalog();
const catalogPage = await wa.business.getCatalog(10, "cursor_token");

// Create product
await wa.business.createProduct({
  name: "Premium T-Shirt",
  description: "100% cotton",
  originCountryCode: "BR",
  currency: "BRL",
  price: 79.90,
  images: [{ url: "https://a.cdn-hotels.com/gdcs/production190/d988/1071675e-1bd7-4a81-8b40-735eb9241410.jpg" }],
});

// Update product
await wa.business.updateProduct("product_id", {
  name: "Premium T-Shirt v2",
  price: 89.90,
});

// Delete product
await wa.business.deleteProduct("product_id");
```

## Newsletter

```ts
// Create a newsletter
await wa.newsletter.create("My Newsletter", "Description");

// Get metadata
await wa.newsletter.getMetadata("type", "newsletter_id");

// Get subscribers & admins
await wa.newsletter.getSubscribers("newsletter_id");
await wa.newsletter.getAdmins("newsletter_id");

// Follow / Unfollow
await wa.newsletter.follow("newsletter_id");
await wa.newsletter.unfollow("newsletter_id");

// Update
await wa.newsletter.updateName("newsletter_id", "New Name");
await wa.newsletter.updateDescription("newsletter_id", "New description");
await wa.newsletter.updatePicture("newsletter_id", "https://example.com/pic.jpg");
await wa.newsletter.removePicture("newsletter_id");

// Transfer ownership & demote admin
await wa.newsletter.transferOwnership("newsletter_id", "new_owner_jid");
await wa.newsletter.demoteAdmin("newsletter_id", "user_jid");

// Messages
await wa.newsletter.getMessages("newsletter_id", 10);

// React to a message
await wa.newsletter.react("newsletter_id", "server_id", "👍");

// Mute / Unmute
await wa.newsletter.mute("newsletter_id");
await wa.newsletter.unmute("newsletter_id");

// Delete
await wa.newsletter.delete("newsletter_id");
```

## Status

```ts
// Text status
await wa.status.sendText({ text: "Hello World!", statusJidList: ["559999999999@s.whatsapp.net"] });

// Image status
await wa.status.sendImage({ url: "https://example.com/image.jpg", caption: "My photo", statusJidList: ["559999999999@s.whatsapp.net"] });

// Video status
await wa.status.sendVideo({ url: "https://example.com/video.mp4", caption: "My video" });

// Audio status
await wa.status.sendAudio({ url: "https://example.com/audio.mp3" });

// Mention a status
await wa.status.mention({ jid: "559999999999@s.whatsapp.net", statusMsgId: "STATUS_MSG_ID" });
```

## Actions

```ts
// Check if number is on WhatsApp
const result = await wa.action.checkRegistered("559999999999");

// Download media (deprecated)
const media = await wa.action.downloadMedia("image", {
  mediaKey: "...",
  directPath: "...",
  url: "...",
});

// Delete stored media
await wa.action.deleteStorage();
```

## Custom HTTP Client

You can inject your own HTTP client (e.g., `fetch`, `got`, `undici`) for full control:

```ts
import { WhatsApp, IHttpClient, RequestOptions } from '@raphaelvserafim/client-api-whatsapp';

class MyHttpClient implements IHttpClient {
  async request<T>(options: RequestOptions): Promise<T> {
    const response = await fetch(`https://us.api-wa.me/MY_KEY/${options.route}`, {
      method: options.method,
      headers: { 'Content-Type': 'application/json' },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    return response.json() as Promise<T>;
  }
}

const wa = new WhatsApp(
  { server: "https://us.api-wa.me", key: "MY_KEY" },
  new MyHttpClient(),
);
```

## Error Handling

All API errors throw `WhatsAppError` with status code and response body:

```ts
import { WhatsAppError } from '@raphaelvserafim/client-api-whatsapp';

try {
  await wa.message.send({ type: TypeMessage.TEXT, body: { to, text: "Hello" } });
} catch (error) {
  if (error instanceof WhatsAppError) {
    console.error(error.message);       // Error message
    console.error(error.statusCode);    // HTTP status code (e.g., 401, 404)
    console.error(error.responseBody);  // API response body
  }
}
```
