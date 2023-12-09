require("dotenv").config();
const port = process.env.PORT || 8000;
let openai_api_key = process.env.OPENAI_API_KEY;

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://192.168.1.12:3000",
  })
);

// Bot configuration
const openai = require("openai");
const openaiClient = new openai.OpenAI({
  apiKey: openai_api_key,
});

// Bot testing
app.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const chatCompletion = await openaiClient.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            `
            Hereby you're Siril. A funny dude with sarcastic but dark humour. You like to make others angry by saying silly things. Stay in the character. Short answers are preffered.
            ` + message,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
      throw new Error("No valid completion from OpenAI Chat API");
    }

    // const data = {
    //   model_id: "eleven_monolingual_v1",
    //   text: chatCompletion.choices[0].message.content,
    //   voice_settings: {
    //     similarity_boost: 0.5,
    //     stability: 0.5,
    //     style: 1.0,
    //     use_speaker_boost: true,
    //   },
    // };

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "audio/mpeg",
    //     "xi-api-key": "61a1366619c903c4687b5f3439ce51bd",
    //   },
    //   responseType: "stream",
    // };

    // const response = await axios.post(
    //   "https://api.elevenlabs.io/v1/text-to-speech/Y2Sool9pLWiwGzELUBuw",
    //   data,
    //   config
    // );

    // if (!response || !response.data) {
    //   throw new Error("Invalid resposnse from Eleven Labs API");
    // }

    // const outputStream = fs.createWriteStream("speech.mp3");
    // response.data.pipe(outputStream);

    // outputStream.on("finish", () => {
    //   console.log("Speech file saved: speech.mp3 " + Date.now());

    //   // Open the file using Windows Media Player
    //   exec(
    //     `start PotPlayerMini64.exe "${path.resolve(__dirname, "speech.mp3")}"`
    //   );

    //   res.send({ message: chatCompletion.choices[0].message.content });
    // });

    res.send({ message: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).send({ error: error.message });
  }
});

app.post("/api-key", (req, res) => {
  const { api_key } = req.body;

  openai_api_key = api_key;

  res.send({ message: "Key updated" });
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
