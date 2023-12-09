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
    origin: "*",
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

    if (!message) {
      res.send({ message: "Ask me something..." });
    }

    if (!message == "") {
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
    }
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
