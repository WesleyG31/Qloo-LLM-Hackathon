# 🎬 Qloo x LLM Creative Recommendation Engine

An intelligent creative assistant that helps **content creators and entertainment strategists** generate *tailored storytelling and aesthetic ideas* based on cultural preferences extracted from natural language.

Project for Qloo Hackaton: https://qloo-hackathon.devpost.com/rules?_gl=1*wco9yh*_ga_0YHJK3Y10M*czE3NTIyMTEzOTQkbzEkZzAkdDE3NTIyMTE0MDEkajUzJGwwJGgw

> ✅ Powered by Qloo API + LLM (OpenAI or OpenRouter)  
> 🎯 Targeted at writers, producers, marketers, and creative teams  
> 🧠 Uses AI to parse prompts and deliver cultural intelligence

---

## 🚀 What Does This Project Do?

This tool transforms natural-language prompts into **highly specific creative recommendations**, such as:

- **Story tone & narrative themes**
- **Visual aesthetic references**
- **Relevant music, movies, or cultural inspiration**
- **Demographic-targeted insights**

It bridges **Qloo’s cultural graph** and an **LLM's generative power** to create a fully automated ideation engine for entertainment content.

---

## 👤 Who Is It For?

This tool is designed for:

🎥 **Content creators & screenwriters**  
🎧 **Creative directors & marketing teams**  
🧠 **Entertainment strategists & producers**  
📲 **Creators building media for specific audiences**

Whether you're building a series for Gen Z horror fans or designing music branding for NYC indie lovers — this system decodes your audience and **tells you what stories to create**.

---

## ✍️ How to Use It

### 1. 📝 Enter a prompt  
In plain English, describe your **target audience** and **general creative direction**.  
Example prompts:

```bash
"I'm writing a web series for Gen Z girls in NYC who are obsessed with astrology, TikTok aesthetics, and indie romance films."
"Looking for game concept ideas for millennial men in Berlin who love cyberpunk, underground techno, and glitch art."
```


### 2. 🔍 Behind the scenes...

- LLM parses your message to extract:
  - Location
  - Demographics (age, gender)
  - Cultural signals (tags, interests, media entities)

- Qloo’s API is queried for relevant tags from its global cultural graph.

- The LLM receives those tags back and generates a **custom-tailored recommendation**.

### 3. 💡 See your creative strategy

You'll receive a recommendation including:
- Story tone and visual mood
- Themes and character suggestions
- Style and media references
- Optional ARG/interactive suggestions

---

## ⚙️ Backend Architecture

- **FastAPI** server with async support
- **LLM interaction** via LangChain (`ChatOpenAI` / `ChatOpenRouter`)
- **Qloo API** integration for cultural tags
- **Robust error handling** & input validation
- **Dynamic tag parsing and payload flattening**

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

## Setup instruccions 

1. Clone the repo
```bash
git clone https://github.com/WesleyG31/Qloo-LLM-Hackathon
cd Qloo-LLM-Hackathon
```

2. (Optional) Create a virtual environment with Anaconda
```bash
conda create -n qloo-env python=3.10
conda activate qloo-env
pip install -e .
```

3. Set your environment variables
```bash
Create an file called .env 
OPENAI_API_KEY=your_openai_key
QLOO_API_KEY=your_qloo_key
```

4. Run the backend
```bash
uvicorn main:app --reload
```

## 🧠 Technologies Used
🧠 OpenAI / OpenRouter

🌐 Qloo API

🛠️ FastAPI

🎛️ LangChain

📊 Streamlit

🐍 Python 3.10+

