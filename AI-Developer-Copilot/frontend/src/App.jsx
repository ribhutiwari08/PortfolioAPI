import { useState } from "react";

const modes = ["explain", "debug", "review", "test", "refactor", "generate"];
const starter = `def calculate_total(items):\n    total = 0\n    for item in items:\n        total += item["price"]\n    return total`;

export default function App() {
  const [mode, setMode] = useState("review");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(starter);
  const [context, setContext] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

 async function runCopilot() {
  setLoading(true);

  try {
    const API_URL = import.meta.env.VITE_API_URL;

    const response = await fetch(`${API_URL}/api/copilot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode,
        language,
        code,
        context,
      }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    setResult(await response.json());

  } catch (error) {
    console.error("Copilot API Error:", error);

    setResult({
      summary: "Unable to connect to Copilot backend.",
      output: "Please check whether the backend is running.",
      suggestions: [
        "Check the Render backend URL.",
        "Check Vercel environment variables.",
        "Check backend CORS configuration.",
      ],
      demo_mode: false,
    });

  } finally {
    setLoading(false);
  }
}
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><span className="logo">⌘</span><div><strong>DevCopilot</strong><small>AI Developer Platform</small></div></div>
        <span className="status"><i /> API Ready</span>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">AI-POWERED ENGINEERING</p>
          <h1>Your intelligent pair programmer.</h1>
          <p className="sub">Explain code, debug failures, review architecture, generate tests, and refactor faster from one developer workspace.</p>
        </div>
      </section>

      <section className="workspace">
        <aside className="panel modes">
          <h3>Copilot Mode</h3>
          {modes.map(item => <button key={item} className={mode === item ? "mode active" : "mode"} onClick={() => setMode(item)}>{item}</button>)}
          <div className="tip"><b>Tip</b><p>Give the copilot the smallest reproducible snippet for better debugging and review results.</p></div>
        </aside>

        <section className="panel editor">
          <div className="panel-head"><div><span className="label">SOURCE CODE</span><select value={language} onChange={e => setLanguage(e.target.value)}><option>python</option><option>java</option><option>javascript</option><option>typescript</option></select></div><span className="kbd">⌘ Enter</span></div>
          <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck="false" />
          <textarea className="context" value={context} onChange={e => setContext(e.target.value)} placeholder="Optional context: error message, requirements, expected behavior..." />
          <button className="run" onClick={runCopilot} disabled={loading}>{loading ? "Analyzing…" : `Run Copilot · ${mode}`}</button>
        </section>

        <section className="panel result">
          <div className="panel-head"><span className="label">COPILOT OUTPUT</span>{result?.demo_mode && <span className="demo">Demo mode</span>}</div>
          {!result ? <div className="empty"><div className="spark">✦</div><h2>Ready when you are</h2><p>Choose a mode, paste your code, and let Copilot analyze it.</p></div> : <div className="answer"><h2>{result.summary}</h2><pre>{result.output}</pre><h3>Recommendations</h3><ul>{result.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul></div>}
        </section>
      </section>

      <footer>Built with React + FastAPI · Provider-agnostic LLM architecture</footer>
    </main>
  );
}
