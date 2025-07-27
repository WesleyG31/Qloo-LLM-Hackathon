# core/llm_parser.py
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

from src.custom_exception import CustomException
from src.logger import get_logger

logger = get_logger("llm_parser")

async def extract_preferences(mensaje: str, model: str, api_key: str) -> dict:
    try:
        logger.info("##### INITIALIZING LLM_PARSER.PY ##### ")

        try:
                logger.info("##### Creating RAG chain #####")
                prompt = """
                            You are an assistant that analyzes cultural preferences.\n"
                                "From the user's text, extract a list of:\n"
                                "- 'likes': things they like (e.g., 'Radiohead', 'existentialist novels')\n"
                                "- 'dislikes': things they dislike (optional)\n"
                                "- 'categories': related content types (e.g., music, books, travel, movies...)\n\n"
                                "Return recommendations in strict JSON format only."
                                This is the user's text: {document}
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
        
        logger.info("##### FINISHED -- INITIALIZING LLM_PARSER.PY ##### ")
        return final_answer
    except Exception as e:
        logger.error(f"ERROR INITIALIZING LLM PARSER.PY: {e}")
        raise CustomException("ERROR INITIALIZING LLM PARSER.PY", e)


