import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

// GitHub API Cache
let githubCache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", os: "Srinidhi OS v2.5", timestamp: new Date().toISOString() });
});

// GitHub API Proxy with fallback
app.get("/api/github", async (req, res) => {
  const username = "Srinidhi-070";

  if (githubCache && (Date.now() - githubCache.timestamp < CACHE_TTL)) {
    return res.json(githubCache.data);
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { "User-Agent": "Srinidhi-Portfolio-OS" }
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: { "User-Agent": "Srinidhi-Portfolio-OS" }
      })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API returned status ${userRes.status}`);
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    const formattedRepos = reposData.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      topics: repo.topics || [],
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      homepage: repo.homepage,
      fork: repo.fork
    }));

    // Calculate language stats
    const languageStats: Record<string, number> = {};
    formattedRepos.forEach((repo: any) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    const payload = {
      user: {
        login: userData.login,
        name: userData.name || "Srinidhi N S",
        avatar_url: userData.avatar_url,
        bio: userData.bio || "AI & Data Science Graduate — aspiring AI Engineer and full-stack developer",
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        html_url: userData.html_url
      },
      repositories: formattedRepos,
      languages: languageStats,
      totalStars: formattedRepos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0)
    };

    githubCache = { data: payload, timestamp: Date.now() };
    res.json(payload);
  } catch (error: any) {
    console.error("GitHub API error, serving fallback:", error.message);
    // Return structured offline fallback
    res.json({
      user: {
        login: username,
        name: "Srinidhi N S",
        avatar_url: "https://github.com/Srinidhi-070.png",
        bio: "AI & Data Science Graduate — aspiring AI Engineer and full-stack developer",
        public_repos: 16,
        followers: 24,
        following: 12,
        created_at: "2022-01-01T00:00:00Z",
        html_url: `https://github.com/${username}`
      },
      repositories: [
        {
          id: 1,
          name: "GuardianVoice",
          description: "AI Voice Scam Detection System using Deep Learning & Audio Pattern Analysis",
          html_url: `https://github.com/${username}/GuardianVoice`,
          stargazers_count: 14,
          forks_count: 3,
          language: "Python",
          topics: ["ai", "voice-analysis", "scam-detection", "deep-learning"],
          updated_at: new Date().toISOString()
        },
        {
          id: 2,
          name: "-LeafMedic---Automated-Plant-Leaf-Disease-Detection",
          description: "Automated Plant Leaf Disease Detection using Convolutional Neural Networks",
          html_url: `https://github.com/${username}/-LeafMedic---Automated-Plant-Leaf-Disease-Detection`,
          stargazers_count: 12,
          forks_count: 2,
          language: "Python",
          topics: ["computer-vision", "cnn", "agriculture-ai"],
          updated_at: new Date().toISOString()
        },
        {
          id: 3,
          name: "cloud-ai-anomaly-guardian",
          description: "Cloud-native anomaly detection engine monitoring real-time server telemetry",
          html_url: `https://github.com/${username}/cloud-ai-anomaly-guardian`,
          stargazers_count: 9,
          forks_count: 1,
          language: "Python",
          topics: ["cloud-ai", "anomaly-detection", "machine-learning"],
          updated_at: new Date().toISOString()
        },
        {
          id: 4,
          name: "RoadSafe",
          description: "Real-time AI Accident Detection and Emergency Response Notification System",
          html_url: `https://github.com/${username}/RoadSafe`,
          stargazers_count: 11,
          forks_count: 2,
          language: "Python",
          topics: ["opencv", "yolo", "road-safety"],
          updated_at: new Date().toISOString()
        },
        {
          id: 5,
          name: "webrtc-vlm-detection",
          description: "Real-time Vision Language Model object detection stream via WebRTC",
          html_url: `https://github.com/${username}/webrtc-vlm-detection`,
          stargazers_count: 15,
          forks_count: 4,
          language: "TypeScript",
          topics: ["webrtc", "vlm", "vision-language", "react"],
          updated_at: new Date().toISOString()
        }
      ],
      languages: {
        Python: 10,
        TypeScript: 4,
        JavaScript: 2
      },
      totalStars: 61,
      isFallback: true
    });
  }
});

// AI Terminal & Chat Assistant endpoint using Gemini API
app.post("/api/ai-terminal", async (req, res) => {
  const { prompt, history = [] } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const gemini = getGeminiClient();
  if (!gemini) {
    return res.json({
      text: "Gemini API key is not configured in the workspace. Srinidhi's OS is operating in simulated offline terminal mode. Try standard commands like 'help', 'projects', 'skills', 'experience', 'github', or 'sudo hire-me'!"
    });
  }

  const systemInstruction = `You are Srinidhi OS AI Assistant, built into Srinidhi N S's interactive Portfolio OS.
Srinidhi N S is an AI & Data Science graduate and Product Operations Intern who is actively building toward a career as an AI Engineer. Do not describe him as a current AI Engineer or Machine Learning Engineer.
Key information about Srinidhi:
- Email: nssrinidhi72884@gmail.com
- GitHub: https://github.com/Srinidhi-070
- LinkedIn: https://linkedin.com/in/ns-srinidhi-270351218
- Major AI Projects:
  1. GuardianVoice: AI Voice Scam Detection
  2. LeafMedic: Automated Plant Disease Detection
  3. Cloud AI Anomaly Guardian: Telemetry Anomaly Guard
  4. RoadSafe: AI Accident Detection
  5. Gesture-Based Media Controller: Computer Vision Gesture UI
  6. AI Courtroom Simulator: Legal Tech Generative AI
  7. AI for Health: Disease Prediction using ML
  8. MIRAGE MVP: Future State Image Simulator
  9. Emotional Syllabus: Generative AI Learning Tool
  10. Sentiment Analysis
- Full Stack Projects: AR Campus Navigation (Trailix), WebRTC VLM Detection, Campus Hub, Weather Bot, SaaS Landing Page, Portfolio Website
- Technical Skills: PyTorch, TensorFlow, Scikit-Learn, OpenCV, Hugging Face, WebRTC, Python, TypeScript, React, Express, Node.js, FastAPI, Docker, Tailwind CSS, PostgreSQL, Vector DBs, Product Operations, QA & Automated Testing.

Respond concisely, with technical clarity and a high-tech terminal style tone. Keep formatting clean and readable using code blocks or markdown bullet points when relevant.`;

  try {
    const response = await gemini.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || "No response generated." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to query Gemini AI assistant.", details: error.message });
  }
});

// Contact Endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, message, subject } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  // Log contact attempt
  console.log(`[CONTACT FORM] From: ${name} <${email}> | Subject: ${subject || 'Portfolio Inquiry'}`);
  console.log(`Message: ${message}`);

  // In production, this can send an email via Resend/Nodemailer or webhooks
  res.json({
    success: true,
    message: `Thank you ${name}! Your message has been logged in Srinidhi's OS inbox. Direct emails can also be sent to nssrinidhi72884@gmail.com.`
  });
});

// Start Server with Vite Integration
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Srinidhi OS] Server online running on http://localhost:${PORT}`);
  });
}

start();
