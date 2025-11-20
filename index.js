
// api/index.js
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";


  let system = `Du bist ein erfahrener Fitnesstrainer mit Spezialisierung auf Calisthenics.`
  let assistant = `const trainingsplan = {"Ziele": ["z. B. Grundkraft verbessern"], "Montag": ["Warm-up:", "Jumping-jacks ( 1 x 30s )", "Pause: 30s", "Skilltraining:", "Handstand an der Wand ( 1 x 40s )", "Hauptteil:", "Liegestützen ( 3 x 10 wdh. 30s Pause )", "Pause: 60s", "Klimmzüge ( 3 x 5 wdh. 30s Pause )", "Cool-down:", "Schulterdehnung"]}`

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/frage", async (req, res) => {
  const { frage } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "user", content: frage },
        { role: "system", content: system },
        { role: "assistant", content: assistant }
      ]
    });

    res.json({ antwort: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});

export default app;

