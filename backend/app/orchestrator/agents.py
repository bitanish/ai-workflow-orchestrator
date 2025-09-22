import os
from crewai import Agent
from app.orchestrator.tools import web_search

OPENAI_MODEL = "gpt-4o-mini"

researcher = Agent(
    role="Researcher",
    goal="Find information on a given topic",
    backstory="An expert in web research and gathering information",
    llm=OPENAI_MODEL,
    tools=[web_search],
)

summarizer = Agent(
    role="Summarizer",
    goal="Summarize information clearly",
    backstory="Condenses content into key insights",
    llm=OPENAI_MODEL,
)

reviewer = Agent(
    role="Reviewer",
    goal="Polish the text into a professional final report",
    backstory="An editor who refines and formats content",
    llm=OPENAI_MODEL,
)
