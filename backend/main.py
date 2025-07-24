from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.logger import get_logger
from src.custom_exception import CustomException
from core.recommendation import generate_recommendations
import os

app = FastAPI()
logger = get_logger("main")

# Model Config
LLM_MODEL = "deepseek/deepseek-chat-v3-0324:free"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
QLOO_API_KEY = os.getenv("QLOO_API_KEY")

# Request Schema
class RecommendationRequest(BaseModel):
    prompt: str

@app.get("/")
def root():
    return {"message": "AI backend online."}

@app.post("/recommend")
def recommend(request: RecommendationRequest):
    try:
        result = generate_recommendations(
            prompt=request.prompt,
            llm_model=LLM_MODEL,
            openrouter_api_key=OPENROUTER_API_KEY,
            qloo_api_key=QLOO_API_KEY
        )
        return result
    except CustomException as ce:
        logger.error(f"CustomException: {ce}")
        raise HTTPException(status_code=500, detail=str(ce))
    except Exception as e:
        logger.error(f"Unhandled Exception: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")