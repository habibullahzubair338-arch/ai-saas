import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/ai", async (req, res) => {
const { message } = req.body;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{ role: "system", content: "You are a SaaS AI assistant." },
{ role: "user", content: message }
]
})
});

const data = await response.json();

res.json({
reply: data.choices?.[0]?.message?.content || "Error"
});
});

app.listen(3000, () => console.log("AI SaaS running"));