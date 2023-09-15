import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.route("/").get((req, res) => {
  res.send("Hello from Dall-E API Route");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(`Received prompt: ${prompt}`);
    const aiResponse = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    const image = aiResponse.data[0].url;
    console.log(image)
    res.status(200).json({
      photoUrl: image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `${error.message}` });
  }
});

export default router;
