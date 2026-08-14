from typing import Literal
from pydantic import BaseModel, Field

Mode = Literal["explain", "debug", "review", "test", "refactor", "generate"]

class CopilotRequest(BaseModel):
    mode: Mode
    language: str = Field(min_length=1, max_length=40)
    code: str = Field(min_length=1, max_length=30000)
    context: str = Field(default="", max_length=5000)

class CopilotResponse(BaseModel):
    mode: str
    summary: str
    suggestions: list[str]
    output: str
    demo_mode: bool
