import pptxgen from "pptxgenjs";
const pptx = new pptxgen();

// Set presentation properties
pptx.layout = "LAYOUT_16x9";

// Global styles
const BG_COLOR = "0F172A"; // Slate 900
const CARD_BG = "1E293B"; // Slate 800
const TEXT_COLOR = "F8FAFC"; // Slate 50
const BRAND_PURPLE = "C084FC"; // Purple 400
const ACCENT_AMBER = "F59E0B"; // Amber 500
const MUTED_COLOR = "94A3B8"; // Slate 400

const slideStyle = {
  background: { color: BG_COLOR }
};

// Slide 1: Cover
const s1 = pptx.addSlide(slideStyle);
s1.addText("PURPLESCHOOL", { x: 1.0, y: 1.2, w: 8, h: 0.6, fontSize: 32, bold: true, color: BRAND_PURPLE });
s1.addText("Democratizing Exam Success in West Africa", { x: 1.0, y: 1.9, w: 11, h: 0.8, fontSize: 38, bold: true, color: TEXT_COLOR });
s1.addText("An offline-first, WebGPU-powered AI tutor helping millions of secondary school students pass WAEC, NECO, and JAMB exams through structured, rubric-aligned learning.", { x: 1.0, y: 2.9, w: 11, h: 1.2, fontSize: 18, color: MUTED_COLOR });
s1.addText("Founder: Chidiebere V. Christopher  |  Live at: https://purpleschool.org", { x: 1.0, y: 4.3, w: 10, h: 0.4, fontSize: 16, color: TEXT_COLOR, bold: true });
s1.addText("Powered by Google Gemma & WebGPU", { x: 1.0, y: 5.5, w: 8, h: 0.4, fontSize: 16, color: ACCENT_AMBER, bold: true });

// Slide 2: The Problem
const s2 = pptx.addSlide(slideStyle);
s2.addText("THE PROBLEM", { x: 0.8, y: 0.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: BRAND_PURPLE });
s2.addText("High failure rates, rote memorization, and no guidance", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 26, bold: true, color: TEXT_COLOR });
s2.addText([
  { text: "• High WAEC Hurdles: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Over 2M students sit for WAEC annually. Pass rates in core subjects hover near 50% due to rote memorization (cramming).\n\n", options: { color: MUTED_COLOR } },
  { text: "• Out of Reach Coaching: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "90% of students cannot afford private tutors or structured curriculum prep.\n\n", options: { color: MUTED_COLOR } },
  { text: "• The Grading Black Box: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Students lose critical marks on written theory papers because they do not know how to layout their working steps or what keywords examiners look for.", options: { color: MUTED_COLOR } }
], { x: 0.8, y: 1.8, w: 11, h: 4.5, fontSize: 16 });

// Slide 3: The Barrier to Existing AI Solutions
const s3 = pptx.addSlide(slideStyle);
s3.addText("THE BARRIER TO EXISTING AI", { x: 0.8, y: 0.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: BRAND_PURPLE });
s3.addText("Why ChatGPT and Gemini are out of reach for African students", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 26, bold: true, color: TEXT_COLOR });
s3.addText([
  { text: "• The Data Cost Wall: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Mobile data is a major economic burden. Running hours of cloud-based AI queries is financially impossible for the average parent.\n\n", options: { color: MUTED_COLOR } },
  { text: "• Unstable Infrastructure: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Intermittent network connectivity and power outages render continuous-connection cloud AIs useless during crucial study hours.\n\n", options: { color: MUTED_COLOR } },
  { text: "• Lack of Curriculum Alignment: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Generic LLMs generate verbose, non-localized responses. They do not know or format answers according to West African exam syllabi.", options: { color: MUTED_COLOR } }
], { x: 0.8, y: 1.8, w: 11, h: 4.5, fontSize: 16 });

// Slide 4: Competitive Advantage
const s4 = pptx.addSlide(slideStyle);
s4.addText("COMPETITIVE ADVANTAGE", { x: 0.8, y: 0.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: BRAND_PURPLE });
s4.addText("Why PurpleSchool defeats generic ChatGPT/Gemini", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 26, bold: true, color: TEXT_COLOR });

s4.addTable(
  [
    [
      { text: "Dimension", options: { fill: CARD_BG, bold: true, color: BRAND_PURPLE } },
      { text: "ChatGPT / Gemini", options: { fill: CARD_BG, bold: true, color: TEXT_COLOR } },
      { text: "PurpleSchool Local AI", options: { fill: CARD_BG, bold: true, color: TEXT_COLOR } }
    ],
    [
      "Solving Logic",
      "Generates generic blocks of text.",
      "Produces model answers structured specifically to WAEC guidelines."
    ],
    [
      "Marking Schemes",
      "Unaware of localized exam grading criteria.",
      "Annotates answers with Method Marks [M1] and Accuracy Marks [A1]."
    ],
    [
      "Data & Network",
      "Requires high-speed internet continuously.",
      "Works completely offline via browser WebGPU SLM."
    ],
    [
      "Running Cost",
      "Expensive API token billing.",
      "Zero incremental cost. Executed on the user's device GPU."
    ]
  ],
  { x: 0.8, y: 1.8, w: 11, h: 4.0, color: MUTED_COLOR, fontSize: 14, border: { type: "solid", color: "334155" } }
);

// Slide 5: The Solution
const s5 = pptx.addSlide(slideStyle);
s5.addText("THE SOLUTION", { x: 0.8, y: 0.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: BRAND_PURPLE });
s5.addText("PurpleSchool: The Offline-First Model Answer Engine", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 26, bold: true, color: TEXT_COLOR });
s5.addText([
  { text: "• Structured Model Answers: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "The AI structures responses exactly like exam booklets, highlighting the specific steps required to secure full marks.\n\n", options: { color: MUTED_COLOR } },
  { text: "• Client-Side Runtime: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Uses WebGPU and WebAssembly. No API calls, no server database costs. Run entirely on-device.\n\n", options: { color: MUTED_COLOR } },
  { text: "• High Motivation Loop: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Utilizes gamification (streaks, levels, achievements) to build daily learning habits naturally.", options: { color: MUTED_COLOR } }
], { x: 0.8, y: 1.8, w: 11, h: 4.5, fontSize: 16 });

// Slide 6: Technology
const s6 = pptx.addSlide(slideStyle);
s6.addText("TECHNOLOGY STACK", { x: 0.8, y: 0.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: BRAND_PURPLE });
s6.addText("Zero server costs. Fast local inference.", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 26, bold: true, color: TEXT_COLOR });
s6.addText([
  { text: "• Model Runtime: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Runs Google's Gemma-2-2B-It (quantized 4-bit, 1.4GB) locally via WebGPU/Wasm.\n\n", options: { color: MUTED_COLOR } },
  { text: "• Browser Caching: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "PWA Service Workers store assets and model weights directly in IndexedDB. Loads instantly after first install.\n\n", options: { color: MUTED_COLOR } },
  { text: "• Local RAG Engine: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "A lightweight local JavaScript indexing script queries a highly compressed JSON database of WAEC marking schemes and feeds context straight into the local Gemma model.", options: { color: MUTED_COLOR } }
], { x: 0.8, y: 1.8, w: 11, h: 4.5, fontSize: 16 });

// Slide 7: Traction & Market Opportunity
const s7 = pptx.addSlide(slideStyle);
s7.addText("MARKET OPPORTUNITY & TRACTION", { x: 0.8, y: 0.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: BRAND_PURPLE });
s7.addText("Early validation & huge scaling potential", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 26, bold: true, color: TEXT_COLOR });

// Card 1: Traction
s7.addText("Current Traction", { x: 0.8, y: 1.8, w: 5.2, h: 0.4, fontSize: 18, bold: true, color: TEXT_COLOR });
s7.addText("3 Active Users", { x: 0.8, y: 2.3, w: 5.2, h: 0.6, fontSize: 32, bold: true, color: ACCENT_AMBER });
s7.addText("Validating local WebGPU loading, database integrity, and gamified streak mechanics on test devices.\n\nLive Platform: https://purpleschool.org", { x: 0.8, y: 3.0, w: 5.2, h: 2.0, fontSize: 15, color: MUTED_COLOR });

// Card 2: Market Size
s7.addText("Market Potential", { x: 6.6, y: 1.8, w: 5.2, h: 0.4, fontSize: 18, bold: true, color: TEXT_COLOR });
s7.addText("5 Million+ Students", { x: 6.6, y: 2.3, w: 5.2, h: 0.6, fontSize: 32, bold: true, color: BRAND_PURPLE });
s7.addText("Targeting WAEC, NECO, and JAMB candidates across Nigeria, Ghana, Sierra Leone, Liberia, and The Gambia.", { x: 6.6, y: 3.0, w: 5.2, h: 2.0, fontSize: 15, color: MUTED_COLOR });

// Slide 8: Business Model
const s8 = pptx.addSlide(slideStyle);
s8.addText("BUSINESS MODEL", { x: 0.8, y: 0.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: BRAND_PURPLE });
s8.addText("A sustainable, impact-driven framework", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 26, bold: true, color: TEXT_COLOR });
s8.addText([
  { text: "• Freemium Student Access: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Core learning app, offline math AI tutor, and gamified streaks are 100% free for all students.\n\n", options: { color: MUTED_COLOR } },
  { text: "• Sponsor-a-Student Model: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Donation model (₦5,000/month) allowing parents, alumni, and organizations to sponsor low-income students' offline database upgrades.\n\n", options: { color: MUTED_COLOR } },
  { text: "• B2B School Portals: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "A premium subscription tier for secondary schools, providing teachers and administrators with student study analytics and syllabus progress reports.", options: { color: MUTED_COLOR } }
], { x: 0.8, y: 1.8, w: 11, h: 4.5, fontSize: 16 });

// Slide 9: Why Google AI Accelerator?
const s9 = pptx.addSlide(slideStyle);
s9.addText("WHY GOOGLE AI ACCELERATOR?", { x: 0.8, y: 0.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: BRAND_PURPLE });
s9.addText("Accelerating educational equality in Africa", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 26, bold: true, color: TEXT_COLOR });
s9.addText([
  { text: "• Gemma Optimizations: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Collaborate with Google engineers to optimize Gemma 2 2B runtimes for low-spec Android devices.\n\n", options: { color: MUTED_COLOR } },
  { text: "• Browser storage alignment: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Work with Chrome's engineers on caching capacities and WebGPU configurations for PWAs.\n\n", options: { color: MUTED_COLOR } },
  { text: "• Ingestion Power: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Leverage Google Cloud credits to run bulk scraping and parsing models to ingest 30+ years of West African past exam questions and rubrics into our database.", options: { color: MUTED_COLOR } }
], { x: 0.8, y: 1.8, w: 11, h: 4.5, fontSize: 16 });

// Slide 10: Team & Vision
const s10 = pptx.addSlide(slideStyle);
s10.addText("THE TEAM & VISION", { x: 0.8, y: 0.5, w: 8, h: 0.4, fontSize: 16, bold: true, color: BRAND_PURPLE });
s10.addText("Mission-driven execution for educational equity", { x: 0.8, y: 0.9, w: 11, h: 0.6, fontSize: 26, bold: true, color: TEXT_COLOR });
s10.addText([
  { text: "• Chidiebere V. Christopher, Founder & Lead Developer: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "Full-stack engineer building the core offline-first gamified learning architecture, dedicated to making high-quality tutoring free for West African youth.\n\n", options: { color: MUTED_COLOR } },
  { text: "• Our Core Vision: ", options: { bold: true, color: TEXT_COLOR } },
  { text: "We believe that financial status or network reliability should not dictate a student's educational outcomes. We are building the infrastructure to make advanced AI accessible on any device, anywhere, for free.", options: { color: MUTED_COLOR } }
], { x: 0.8, y: 1.8, w: 11, h: 4.5, fontSize: 16 });

// Save presentation
pptx.writeFile({ fileName: "PurpleSchool_Pitch_Deck.pptx" })
  .then(() => console.log("SUCCESS: PurpleSchool_Pitch_Deck.pptx created successfully!"))
  .catch(err => console.error("ERROR generating PPTX:", err));
