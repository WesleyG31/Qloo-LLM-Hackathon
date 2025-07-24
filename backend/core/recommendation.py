# core/recommendation.py
import json
from core.llm_parser import extract_preferences
from core.qloo_client import fetch_qloo_recommendations
from src.custom_exception import CustomException
from src.logger import get_logger

logger = get_logger("recommendation")

import asyncio

async def generate_recommendations(prompt: str, llm_model: str, openrouter_api_key: str, qloo_api_key: str):
    try:
        logger.info("Extracting preferences from prompt")
        parsed_response = await extract_preferences(prompt, llm_model, openrouter_api_key)
        parsed = json.loads(parsed_response)

        likes = parsed.get("likes", [])
        dislikes = parsed.get("dislikes", [])
        categories = parsed.get("categories", [])

        recommendations = {}

        for cat in categories:
            recs = await fetch_qloo_recommendations(
                api_key=qloo_api_key,
                likes=likes,
                dislikes=dislikes,
                category=cat
            )
            recommendations[cat] = recs

        return {
            "profile": f"Gustos detectados: {likes}. Categorías: {categories}",
            "recommendations": recommendations,
            "follow_up_prompt": "¿Quieres más recomendaciones en alguna categoría específica?"
        }
    except Exception as e:
        raise CustomException("Error al generar recomendaciones", e)
