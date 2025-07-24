# core/qloo_client.py
import httpx
from src.custom_exception import CustomException
from src.logger import get_logger

logger = get_logger("qloo_client")

async def fetch_qloo_recommendations(api_key: str, likes: list, dislikes: list, category: str) -> list:
    try:
        headers = {
            "x-api-key": api_key,
            "Content-Type": "application/json"
        }
        payload = {
            "likes": likes,
            "dislikes": dislikes,
            "category": category
        }

        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.post("https://api.qloo.com/v1/recommend", json=payload, headers=headers)
            response.raise_for_status()
            return response.json().get("recommendations", [])
    except Exception as e:
        logger.error(f"Qloo API error for category {category}: {e}")
        raise CustomException(f"Qloo API error for category {category}", e)
