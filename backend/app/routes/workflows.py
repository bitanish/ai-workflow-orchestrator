from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models.workflow import Workflow
from app.utils.deps import get_current_user
from app.orchestrator.engine import run_workflow

router = APIRouter()

# Temporary in-memory DB
workflows_db: List[Workflow] = []

@router.post("/create")
def create_workflow(workflow: Workflow, current_user: str = Depends(get_current_user)):
    # check duplicate names
    for wf in workflows_db:
        if wf.name == workflow.name:
            raise HTTPException(status_code=400, detail="Workflow name already exists")
    
    workflows_db.append(workflow)
    return {"message": "Workflow created successfully", "workflow": workflow}

@router.get("/list")
def list_workflows(current_user: str = Depends(get_current_user)):
    return {"workflows": workflows_db}

@router.post("/run/{name}")
def run_saved_workflow(name: str, topic: str, current_user: str = Depends(get_current_user)):
    # find workflow
    workflow = next((wf for wf in workflows_db if wf.name == name), None)
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")

    # run it
    result = run_workflow(workflow.dict(), topic)
    return {"workflow": name, "topic": topic, "result": result}