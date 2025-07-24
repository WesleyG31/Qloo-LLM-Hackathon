# core/llm_parser.py
import httpx
from src.custom_exception import CustomException
from src.logger import get_logger

logger = get_logger("llm_parser")

async def extract_preferences(prompt: str, model: str, api_key: str) -> dict:
    try:
        messages = [
            {
                "role": "system",
                "content": (
                            "You are an assistant that analyzes cultural preferences.\n"
                            "From the user's text, extract a list of:\n"
                            "- 'likes': things they like (e.g., 'Radiohead', 'existentialist novels')\n"
                            "- 'dislikes': things they dislike (optional)\n"
                            "- 'categories': related content types (e.g., music, books, travel, movies...)\n\n"
                            "Respond ONLY with a JSON containing these three keys."
                ),
            },
            {"role": "user", "content": prompt}
        ]

        headers = {
            "Authorization": f"Bearer {api_key}",
            "HTTP-Referer": "your-app-name",
            "X-Title": "AI"
        }

        payload = {
            "model": model,
            "messages": messages
        }

        async with httpx.AsyncClient(timeout=30) as client:
            response = await client.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        logger.error(f"Error extracting preferences: {e}")
        raise CustomException("LLM parsing failed", e)
