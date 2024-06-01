import WhatsApp from "./WhatsApp";
import { StatusPresence, TypeMessage } from "./model";

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



