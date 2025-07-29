# core/recommendation.py
import asyncio
from core.llm_parser import extract_preferences,clean_llm_json_output,flatten_qloo_payload,is_valid_qloo_payload
from core.qloo_client import call_qloo_insights,prepare_tags_for_llm
from core.recomend_from_llm import get_recomendations_from_llm
from src.custom_exception import CustomException
from src.logger import get_logger

logger = get_logger("recommendation")



async def generate_recommendations(prompt: str, llm_model: str, openrouter_api_key: str, qloo_api_key: str):
    try:
        logger.info("##### INITIALIZING RECOMMENDATION.PY ##### ")
        parsed_response = await extract_preferences(prompt, llm_model, openrouter_api_key)
        payload = clean_llm_json_output(parsed_response)
        params = flatten_qloo_payload(payload)
        
        is_valid, error_msg = is_valid_qloo_payload(params)

        if not is_valid:
            logger.warning(f"### Qloo input validation failed: {error_msg}")
            return {
                "error": True,
                "message": f"We couldn't generate recommendations. {error_msg} Try mentioning specific locations, interests, or artists."
            }


        json_from_qloo = await call_qloo_insights(params, qloo_api_key)
        tags_for_llm = prepare_tags_for_llm(json_from_qloo)
        result = await get_recomendations_from_llm(prompt,tags_for_llm, llm_model,openrouter_api_key)

        result_json ={
            "error": False,
            "message": result
        }

        logger.info("##### FINISHED -- INITIALIZING RECOMMENDATION.PY ##### ")

        return result_json
    except Exception as e:
        logger.error(f"ERROR INITIALIZING RECOMMENDATION.PY: {e}")
        raise CustomException("ERROR INITIALIZING RECOMMENDATION.PY", e)
