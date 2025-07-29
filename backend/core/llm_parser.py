# core/llm_parser.py
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

import json
import re


from src.custom_exception import CustomException
from src.logger import get_logger

logger = get_logger("llm_parser")

async def extract_preferences(mensaje: str, model: str, api_key: str) -> dict:
    try:
        logger.info("##### INITIALIZING LLM_PARSER.PY - extract_preferences ##### ")

        try:
                logger.info("##### Creating RAG chain #####")
                prompt = """
                        You are a cultural assistant that prepares audience intelligence queries using the Qloo API.

                        From the user's input, extract a structured profile of the intended audience using this format:

                        {{
                        "filter_type": "urn:tag",
                        "take": 10,
                        "signals": {{
                        "demographics": {{
                        "age": "35_and_younger"
                        }},
                        "location": {{
                        "query": ["New York", "Los Angeles"]
                        }},
                        "entities": {{
                        "urn:entity:artist": ["Radiohead"],
                        "urn:entity:book": ["Norwegian Wood"],
                        "urn:entity:movie": ["Pulp Fiction"],
                        "urn:entity:tv_show": [],
                        "urn:entity:video_game": [],
                        "urn:entity:destination": ["Tokyo"]
                        }}
                        }}
                        }}

                        Guidelines:
                        - Fill in the "entities" with items the user clearly references.
                        - If the user does not mention a type (e.g., no books), leave that list empty.
                        - If age or location is missing, do not guess.
                        - Always return a valid JSON (no markdown, no explanations).

                        Respond only in valid JSON format with double quotes for all keys and strings.

                        User input:
                        {document}
                        """
                llm = ChatOpenAI(
                    base_url="https://openrouter.ai/api/v1",
                    openai_api_key=api_key,
                    model=model
                )
                prompt_template = ChatPromptTemplate.from_template(prompt)
                logger.info("##### FINISHED - Creating RAG chain #####")
        except Exception as e:
                logger.error(f"Error while Creating RAG chain: {e}")
                raise CustomException("Error while Creating RAG chain", e)
        try:
                logger.info("##### GETTING THE ANSWER FROM CHAIN #####")
                answer = prompt_template | llm | StrOutputParser()
                final_answer = answer.invoke({"document": mensaje})
                logger.info("##### FINISHED - GETTING THE ANSWER FROM CHAIN #####")
        except Exception as e:
                logger.error(f"Error while GETTING THE ANSWER FROM CHAIN: {e}")
                raise CustomException("Error GETTING THE ANSWER FROM CHAIN", e)
        
        logger.info("##### FINISHED -- INITIALIZING LLM_PARSER.PY - extract_preferences ##### ")
        return final_answer
    except Exception as e:
        logger.error(f"ERROR INITIALIZING LLM PARSER.PY: {e}")
        raise CustomException("ERROR INITIALIZING LLM PARSER.PY", e)


def force_json_quotes(text):
    return re.sub(r'(?<=\{|\s)(\w+)(?=\s*:)', r'"\1"', text)

def clean_llm_json_output(llm_output: str) -> dict:
    try:
        logger.info("##### INITIALIZING LLM_PARSER.PY - clean_llm_json_output ##### ")
        cleaned = re.sub(r"```json|```", "", llm_output).strip()
        cleaned = force_json_quotes(cleaned)
        returned = json.loads(cleaned)
        logger.info("##### FINISHED -- INITIALIZING LLM_PARSER.PY - clean_llm_json_output ##### ")
        return returned      
    except Exception as e:
        logger.error(f"ERROR INITIALIZING LLM_PARSER.PY - clean_llm_json_output : {e}")
        raise CustomException("ERROR INITIALIZING LLM_PARSER.PY - clean_llm_json_output", e)
    
def flatten_qloo_payload(payload: dict) -> dict:
        try:
                logger.info("##### INITIALIZING LLM_PARSER.PY - flatten_qloo_payload ##### ")
                params = {
                        "filter.type": payload["filter_type"],
                        "take": payload["take"]
                }

                # Demographics
                demographics = payload.get("signals", {}).get("demographics", {})
                for key, value in demographics.items():
                        params[f"signal.demographics.{key}"] = value

                # Locations
                locations = payload.get("signals", {}).get("location", {}).get("query", [])
                for loc in locations:
                        
                        params.setdefault("signal.location.query", []).append(loc)

                # Entities
                entities = payload.get("signals", {}).get("entities", {})
                for urn_type, values in entities.items():
                       for v in values:
                             params.setdefault(f"signal.entity.{urn_type}", []).append(v)

                logger.info("##### FINISHED -- INITIALIZING LLM_PARSER.PY - flatten_qloo_payload ##### ")
                return params
        except Exception as e:
                logger.error(f"ERROR INITIALIZING LLM PARSER.PY - flatten_qloo_payload : {e}")
                raise CustomException("ERROR INITIALIZING LLM PARSER.PY - flatten_qloo_payload", e)


def is_valid_qloo_payload(payload: dict) -> (bool, str):
    if not isinstance(payload, dict):
        return False, "The response is not a valid JSON object."

    has_location = "signal.location.query" in payload and bool(payload["signal.location.query"])
    has_entities = any(k.startswith("signal.interests.entities") for k in payload)
    has_tags = any(k.startswith("signal.interests.tags") for k in payload)

    if not (has_location or has_entities or has_tags):
        return False, (
            "Please specify at least a location (e.g., 'New York'), "
            "a cultural interest (e.g., a movie, artist, or video game), or a tag."
        )

    return True, ""

