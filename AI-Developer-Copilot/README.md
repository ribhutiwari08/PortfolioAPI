# AI Developer Copilot Platform

A full-stack AI developer workspace for explaining code, debugging failures, reviewing implementations, generating tests, refactoring code, and assisting with implementation.

## Highlights

- React + Vite developer dashboard
- FastAPI REST backend with typed Pydantic contracts
- Six developer workflows: explain, debug, review, test, refactor, generate
- Provider-agnostic LLM integration point
- Safe demo mode when no API key is configured
- Pytest API tests
- Responsive dark developer-tool UI

## Architecture

```text
React / Vite UI
      │
      ▼
FastAPI REST API
      │
      ▼
Copilot Service Layer
      │
      ▼
LLM Provider Adapter
```

## Run

### Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## API

`POST /api/copilot`

```json
{
  "mode": "debug",
  "language": "python",
  "code": "print(1 / 0)",
  "context": "The request crashes during processing."
}
```

## Production Roadmap

1. Connect an OpenAI-compatible model provider.
2. Add streaming responses with Server-Sent Events.
3. Add repository indexing and RAG for multi-file context.
4. Add GitHub pull-request review and patch generation.
5. Add sandboxed test/lint execution.
6. Add authentication, projects, conversation history, and team workspaces.

## Portfolio Value

This project demonstrates frontend engineering, REST API design, Python/FastAPI backend development, typed contracts, AI integration architecture, testing, developer tooling, and production-oriented system design.
