"use client";

import { AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface ResumeAnalysis {
  roast: string;
  match_score: number;
  improvements: string[];
  summary_rewrite: string;
}

interface RoastResultProps {
  result: ResumeAnalysis;
}

export default function RoastResult({ result }: RoastResultProps) {
  return (
    <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Score Section */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
            <TrendingUp size={20} /> Match Score
          </h3>
          <span className="text-3xl font-bold">{result.match_score}/100</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className="bg-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${result.match_score}%` }}
          />
        </div>
      </div>

      {/* The Roast */}
      <div className="bg-slate-900 border border-red-900/30 p-8 rounded-2xl relative shadow-xl">
        <div className="absolute -top-3 -left-3 bg-red-500 text-white px-3 py-1 text-sm font-bold rotate-[-5deg] shadow-lg">
          THE VERDICT
        </div>
        <AlertTriangle className="w-12 h-12 text-red-500/20 absolute bottom-4 right-4" />
        <blockquote className="text-lg md:text-xl text-slate-300 italic leading-relaxed border-l-4 border-red-500 pl-4">
          "{result.roast}"
        </blockquote>
      </div>

      {/* Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
            <CheckCircle size={18} /> Improvements
          </h3>
          <ul className="space-y-3">
            {result.improvements.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-slate-300 text-sm"
              >
                <span className="text-emerald-500 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Summary Rewrite */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">
            Professional Summary
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {result.summary_rewrite}
          </p>
        </div>
      </div>
    </div>
  );
}
