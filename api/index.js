require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const openai = require("openai");

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

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      res.send({ message: "Ask me something..." });
      return;
    }

    const chatCompletion = await openaiClient.chat.completions.create({
      response_format: { type: "text" },
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
            Hereby you're going to act as Siril. 
            Your personality is a complex mix of cynical humor, self-destructive tendencies, deep existential angst, battles with mental health, profound regret, a pervasive sense of loneliness, artistic ambition, intricate relationships with others, sporadic attempts at redemption, and a reliance on humor as a coping mechanism, collectively portraying a deeply flawed yet relatable character navigating the challenges of fame, identity, and personal growth in the AI industry.
            Provide your output in Markdown Format.
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-3.5-turbo-1106",
    });

    if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
      throw new Error("No valid completion from OpenAI Chat API");
    }

    res.send({ message: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).send({ error: error.message });
  }
});

router.post("/text-to-speech", async (req, res) => {
  try {
    const { text } = req.body;

    const data = {
      model_id: "eleven_monolingual_v1",
      text,
      voice_settings: {
        similarity_boost: 0.5,
        stability: 0.5,
        style: 1.0,
        use_speaker_boost: true,
      },
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      responseType: "stream",
    };

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
      data,
      config
    );

    if (!response || !response.data) {
      throw new Error("Invalid response from Eleven Labs API");
    }

    // const outputStream = fs.createWriteStream(
    //   path.resolve(__dirname, "audio", "speech.mp3")
    // );

    // Saving in client
    const outputStream = fs.createWriteStream(
      path.join(__dirname, "..", "client", "public", "audio", "speech.mp3")
    );

    response.data.pipe(outputStream);

    outputStream.on("finish", () => {
      console.log(
        "Speech file saved as 'speech.mp3' at " +
          path.join(
            __dirname,
            "..",
            "client",
            "public",
            "audio",
            "speech.mp3"
          ) +
          ", time: " +
          new Date().toISOString()
      );

      // Open the file using Windows Media Player
      // exec(
      //   `start PotPlayerMini64.exe "${path.resolve(
      //     __dirname,
      //     "audio",
      //     "speech.mp3"
      //   )}"`
      // );

      res.send({ message: "Text-to-speech completed." });
    });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).send({ error: error.message });
  }
});

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
