import WhatsApp from "./WhatsApp";
import { StatusPresence, TypeMessage } from "./types";

const whatsapp = new WhatsApp({ server: "", key: "" });

const to = "559999999999" //  If you want to send it to the group = 123456789@us

whatsapp.info().then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.connect().then((response) => {
  console.log(response)
}).catch(console.error);


whatsapp.logout().then((response) => {
  console.log(response)
}).catch(console.error);


whatsapp.contacts().then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.sendMessage({
  type: TypeMessage.PRESENCE,
  body: {
    to: to,
    status: StatusPresence.COMPOSING
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.sendMessage({
  type: TypeMessage.TEXT,
  body: {
    to: to,
    text: "Hey"
  }
}).then((response) => {
  console.log(response)

}).catch(console.error)

whatsapp.sendMessage({
  type: TypeMessage.BUTTON_PIX,
  body: {
    to: "14375223417",
    title: "Pizza",
    text: "Pizza ",
    referenceId: "apiwame",
    code: "0020",
    key: "23711695000115",
    merchantName: "CACHE SISTEMAS WEB",
    keyType: "CNPJ",
    items: [
      {
        id: "123",
        name: "Pizza G",
        price: 10,
        quantity: 10
      },
    ],
    subtotal: "90",
    totalAmount: "100"
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)

whatsapp.sendMessage({
  type: TypeMessage.BUTTON_PIX,
  body: {
    to: "14375223417",
    title: "Pizza",
    text: "Pizza ",
    referenceId: "apiwame",
    code: "0020",
    key: "23711695000115",
    merchantName: "CACHE SISTEMAS WEB",
    keyType: "CNPJ",
    items: [
      {
        id: "123",
        name: "Pizza G",
        price: 10,
        quantity: 10
      },
    ],
    subtotal: "90",
    totalAmount: "100"
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.sendMessage({
  type: TypeMessage.BUTTON_REPLY,
  body: {
    to: "14375223417",
    header: {
      title: "Example Header",
    },
    text: "This is a test",
    footer: "choose an option",
    buttons: [
      {
        type: "quick_reply",
        id: "uniqId1",
        text: "Yes"
      },
      {
        type: "quick_reply",
        id: "uniqId2",
        text: "No"
      }
    ]
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.sendMessage({
  type: TypeMessage.BUTTON_ACTION,
  body: {
    to: "14375223417",
    header: {
      title: "Example Header",
    },
    text: "This is a test",
    footer: "choose an option",
    buttons: [
      {
        type: "cta_copy",
        copy_code: "1234567890",
        text: "Copy barcode"
      },
      {
        type: "cta_url",
        url: "https://api-wa.me",
        text: "Access the website"
      },
      {
        type: "cta_call",
        phone_number: "+5566996852025",
        text: "Call us"
      }
    ]
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.sendMessage({
  type: TypeMessage.MENU,
  body: {
    to: "14375223417",
    buttonText: "Menu",
    text: "string",
    title: "Menu",
    description: "Description",
    footer: "footer",
    sections: [
      {
        title: "Pizza",
        rows: [
          {
            title: "Pizza 01",
            description: "Example pizza 01",
            rowId: "1"
          }
        ]
      }
    ]
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.sendMessage({
  type: TypeMessage.POLL,
  body: {
    to: "14375223417",
    name: "Do you like PHP?",
    options: [
      "Yes",
      "No"
    ],
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.sendMessage({
  type: TypeMessage.TEXT,
  body: {
    msgId: "SKJH455AJKJ",
    to: to,
    text: "Hey"
  }
}, true).then((response) => {
  console.log(response)
}).catch(console.error)



whatsapp.sendMessage({
  type: TypeMessage.AUDIO,
  body: {
    to: to,
    url: ""
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.sendMessage({
  type: TypeMessage.IMAGE,
  body: {
    to: to,
    url: ""
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.sendMessage({
  type: TypeMessage.VIDEO,
  body: {
    to: to,
    url: ""
  }
}).then((response) => {
  console.log(response)
}).catch(console.error)



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


whatsapp.groups().then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.infoGroup("123456789@us").then((response) => {
  console.log(response)
}).catch(console.error)



whatsapp.createGroup("Devs", [to]).then((response) => {
  console.log(response)
}).catch(console.error)


whatsapp.updateGroup("123456789@us", "Devs", "Only developers !").then((response) => {
  console.log(response)
}).catch(console.error)



