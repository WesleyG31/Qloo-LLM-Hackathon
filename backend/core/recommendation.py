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
        logger.info("##### INITIALIZING RECOMMENDATION.PY ##### ")
        parsed_response = await extract_preferences(prompt, llm_model, openrouter_api_key)

        logger.info("##### GETTING JSON FROM RECOMMENDATION.PY ##### ")
        parsed = json.loads(parsed_response)
        likes = parsed.get("likes", [])
        dislikes = parsed.get("dislikes", [])
        categories = parsed.get("categories", [])
        logger.info("##### FINISHED - GETTING JSON FROM RECOMMENDATION.PY ##### ")

        recommendations = {}

        for cat in categories:
            recs = await fetch_qloo_recommendations(
                api_key=qloo_api_key,
                likes=likes,
                dislikes=dislikes,
                category=cat
            )
            recommendations[cat] = recs

        resultado = {
            "profile": f"Gustos detectados: {likes}. Categorías: {categories}",
            "recommendations": recommendations,
            "follow_up_prompt": "¿Quieres más recomendaciones en alguna categoría específica?"
        }

        logger.info("##### FINISHED -- INITIALIZING RECOMMENDATION.PY ##### ")

        return resultado
    except Exception as e:
        logger.error(f"ERROR INITIALIZING RECOMMENDATION.PY: {e}")
        raise CustomException("ERROR INITIALIZING RECOMMENDATION.PY", e)
