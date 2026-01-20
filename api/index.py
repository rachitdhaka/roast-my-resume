from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Load environment variables (for local dev)
load_dotenv()

# Import agent after loading env vars to ensure OPENROUTER_API_KEY is available
from .agent import agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        
        # Run the agent synchronously
        result = agent.run_sync(user_prompt)
        
        return result.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Vercel requires 'handler' to be the ASGI app
handler = app
