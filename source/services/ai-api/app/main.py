import os
from typing import List, Optional
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title='SamkhyaAcademy AI Service', version='0.2.0')
SERVICE_TOKEN = os.getenv('AI_SERVICE_TOKEN', '')

def authorize(x_service_token: Optional[str]):
    if SERVICE_TOKEN and x_service_token != SERVICE_TOKEN:
        raise HTTPException(status_code=401, detail='invalid service token')

class QuestionRequest(BaseModel):
    course_id: str
    lesson_id: Optional[str] = None
    lesson_text: str
    count: int = Field(default=5, ge=1, le=25)
    difficulty: str = 'mixed'

class Question(BaseModel):
    prompt: str
    options: List[str]
    correct_index: int
    explanation: str

class EnrichmentRequest(BaseModel):
    content_type: str
    title: str
    body: str
    goals: List[str] = []

class AssistantRequest(BaseModel):
    user_id: str
    course_id: str
    lesson_id: Optional[str] = None
    question: str
    retrieved_context: List[str] = []

@app.get('/health')
def health():
    return {'status': 'ok', 'service': 'ai-api', 'version': '0.2.0'}

@app.post('/v1/exams/generate', response_model=List[Question])
def generate_exam(req: QuestionRequest, x_service_token: Optional[str] = Header(default=None)):
    authorize(x_service_token)
    # Provider adapter will replace this deterministic development implementation.
    return [
        Question(
            prompt=f'Practice question {i + 1} for {req.course_id}',
            options=['Option A', 'Option B', 'Option C', 'Option D'],
            correct_index=0,
            explanation='Development stub. Replace with a governed LLM provider adapter and evaluation layer.',
        )
        for i in range(req.count)
    ]

@app.post('/v1/content/enrich')
def enrich_content(req: EnrichmentRequest, x_service_token: Optional[str] = Header(default=None)):
    authorize(x_service_token)
    return {
        'title': req.title,
        'suggested_summary': req.body[:280],
        'suggested_learning_objectives': req.goals,
        'warnings': ['Development stub — human review is required before publishing.'],
    }

@app.post('/v1/course-assistant')
def course_assistant(req: AssistantRequest, x_service_token: Optional[str] = Header(default=None)):
    authorize(x_service_token)
    return {
        'answer': 'Development provider adapter placeholder. Production must answer only from governed course context.',
        'citations': [],
        'course_id': req.course_id,
        'lesson_id': req.lesson_id,
        'requires_human_review': False,
    }
