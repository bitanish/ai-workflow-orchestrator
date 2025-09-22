from fastapi import FastAPI
from app.routes.auth import router as auth_router
from app.routes.workflows import router as wf_router
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Workflow Orchestrator Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(wf_router, prefix='/workflows')
