import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

// Retrieve Gemini API Key from environment
const getGeminiApiKey = () => {
  return process.env.GEMINI_API_KEY || "";
};

// Route 1: POST /chat/socratic
router.post("/socratic", async (req: any, res: any) => {
  const { messages, topic, subject } = req.body;

  if (!messages || !topic) {
    return res.status(400).json({ error: "Missing required parameters: messages, topic." });
  }

  const apiKey = getGeminiApiKey();

  if (apiKey) {
    // 1. --- GEMINI AI FLOW ---
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Build structured prompt for Gemini
      const geminiMessages = messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : m.role,
        parts: [{ text: m.content }]
      }));

      // Call API
      const chatSession = model.startChat({
        history: geminiMessages.slice(0, -1),
      });

      const lastMessage = geminiMessages[geminiMessages.length - 1]?.parts[0]?.text || "";
      const result = await chatSession.sendMessage(lastMessage);
      const text = result.response.text();

      return res.json({ reply: text });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      // Fallback to simulator below if Gemini fails
    }
  }

  // 2. --- RULE-BASED SOCRATIC SIMULATOR FALLBACK ---
  // Count only user messages to determine Chidi's learning phase
  const userMessages = messages.filter((m: any) => m.role === "user");
  const stepCount = userMessages.length;
  const lastUserText = (userMessages[userMessages.length - 1]?.content || "").toLowerCase();

  let reply = "";

  if (topic.toLowerCase().includes("quadratic")) {
    // Math - Quadratic Equations
    if (stepCount === 1) {
      reply = "Oh, so $a$, $b$, and $c$ are just the coefficient numbers? But how do we actually find the solutions? Teacher, what is the quadratic formula?";
    } else if (stepCount === 2) {
      reply = "Ah, $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$! But what is the part under the square root? Someone told me it is called the discriminant. What does that do?";
    } else if (stepCount === 3) {
      reply = "I think I get it now! Can we solve one together to practice? Let's solve $x^2 - 5x + 6 = 0$. How do we factorize it, Teacher?";
    } else if (stepCount === 4) {
      reply = "Oh, so the solutions are $x=2$ and $x=3$! Thank you so much Teacher! I feel ready to write down these steps now. Let's finish the lesson!";
    } else {
      reply = "I'm starting to get it, Teacher! Can we complete the lesson now so you can check my understanding on the report card?";
    }
  } else if (topic.toLowerCase().includes("photo") || topic.toLowerCase().includes("biology")) {
    // Science - Photosynthesis
    if (stepCount === 1) {
      reply = "Oh! Carbon dioxide and water are the raw ingredients, and sunlight is the heat! But where do plants get carbon dioxide? Do they breathe like us?";
    } else if (stepCount === 2) {
      reply = "Ah! Stomata on leaves breathe in CO2, and roots drink water! But how does the food get made? What is chlorophyll and glucose?";
    } else if (stepCount === 3) {
      reply = "Wow, chlorophyll is like the green kitchen, and glucose is the food! What about oxygen? Is it just waste?";
    } else if (stepCount === 4) {
      reply = "Ah, they release oxygen for us to breathe! That's amazing. I understand the whole equation now! Thank you, Teacher! Shall we complete the lesson?";
    } else {
      reply = "Photosynthesis makes total sense now! Teacher, let's complete the lesson so you can check my final report card.";
    }
  } else {
    // English - Mechanical Accuracy
    if (stepCount === 1) {
      reply = "Oh! Punctuation, spelling, and grammar? I make a lot of mistakes with commas and capital letters. How do I use semicolons properly, Teacher?";
    } else if (stepCount === 2) {
      reply = "Ah! To link two closely related independent clauses! That makes sense. What about paragraph structure? How do I transit between ideas?";
    } else if (stepCount === 3) {
      reply = "Oh! Transition words like 'However', 'Furthermore', and 'Consequently'! I will practice using them. What's the most common mistake students make in essays?";
    } else if (stepCount === 4) {
      reply = "Ah, run-on sentences and comma splices! I'll make sure to double check my work. Thank you so much, Teacher! Let's complete the lesson.";
    } else {
      reply = "Thank you, Teacher! I feel much more confident about essay writing. Let's finish the lesson now!";
    }
  }

  return res.json({ reply });
});

// Route 2: POST /chat/evaluate
router.post("/evaluate", async (req: any, res: any) => {
  const { messages, topic, subject, rubric } = req.body;

  if (!messages || !topic) {
    return res.status(400).json({ error: "Missing required parameters: messages, topic." });
  }

  const apiKey = getGeminiApiKey();

  if (apiKey) {
    // 1. --- GEMINI AI FLOW ---
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      const logs = messages
        .filter((m: any) => m.role !== "system")
        .map((m: any) => `${m.role === "user" ? "Teacher" : "Student"}: ${m.content}`)
        .join("\n");

      const prompt = `You are a curriculum examiner. Evaluate the teacher's lesson transcript based on this marking rubric:
===
${rubric || "Verify explanation steps."}
===
Here is the lesson log:
${logs}

Write a concise report card. Respond in this exact JSON format:
{
  "score": <number out of 10 representing how well the teacher explained the steps to secure full marks based on standard secondary school curriculum rubrics>,
  "accuracy": "<one sentence summarizing the correctness of the teacher's explanations>",
  "gaps": "<one sentence highlighting what curriculum steps the teacher forgot to state>",
  "positive": "<one sentence highlighting what the teacher did exceptionally well>"
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const data = JSON.parse(response.text().trim());

      return res.json(data);
    } catch (err: any) {
      console.error("Gemini evaluation error:", err);
      // Fallback to simulator below if Gemini fails
    }
  }

  // 2. --- SIMULATOR REPORT CARD FALLBACK ---
  const userMessages = messages.filter((m: any) => m.role === "user");
  const count = userMessages.length;

  let report = {
    score: 8,
    accuracy: "Your explanations of the basic concepts were correct and encouraging.",
    gaps: "Ensure you prompt the student to write the balanced formula or factorization steps on paper.",
    positive: "You explained difficult terms using excellent real-world analogies."
  };

  if (count <= 2) {
    report.score = 5;
    report.accuracy = "Your Socratic teaching session was very brief.";
    report.gaps = "You did not explain the core equations or provide steps to practice.";
    report.positive = "You initiated the topic greeting nicely.";
  } else if (count >= 5) {
    report.score = 10;
    report.accuracy = "Outstanding curriculum coverage. Every step of the syllabus rubrics was fully met.";
    report.gaps = "None! You guided Chidi through each step with perfect precision.";
    report.positive = "You used outstanding Socratic guiding questions to lead the student to correct answers.";
  }

  return res.json(report);
});

export default router;
