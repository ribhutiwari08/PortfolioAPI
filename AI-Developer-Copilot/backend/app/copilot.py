import os
from .schemas import CopilotRequest, CopilotResponse


def _demo(request: CopilotRequest) -> CopilotResponse:
    code = request.code.strip()
    suggestions = [
        "Keep functions small and focused on one responsibility.",
        "Add automated tests for the happy path and edge cases.",
        "Validate external input before using it in application logic.",
    ]
    outputs = {
        "explain": f"This {request.language} snippet contains {len(code.splitlines())} line(s). Break it into logical units and document non-obvious behavior.",
        "debug": "Start by reproducing the failure, inspect the stack trace, and isolate the smallest failing input.",
        "review": "The code is ready for a focused review around readability, error handling, test coverage, and maintainability.",
        "test": "Create unit tests for normal input, empty input, invalid input, and the key boundary conditions.",
        "refactor": "Extract repeated logic into reusable functions, use descriptive names, and reduce nested control flow.",
        "generate": "Demo mode is active. Add an LLM API key to generate production-quality implementation code.",
    }
    return CopilotResponse(
        mode=request.mode,
        summary=f"AI Developer Copilot analyzed your request in {request.mode} mode.",
        suggestions=suggestions,
        output=outputs[request.mode],
        demo_mode=True,
    )


def run_copilot(request: CopilotRequest) -> CopilotResponse:
    # The adapter is intentionally provider-agnostic. Add a real LLM client here
    # without changing the frontend contract. The starter runs safely in demo mode.
    if not os.getenv("LLM_API_KEY"):
        return _demo(request)
    # Production integration point: call your preferred OpenAI-compatible provider.
    return _demo(request)
