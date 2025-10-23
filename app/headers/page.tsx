"use client";
import { useEffect, useState } from "react";

export default function HeadersPage() {
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/echo")
      .then(r => r.json())
      .then(j => setHeaders(j.headers || {}))
      .catch(e => setError(String(e)));
  }, []);

  return (
    <main>
      <h2>Headers Inspector</h2>
      <p>Server-observed request headers (via Edge API):</p>
      {error && <p style={{color:"crimson"}}>{error}</p>}
      <pre style={{whiteSpace:"pre-wrap", background:"#f6f6f6", padding:12, borderRadius:8}}>
        {JSON.stringify(headers, null, 2)}
      </pre>
    </main>
  );
}
