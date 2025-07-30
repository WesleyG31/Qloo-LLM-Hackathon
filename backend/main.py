from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.logger import get_logger
from src.custom_exception import CustomException
from core.recommendation_pipeline import generate_recommendations

import os

app = FastAPI()
logger = get_logger("main")

# Locally -----
from dotenv import load_dotenv
load_dotenv()
# Locally ------

# Allow your frontend origin (http://localhost:5173)
#origins = [
 #   "http://localhost:5173",
  #  "http://127.0.0.1:5173",
    # you can add other origins here if needed
#]

#app.add_middleware(
 #   CORSMiddleware,
  #  allow_origins=origins,  # ✅ Use the variable here!
   # allow_credentials=True,
    #allow_methods=["*"],
    #allow_headers=["*"],
#)




# Model Config
LLM_MODEL = "deepseek/deepseek-chat-v3-0324:free"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
QLOO_API_KEY = os.getenv("QLOO_API_KEY")

# Request Schema
class RecommendationRequest(BaseModel):
    prompt: str

@app.get("/")
def root():
    return {"message": "########## API - WORKING ##########"}

@app.post("/recommend/")
async def recommend(request: RecommendationRequest):
    try:
        logger.info("#################### API ####################  Post -- recommend endpoint called")
        result = await generate_recommendations(
            prompt=request.prompt,
            llm_model=LLM_MODEL,
            openrouter_api_key=OPENROUTER_API_KEY,
            qloo_api_key=QLOO_API_KEY
        )
        logger.info("#################### API ####################  Post -- recommend endpoint called successfully")
        return JSONResponse(content=result)
        #return "Recommendations generated successfully"
    except Exception as e:
        logger.error(f"ERROR CALLING RECOMMEND ENDPOINT: {e}")
        raise CustomException("ERROR CALLING RECOMMEND ENDPOINT", e)
