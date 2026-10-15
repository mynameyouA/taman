import asyncio
import os
import sys
import json
from langchain_openai import ChatOpenAI
from browser_use import Agent

async def run_browser_task(query: str):
    """Run a browser automation task using browser-use."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return {"error": "OPENAI_API_KEY environment variable is not set."}

    # Initialize the LLM
    llm = ChatOpenAI(model="gpt-4o", api_key=api_key)
    
    # Initialize the browser-use agent
    agent = Agent(
        task=query,
        llm=llm,
    )
    
    # Run the agent
    result = await agent.run()
    return {
        "status": "success",
        "query": query,
        "result": str(result)
    }

async def main():
    # Allow Node.js to pass a query as a command line argument
    if len(sys.argv) > 1:
        query = sys.argv[1]
    else:
        query = "Tìm kiếm các trang web uy tín về thông tin tử vi và phong thủy, tóm tắt các điểm chính."

    result = await run_browser_task(query)
    
    # Print the result as JSON for Node.js to consume
    print(json.dumps(result, ensure_ascii=False))

if __name__ == "__main__":
    # Ensure standard output uses UTF-8 to handle Vietnamese characters properly
    sys.stdout.reconfigure(encoding='utf-8')
    asyncio.run(main())
