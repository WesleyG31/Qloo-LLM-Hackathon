# core/qloo_client.py
import requests
import json
from src.custom_exception import CustomException
from src.logger import get_logger

logger = get_logger("qloo_client")

async def call_qloo_insights(params: dict, api_key: str) -> dict:
    try:
        logger.info("##### INITIALIZING QLOO_CLIENT.PY - call_qloo_insights ##### ")
        url = "https://hackathon.api.qloo.com/v2/insights"
        headers = {
            "x-api-key": api_key
        }

        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code == 200:
            logger.info("##### FINISHED -- INITIALIZING QLOO_CLIENT.PY - call_qloo_insights ##### ")
            return response.json()
        else:
            raise ValueError(f"Qloo API Error {response.status_code}: {response.text}")

        
    except Exception as e:
        logger.error(f"ERROR INITIALIZING QLOO_CLIENT.PY - call_qloo_insights : {e}")
        raise CustomException("ERROR INITIALIZING QLOO_CLIENT.PY - call_qloo_insights", e)


def prepare_tags_for_llm(qloo_response: dict) -> str:

    try:
        logger.info("##### INITIALIZING QLOO_CLIENT.PY - prepare_tags_for_llm ##### ")
        tags = qloo_response.get("results", {}).get("tags", [])
        if not tags:
            raise ValueError("No tags found in Qloo response.")

        tags_json = json.dumps(tags, indent=2)

        logger.info("##### FINISHED -- INITIALIZING QLOO_CLIENT.PY - prepare_tags_for_llm ##### ")
        return tags_json

    except Exception as e:
        logger.error(f"ERROR cleaning Qloo tags for LLM: {e}")
        raise CustomException("Failed to prepare tags for LLM", e)
