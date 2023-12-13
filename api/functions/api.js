require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const openai = require("openai");
const { personality } = require("../lib/personality");

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 8000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

const openaiClient = new openai.OpenAI({
  apiKey: OPENAI_API_KEY,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Setting the default personality
let character = personality.ChatGPT;

// Chat routes
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // if (!message) {
    //   res.send({ message: "Ask me something..." });
    // }

    const chatResponse = await openaiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content: character.personality,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-3.5-turbo-1106",
    });

    res.send({
      character: character.name,
      message: chatResponse.choices[0]?.message?.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

router.post("/text-to-speech", async (req, res) => {
  // Uncomment the following to enable the text to speech
  // try {
  //   const { text } = req.body;
  //   const data = {
  //     model_id: "eleven_monolingual_v1",
  //     text,
  //     voice_settings: {
  //       similarity_boost: 0.5,
  //       stability: 0.5,
  //       style: 1.0,
  //       use_speaker_boost: true,
  //     },
  //   };
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "audio/mpeg",
  //       "xi-api-key": ELEVENLABS_API_KEY,
  //     },
  //     responseType: "stream",
  //   };
  //   const response = await axios.post(
  //     `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
  //     data,
  //     config
  //   );
  //   if (!response || !response.data) {
  //     throw new Error("Invalid response from Eleven Labs API");
  //   }
  //   // const outputStream = fs.createWriteStream(
  //   //   path.resolve(__dirname, "audio", "speech.mp3")
  //   // );
  //   // Saving in client
  //   const outputStream = fs.createWriteStream(
  //     path.join(__dirname, "..", "client", "public", "audio", "speech.mp3")
  //   );
  //   response.data.pipe(outputStream);
  //   outputStream.on("finish", () => {
  //     console.log(
  //       "Speech file saved as 'speech.mp3' at " +
  //         path.join(
  //           __dirname,
  //           "..",
  //           "client",
  //           "public",
  //           "audio",
  //           "speech.mp3"
  //         ) +
  //         ", time: " +
  //         new Date().toISOString()
  //     );
  //     // Open the file using Windows Media Player
  //     // exec(
  //     //   `start PotPlayerMini64.exe "${path.resolve(
  //     //     __dirname,
  //     //     "audio",
  //     //     "speech.mp3"
  //     //   )}"`
  //     // );
  //     res.send({ message: "Text-to-speech completed." });
  //   });
  // } catch (error) {
  //   console.error("Error", error.message);
  //   res.status(500).send({ error: error.message });
  // }

  res.send({ message: "Text-to-speech not found." });
});

router.post("/personality", async (req, res) => {
  const { name } = await req.body;

  try {
    if (Object.keys(personality).includes(name)) {
      character = personality[name];
      res.send({ message: `Personality set to ${name}` });
    } else {
      res.status(500).send({ error: "Invalid personality name" });
    }
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).send({ error: error.message });
  }
});

router.get("/personalities", async (req, res) => {
  res.json(personality);
});

router.get("/personality-reset", async (req, res) => {
  character = personality.ChatGPT;

  res.send({ message: `Personality reset to ${character.name}` });
});

// Server state check
router.get("/", (req, res) => {
  res.send("Server is running");
});

// Debug point
console.log();

app.use("/.netlify/functions/api", router);

if (process.env.ENV === "production") {
  module.exports.handler = serverless(app);
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
