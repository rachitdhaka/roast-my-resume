from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables (for local dev)
load_dotenv()

# Import agent after loading env vars to ensuring OPENROUTER_API_KEY is available
from api.agent import agent

app = FastAPI()

class RoastRequest(BaseModel):
    resume_text: str
    job_description: str

@app.post("/api/analyze")
async def analyze_resume(request: RoastRequest):
    try:
        # Construct the prompt for the agent
        user_prompt = (
            f"Resume Content:\n{request.resume_text}\n\n"
            f"Job Description:\n{request.job_description}"
        )
        
        # Run the agent synchronously (Vercel serverless functions work best with sync entry points or standard async)
        # pydantic_ai's run_sync is useful here
        result = agent.run_sync(user_prompt)
        
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
