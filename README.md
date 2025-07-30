# Qloo-LLM-Hackathon
Project for Qloo Hackaton: https://qloo-hackathon.devpost.com/rules?_gl=1*wco9yh*_ga_0YHJK3Y10M*czE3NTIyMTEzOTQkbzEkZzAkdDE3NTIyMTE0MDEkajUzJGwwJGgw

# 🌍 Cultural Intelligence Assistant

**Cultural Intelligence Assistant** is an AI-powered recommendation tool designed for content creators, marketers, and media professionals seeking culturally resonant ideas.

By combining Qloo’s cultural intelligence API with large language models (LLMs), the assistant generates creative concepts and insights based on natural language descriptions of target audiences. Whether you’re developing a TV show, film, game, music project, or marketing campaign, this tool helps uncover deep cultural preferences and trends that inspire impactful storytelling.

---

## 🎯 Who Is This For?

- 🎬 **Content Producers** (TV, film, digital, podcasts, games)
- 📣 **Marketing Agencies & Brand Strategists**
- 🧠 **Cultural Researchers & Trend Analysts**

---

## 🧠 How It Works

Describe your target audience using natural language. The assistant will analyze the input and return a markdown-formatted list of recommendations or cultural insights tailored to your described audience.

### ✅ What to Include in Your Prompt

Your prompt should describe **2 or more** of the following:

- 📍 **Location** (e.g., city, country, or region)  
  _Examples: "Young adults in Tokyo", "Teens from Southern California"_

- 🧑‍🎓 **Age group or generation**  
  _Examples: "Gen Z students", "Women in their 30s"_

- 🎭 **Cultural tastes, habits, or interests**  
  _Examples: "They’re into indie horror, anime, and retro games."_

- 💬 **Emotional traits or values** (optional, but useful)  
  _Examples: "They value irony and nostalgia."_

---

### ❌ What Not to Write

Avoid vague or generic prompts like:

- “Give me something cool”
- “Any suggestions?”
- “What should I write?”

These won’t produce meaningful results.

---

## 💡 Good Prompt Examples

- "I'm writing a web series for Gen Z girls in NYC who are obsessed with astrology, TikTok aesthetics, and indie romance films."

- "Looking for game concept ideas for millennial men in Berlin who love cyberpunk, underground techno, and glitch art."

---

## 🛠️ Project Setup

### 🔧 Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Markdown Renderer**: `react-markdown`
- **API Integration**: Hugging Face-hosted FastAPI (LLM)
- **Icons**: Lucide

---

## 🚀 Running the App Locally

1. **Clone the repository**

```bash
git clone https://github.com/your-username/cultural-intelligence-assistant.git
cd frontend
npm i
npm run dev
