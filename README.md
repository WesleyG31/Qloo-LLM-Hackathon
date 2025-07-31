# 🌍 Cultural Intelligence Assistant  
**AI-powered Creative Recommendation Engine for Content Creators**  

🚀 Built for the [Qloo Hackathon](https://qloo-hackathon.devpost.com/)  
🔗 Live Demo (Hugging Face): [https://wesleygonzales-qloo-hackaton-api.hf.space](https://wesleygonzales-qloo-hackaton-api.hf.space)  
💻 Frontend Repo: `frontend/`  
⚙️ Backend Repo: `backend/`  

---

## 🎯 What Is This?

**Cultural Intelligence Assistant** is an AI-powered recommendation tool designed for content creators, marketers, and media professionals seeking culturally resonant ideas.  

It combines **Qloo’s cultural graph API** with the power of **LLMs** (via OpenAI or OpenRouter) to transform natural language prompts into **deep, creative recommendations** for storytelling, design, and strategy.

---

## 🧠 How It Works

1. **You write a prompt** describing your audience (location, interests, age group, etc.)
2. **The LLM extracts cultural signals** like demographics, entities, and interests.
3. **Qloo API is queried** for tags and affinity scores.
4. **LLM generates** a personalized creative recommendation with:
   - 🎬 Story tone & narrative themes  
   - 🎭 Aesthetic or mood  
   - 🎵 Music/movie references  
   - 🌐 Social/interactive ideas  

---

## 👥 Who Is It For?

- 🎬 **TV/film producers & screenwriters**  
- 📣 **Marketing teams & creative agencies**  
- 🎧 **Game developers & storytellers**  
- 🧠 **Cultural analysts & brand strategists**

---

## ✅ Example Prompts

```text
"I'm writing a web series for Gen Z girls in NYC who are obsessed with astrology, TikTok aesthetics, and indie romance films."

"Looking for game concept ideas for millennial men in Berlin who love cyberpunk, underground techno, and glitch art."
```

---

## 🛠️ Tech Stack

### 🧩 Backend (FastAPI)
- 🧠 **LLM via LangChain** (OpenAI/OpenRouter)
- 🌐 **Qloo API Integration**
- ⚙️ **Async processing + error validation**
- 🧪 **Tag parsing and payload flattening**

### 💻 Frontend (React + Vite)
- 💅 Tailwind CSS UI
- 🪄 `react-markdown` for LLM response rendering
- 🔁 Fetches from Hugging Face-hosted API
- 🎯 Works with natural language input

---

## 🧪 Good Prompt Guidelines

To get the best recommendations, prompts should include **2 or more** of the following:

| Element        | Example                                                  |
|----------------|----------------------------------------------------------|
| 📍 Location     | "young women in NYC", "artists in Berlin"               |
| 👥 Demographics | "Gen Z", "Millennial men", "people aged 18–25"          |
| 🎨 Interests    | "indie films", "video games", "experimental fashion"     |
| 💬 Traits       | "value nostalgia", "confident, emotionally open"         |

---

## 📦 Example JSON Flow

**LLM Extracted JSON → Qloo Input:**
```json
{
  "signals": {
    "location": { "query": ["New York"] },
    "demographics": { "age": "35_and_younger", "gender": "female" },
    "entities": { "movies": ["Her", "Zola"], "music": ["Phoebe Bridgers"] },
    "tags": ["indie", "experimental film", "internet culture"]
  }
}
```

---

## 🧰 Local Setup

### Backend Setup
```bash
git clone https://github.com/WesleyG31/Qloo-LLM-Hackathon
cd Qloo-LLM-Hackathon/backend

# (Optional) Create env
conda create -n qloo-env python=3.10
conda activate qloo-env
pip install -e .

# Create .env file with your keys
OPENAI_API_KEY=your_openai_key
QLOO_API_KEY=your_qloo_key

# Run backend
uvicorn main:app --reload
```

---

### Frontend Setup
```bash
cd Qloo-LLM-Hackathon/frontend
npm install
npm run dev
```

---

## 🧠 What We Learned

- Using **LLMs to structure user prompts** into structured JSON for APIs
- Parsing cultural data from **Qloo’s graph API**
- Building a fast and clean **React + FastAPI** integration
- Handling ambiguous natural language inputs with validation

---

## 🧗 Challenges Faced

- Parsing loosely formatted LLM output into valid JSON  
- Understanding Qloo’s tag system and graph data  
- Designing a good prompt format that works well for creators  
- Hosting and CORS setup for Hugging Face Spaces

---

## 🎥 Demo Video  
Watch here: [📺 YouTube Demo](https://www.youtube.com/watch?v=ZtOk7wVw-ts)
Try the app here: [Live Demo](https://culturalinsights.netlify.app/) 
---

## ✨ Inspiration

We were inspired by the **intersection of creativity and data**—how raw audience description could be mapped to cultural signals and turned into powerful ideas using AI.

This assistant is like having a **cultural strategist + creative partner**, all in one.
