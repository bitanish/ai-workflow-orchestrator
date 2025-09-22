from duckduckgo_search import DDGS
from crewai_tools import tool

@tool
def web_search(query: str) -> str:
    """Search the web for real-time information and return snippets."""
    try:
        ddg = DDGS()
        results = ddg.text(query, max_results=3)
        if not results:
            return "No results found."
        
        # Concatenate snippets
        snippets = [f"- {r['title']}: {r['body']}" for r in results]
        return "\n".join(snippets)
    except Exception as e:
        return f"Error while searching: {str(e)}"
