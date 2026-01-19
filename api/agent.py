import os
from typing import List
from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel

# Define the response structure
class ResumeAnalysis(BaseModel):
    roast: str
    match_score: int
    improvements: List[str]
    summary_rewrite: str

# Initialize the model using OpenRouter
model = OpenAIModel(
    'google/gemini-2.0-flash-exp:free',
    base_url='https://openrouter.ai/api/v1',
    api_key=os.getenv("OPENROUTER_API_KEY"),
)

# Create the agent
agent = Agent(
    model,
    result_type=ResumeAnalysis,
    system_prompt=(
        "You are a brutal but helpful career coach. Your goal is to 'roast' resumes "
        "by finding their flaws, generic fluff, and formatting errors. "
        "Be funny, slightly mean, but ultimately constructive. "
        "You must also provide a match score (0-100) based on how well the resume fits the job description, "
        "3-5 specific improvements, and a professional rewrite of the summary section."
    ),
)
