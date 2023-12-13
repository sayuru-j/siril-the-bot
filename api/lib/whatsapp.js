const WhatsApp = require("whatsapp");

const SENDER_ID = process.env.WA_PHONE_NUMBER_ID;

const wa = new WhatsApp(SENDER_ID);

const recipent_number = "+94773043255";

async function send_message() {
  try {
    const sent_message = await wa.messages.text(
      {
        body: "Hello, world",
      },
      recipent_number
    );
    console.log(sent_message.rawResponse().headers);
    return sent_message;
  } catch (error) {
    return console.error(error);
  }
}

module.exports = {
  send_message,
};
