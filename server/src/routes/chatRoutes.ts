import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { query } from "../db";
import { authenticateToken } from "../middleware/authMiddleware";

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
  const userMessages = messages.filter((m: any) => m.role === "user");
  const stepCount = userMessages.length;
  const lastUserText = (userMessages[userMessages.length - 1]?.content || "").trim().toLowerCase();

  // A. Detect Gibberish or extremely lazy input
  const isGibberish = lastUserText.length < 4 || !/[aeiouy]/i.test(lastUserText);
  if (isGibberish) {
    return res.json({
      reply: "Teacher, I'm confused... 😕 I don't think I understand what you wrote. Could you explain it in more detail so I can write it down? (Or if you're not sure, you can click the 'Study Notes' button in the top bar to review the topic!)"
    });
  }

  // B. Detect too brief/uninformative response
  if (lastUserText.split(/\s+/).length < 2) {
    return res.json({
      reply: "Hmm, that seems a bit too short, Teacher. 🧐 Can you explain it in a full sentence so I can grasp the concept better? (Remember, you can click 'Study Notes' at the top of your screen if you need to look up the formulas!)"
    });
  }

  // C. Topic-specific keyword verification and Socratic step progression
  let reply = "";
  const tLower = topic.toLowerCase();

  // Simple keyword matching helper
  const hasKeywords = (words: string[]) => words.some(w => lastUserText.includes(w));

  if (tLower.includes("quadratic") || tLower.includes("math") || tLower.includes("number") || tLower.includes("fraction") || tLower.includes("ratio") || tLower.includes("algebra") || tLower.includes("equation") || tLower.includes("angle") || tLower.includes("area") || tLower.includes("volume") || tLower.includes("data") || tLower.includes("mean")) {
    const keywords = ["formula", "factor", "root", "coefficient", "solve", "square", "equation", "x", "a", "b", "c", "fraction", "decimal", "ratio", "percent", "base", "algebra", "angle", "triangle", "area", "perimeter", "volume", "data", "mean", "median", "mode"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, I don't think that is the correct math solution or concept, Teacher. 🧐 Aren't we supposed to use equations, numbers, values, or geometric rules? (You can open the 'Study Notes' button at the top to double-check!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh, I see! But how do we actually calculate or solve it step-by-step? What are the key values/formulas we start with?";
      } else if (stepCount === 2) {
        reply = "Ah, that is the general form and starting equation/rule! What is the next calculation step or method?";
      } else if (stepCount === 3) {
        reply = "I think I follow that step! Can we solve one together to practice? Let's walk through an example of how to solve it.";
      } else if (stepCount === 4) {
        reply = "Oh, so that's the final answer and unit/result! Thank you so much, Teacher! I feel ready to write down these steps now. Let's complete the lesson!";
      } else {
        reply = "I'm starting to get it, Teacher! Can we complete the lesson now so you can check my understanding on the report card?";
      }
    }
  } else if (tLower.includes("photo") || tLower.includes("cell") || tLower.includes("respir") || tLower.includes("biol") || tLower.includes("digest")) {
    // Biology / Science Topics
    const keywords = ["cell", "organelle", "mitochondria", "nucleus", "ribosome", "plant", "animal", "chlorophyll", "glucose", "sunlight", "carbon", "oxygen", "water", "stomata", "respiration", "enzyme", "digest", "stomach", "mouth"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, that doesn't sound like the biology we are studying, Teacher. 🧐 Are you sure that is the correct definition or organelle? (If you're stuck, you can click the 'Study Notes' button at the top to check our syllabus notes!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh, so those are the main organelles/ingredients! But how does the cell produce energy or make food? What is the function of the mitochondria or leaves?";
      } else if (stepCount === 2) {
        reply = "Ah, I see! But how do plant cells differ from animal cells under a microscope? Do plant cells have a cell wall or chloroplasts?";
      } else if (stepCount === 3) {
        reply = "Wow, that makes sense! What about the chemical formula or the equation? How is it written out in our syllabus?";
      } else if (stepCount === 4) {
        reply = "Ah, now the whole process is clear! Thank you, Teacher! I'm ready to write down these notes. Shall we complete the lesson?";
      } else {
        reply = "This biology topic makes total sense now! Teacher, let's complete the lesson so you can check my final report card.";
      }
    }
  } else if (tLower.includes("physic") || tLower.includes("motion") || tLower.includes("wave") || tLower.includes("elect") || tLower.includes("force")) {
    // Physics Topics
    const keywords = ["speed", "velocity", "acceleration", "time", "distance", "force", "mass", "motion", "wave", "frequency", "wavelength", "ohm", "volt", "amp", "resistor", "current", "circuit", "pressure", "gravity"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, I don't think that is the correct physics formula or rule, Teacher. 🧐 Can you explain it in terms of velocity, acceleration, or the appropriate SI units? (You can click the 'Study Notes' button in the top bar to review!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh! I think I get that part. But what are the main equations or laws we use to solve this? Can you state the formula?";
      } else if (stepCount === 2) {
        reply = "Ah, I see the relation now! But what if one of the parameters is zero or constant, like uniform acceleration or starting from rest? How does the calculation change?";
      } else if (stepCount === 3) {
        reply = "That makes sense! Let's solve a simple problem together to verify if I understand. Can you guide me through a numerical example step-by-step?";
      } else if (stepCount === 4) {
        reply = "Oh, so that's how we get the final values and units! That is amazing. Thank you, Teacher. Let's finish the lesson!";
      } else {
        reply = "I understand these physics principles now! Let's complete the lesson so you can evaluate my performance.";
      }
    }
  } else if (tLower.includes("chem") || tLower.includes("bond") || tLower.includes("periodic") || tLower.includes("mole") || tLower.includes("acid")) {
    // Chemistry Topics
    const keywords = ["bond", "atom", "electron", "ionic", "covalent", "periodic", "valence", "element", "metal", "reaction", "mole", "mass", "acid", "base", "ph", "neutral", "gas", "pressure", "volume"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, I'm trying to follow, but that doesn't sound like chemistry to me, Teacher. 🧐 Aren't we discussing atoms, valence electrons, or pH scales? (Remember, you can click 'Study Notes' at the top if you need a quick look!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh! So that's how atoms interact. But why do they form bonds or react in the first place? Is it to achieve a stable octet structure?";
      } else if (stepCount === 2) {
        reply = "Ah! Stable shells are key! What about the difference between ionic (transfer) and covalent (sharing) pathways? How do we tell them apart?";
      } else if (stepCount === 3) {
        reply = "Oh! Can you give me a specific compound example of each, and write down how they react?";
      } else if (stepCount === 4) {
        reply = "Ah, that is so clear. Thank you, Teacher! I'm ready to write down these chemical structures. Let's complete the lesson.";
      } else {
        reply = "Chemistry makes a lot of sense now, Teacher! Let's finish the lesson.";
      }
    }
  } else if (tLower.includes("civic") || tLower.includes("right") || tLower.includes("democ") || tLower.includes("citizen") || tLower.includes("value")) {
    // Civic Topics
    const keywords = ["right", "citizen", "law", "democracy", "government", "value", "integrity", "society", "constitution", "rule", "vote", "naptip", "ndlea", "drug", "parent"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, I don't think that relates to our civic duties or human rights, Teacher. 🧐 Can you explain it in terms of laws, responsibilities, or constitutional rights? (You can click 'Study Notes' at the top to check our syllabus!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh! So those are the core principles. But what are the main duties of a citizen or the rights we are guaranteed under the law?";
      } else if (stepCount === 2) {
        reply = "Ah! That is helpful. But how does the constitution protect these rights, or what happens when someone violates them?";
      } else if (stepCount === 3) {
        reply = "Oh, I see! What institutions or enforcement agencies do we have to report crimes or protect citizens?";
      } else if (stepCount === 4) {
        reply = "Ah, that is reassuring to know. Thank you, Teacher! Let's complete the lesson.";
      } else {
        reply = "Civic education makes complete sense now, Teacher! Let's finish the lesson.";
      }
    }
  } else if (tLower.includes("python") || tLower.includes("loop") || tLower.includes("code") || tLower.includes("function") || tLower.includes("variab")) {
    // Python coding topics
    const keywords = ["python", "variable", "data", "string", "int", "float", "type", "if", "else", "elif", "loop", "for", "while", "function", "def", "param", "argument", "return", "list", "tuple", "dict", "file", "class", "object", "oop"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, that code doesn't look like Python, Teacher. 🧐 Can you write down the correct Python syntax, variables, or functions we are studying? (You can open the 'Study Notes' button at the top to see code examples!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh! That makes sense. But how do we structure the syntax, loops, or variable assignments? Can you write a simple code example?";
      } else if (stepCount === 2) {
        reply = "Ah! Indentations and colons are key! What about writing a function to reuse this block? How do we declare it?";
      } else if (stepCount === 3) {
        reply = "Oh! We use the 'def' keyword. But what does 'return' do, and how is it different from a print statement?";
      } else if (stepCount === 4) {
        reply = "Ah, return outputs the value back to the caller! I understand Python concepts much better now. Thank you, Teacher! Let's complete the lesson.";
      } else {
        reply = "I feel ready to write some Python code now! Let's finish the lesson.";
      }
    }
  } else if (tLower.includes("ai") || tLower.includes("neural") || tLower.includes("nlp") || tLower.includes("learning") || tLower.includes("generat")) {
    // AI Topics
    const keywords = ["ai", "intelligence", "machine", "learning", "supervised", "unsupervised", "neural", "network", "weight", "bias", "backpropagation", "gradient", "descent", "activation", "transformer", "attention", "nlp", "vision", "pixel", "search", "tree", "forest", "ethics"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, I don't think that relates to artificial intelligence or neural networks, Teacher. 🧐 Can you explain it in terms of data training, model layers, or algorithms? (You can click 'Study Notes' in the top bar to review!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh! I think I follow that. But how does the AI model learn or adjust its predictions? What are weights and biases?";
      } else if (stepCount === 2) {
        reply = "Ah! Through numerical weights and activation functions! But how does it calculate errors and optimize them? What is backpropagation?";
      } else if (stepCount === 3) {
        reply = "Oh! Backpropagation propagates the error backwards to update the weights! That is brilliant. What is a bias in the network?";
      } else if (stepCount === 4) {
        reply = "Ah, the bias shifts the activation function! AI makes a lot of sense now. Thank you, Teacher! Let's complete the lesson.";
      } else {
        reply = "I understand basic neural networks and AI models now! Let's finish the lesson.";
      }
    }
  } else if (tLower.includes("tech") || tLower.includes("tool") || tLower.includes("drawing") || tLower.includes("wood") || tLower.includes("metal") || tLower.includes("sketch") || tLower.includes("project") || tLower.includes("mainten")) {
    // Basic Technology
    const keywords = ["wood", "metal", "plastic", "ceramics", "rubber", "tool", "saw", "plane", "hammer", "safety", "drawing", "scale", "sketch", "orthographic", "projection", "maintenance", "energy", "transmission", "gears", "shaft"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, that doesn't sound like Basic Technology, Teacher. 🧐 Are you sure that is the correct technology concept or workshop safety rule? (If you're not sure, you can click 'Study Notes' at the top of your screen to review!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh, I see! But what are the main properties of this material or tool? How do we handle it safely in the workshop?";
      } else if (stepCount === 2) {
        reply = "Ah, safety guidelines are very important! What about technical drawing or scale drawing? How do we represent three-dimensional objects on paper?";
      } else if (stepCount === 3) {
        reply = "Oh! We use orthographic projection or freehand sketches. How do we maintain these tools so they don't rust or break?";
      } else if (stepCount === 4) {
        reply = "Ah, lubrication and proper storage! That makes sense. Thank you, Teacher! I'm ready to write down these steps. Let's finish the lesson.";
      } else {
        reply = "I understand basic technology and tools now, Teacher! Let's finish the lesson.";
      }
    }
  } else if (tLower.includes("social") || tLower.includes("family") || tLower.includes("culture") || tLower.includes("group") || tLower.includes("conflict") || tLower.includes("abuse")) {
    // Social Studies
    const keywords = ["family", "marriage", "social", "group", "culture", "value", "leadership", "conflict", "resolution", "drug", "abuse", "citizenship", "identity", "nation", "society"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, I don't think that relates to our social studies lesson, Teacher. 🧐 Can you explain it in terms of social values, family structures, or national identity? (Remember, you can click 'Study Notes' at the top if you need a quick look!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh! So that is how this social structure works. But what are the main functions of the family or culture in our society?";
      } else if (stepCount === 2) {
        reply = "Ah! Culture is dynamic and shared. What about social issues like drug abuse or conflicts? How do we prevent or resolve them?";
      } else if (stepCount === 3) {
        reply = "Oh, I see! What are the attributes of a good leader or how does a citizen contribute to national unity?";
      } else if (stepCount === 4) {
        reply = "Ah, integrity and cooperation! Thank you, Teacher. I understand this topic very well. Let's finish the lesson.";
      } else {
        reply = "Social studies is very interesting! Teacher, let's complete the lesson.";
      }
    }
  } else if (tLower.includes("computer") || tLower.includes("hardw") || tLower.includes("softw") || tLower.includes("storage") || tLower.includes("keyboard") || tLower.includes("internet")) {
    // Computer Studies
    const keywords = ["computer", "hardware", "software", "input", "output", "keyboard", "mouse", "monitor", "printer", "storage", "ram", "rom", "internet", "browser", "safety", "processing"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, that doesn't sound like Computer Studies, Teacher. 🧐 Can you explain it in terms of hardware, software, or computer peripherals? (You can click the 'Study Notes' button to check the concept!)";
    } else {
      if (stepCount === 1) {
        reply = "Oh! So those are parts of a computer system. But what is the difference between hardware and software? How do they work together?";
      } else if (stepCount === 2) {
        reply = "Ah, software controls the hardware! What about storage media, like RAM and ROM? How do they store our files and instructions?";
      } else if (stepCount === 3) {
        reply = "Oh! ROM is non-volatile while RAM is temporary. What about internet safety or keyboard skills? How do we stay safe online?";
      } else if (stepCount === 4) {
        reply = "Ah, strong passwords and avoiding suspicious links! Thank you, Teacher! I'm ready to write down these computer safety rules. Let's complete the lesson.";
      } else {
        reply = "I understand basic computer concepts now, Teacher! Let's finish the lesson.";
      }
    }
  } else {
    // English / Fallback - Essay Writing & Mechanical Accuracy
    const keywords = ["essay", "write", "informal", "formal", "letter", "sentence", "clause", "punctuation", "comma", "splice", "semicolon", "paragraph", "transition"];
    if (!hasKeywords(keywords)) {
      reply = "Hmm, I don't think that is the correct essay formatting or rule, Teacher. 🧐 Can you explain it in terms of sentence structure, punctuation, or paragraph transitions? (Remember, you can click 'Study Notes' at the top if you need a quick look!)";
    } else {
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
  }

  return res.json({ reply });
});

// Route 2: POST /chat/evaluate
router.post("/evaluate", authenticateToken, async (req: any, res: any) => {
  const { messages, topic, subject, rubric } = req.body;
  const userId = req.user?.id;

  if (!messages || !topic) {
    return res.status(400).json({ error: "Missing required parameters: messages, topic." });
  }

  const apiKey = getGeminiApiKey();
  let evaluationResult: any = null;

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
      evaluationResult = JSON.parse(response.text().trim());
    } catch (err: any) {
      console.error("Gemini evaluation error:", err);
      // Fallback to simulator below if Gemini fails
    }
  }

  // 2. --- SIMULATOR REPORT CARD FALLBACK ---
  if (!evaluationResult) {
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
    evaluationResult = report;
  }

  // 3. --- LOG TO DATABASE FOR FUTURE AI MODEL TRAINING ---
  if (evaluationResult && userId) {
    try {
      await query(
        `INSERT INTO student_responses (user_id, subject, topic, transcript, score, accuracy_summary, gaps_summary, positives_summary)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          userId,
          subject || "General",
          topic,
          JSON.stringify(messages),
          evaluationResult.score || 0,
          evaluationResult.accuracy || "",
          evaluationResult.gaps || "",
          evaluationResult.positive || ""
        ]
      );
      console.log(`Log saved in student_responses for user ${userId}`);
    } catch (dbErr) {
      console.error("Failed to log student response in DB:", dbErr);
    }
  }

  return res.json(evaluationResult);
});

// Route 3: POST /chat/log-response
router.post("/log-response", authenticateToken, async (req: any, res: any) => {
  const { messages, topic, subject, score, accuracy, gaps, positive } = req.body;
  const userId = req.user?.id;

  if (!messages || !topic || score === undefined) {
    return res.status(400).json({ error: "Missing required parameters: messages, topic, score." });
  }

  try {
    await query(
      `INSERT INTO student_responses (user_id, subject, topic, transcript, score, accuracy_summary, gaps_summary, positives_summary)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId,
        subject || "General",
        topic,
        JSON.stringify(messages),
        score,
        accuracy || "",
        gaps || "",
        positive || ""
      ]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error("Log response error:", err);
    res.status(500).json({ error: "Failed to log student response" });
  }
});

export default router;
