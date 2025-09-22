# backend/app/orchestrator/engine.py
from crewai import Task, Crew
from .agents import researcher, summarizer, reviewer

# Map agent names to instances
agent_map = {
    "Researcher": researcher,
    "Summarizer": summarizer,
    "Reviewer": reviewer
}

def run_workflow(workflow_def: dict, topic: str):
    tasks = []

    for step in workflow_def["execution_order"]:
        agent = agent_map[step]

        tasks.append(
            Task(
                description=f"Process topic: {topic}",
                agent=agent,
                expected_output="Processed text"
            )
        )

    crew = Crew(agents=[agent_map[a] for a in workflow_def["agents"]], tasks=tasks)
    result = crew.kickoff()
    return result
