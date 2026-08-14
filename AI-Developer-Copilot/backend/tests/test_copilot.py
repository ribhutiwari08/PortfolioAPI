from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_copilot_demo():
    response = client.post("/api/copilot", json={
        "mode": "debug",
        "language": "python",
        "code": "print(1 / 0)",
        "context": "Crash during request handling"
    })
    assert response.status_code == 200
    assert response.json()["demo_mode"] is True
