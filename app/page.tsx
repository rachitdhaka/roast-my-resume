"use client";

import { useState } from "react";
import { Flame, Loader2 } from "lucide-react";
import RoastResult from "../components/RoastResult";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRoast = async () => {
    if (!resumeText) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_text: resumeText,
          job_description: jobDescription || "General Application",
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Roast failed:", error);
      alert(
        "Something went wrong. The AI refused to roast you (or the server crashed).",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-5xl px-4 py-20 flex flex-col items-center min-h-screen">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-slate-900 rounded-full mb-4 ring-1 ring-slate-800">
          <Flame className="w-8 h-8 text-orange-500" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          Roast My Resume
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Paste your resume and the job description. We'll destroy your ego, but
          help you get hired.
        </p>
      </div>

      {/* Input Section */}
      {!result && (
        <div className="w-full max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">
                Paste Resume
              </label>
              <textarea
                className="w-full h-64 p-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none text-slate-300 placeholder:text-slate-600 font-mono text-sm leading-relaxed"
                placeholder="Paste your full resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">
                Job Description
              </label>
              <textarea
                className="w-full h-64 p-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none text-slate-300 placeholder:text-slate-600 font-mono text-sm leading-relaxed"
                placeholder="Which job are you applying for? (Optional)"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleRoast}
            disabled={loading || !resumeText}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-lg rounded-xl transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Roasting...
              </>
            ) : (
              "🔥 Roast Me"
            )}
          </button>
        </div>
      )}

      {/* Results Section */}
      {result && <RoastResult result={result} />}
    </main>
  );
}
