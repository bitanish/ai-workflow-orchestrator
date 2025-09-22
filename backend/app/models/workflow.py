from pydantic import BaseModel
from typing import List

class Workflow(BaseModel):
    name: str
    agents: List[str]
    execution_order: List[str]
