import React, { useState } from 'react';
import { fundamentalsData } from '../data/fundamentals';
import { Globe, Shield, Layers, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FundamentalsPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState(fundamentalsData[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
          <Globe className="w-3.5 h-3.5" /> LEVEL 0: Starting from Zero
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100">Cloud Fundamentals & Global Foundations</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Understand why companies use cloud, IaaS vs PaaS vs SaaS, Shared Responsibility, and how physical data centers form resilient global regions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Topic Navigation */}
        <div className="space-y-2">
          {fundamentalsData.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {topic.badge}
                </span>
                <div className="text-xs font-bold text-slate-200 mt-2">{topic.title}</div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{topic.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Center/Right Detailed Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{selectedTopic.badge}</span>
              <h2 className="text-2xl font-extrabold text-slate-100 mt-1">{selectedTopic.title}</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedTopic.summary}</p>
            </div>

            {/* ASCII / Visual Flow Diagram */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto custom-scrollbar">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Architecture Visual Model</span>
              <pre className="font-mono text-xs text-cyan-300 whitespace-pre">
                {selectedTopic.diagram}
              </pre>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              {selectedTopic.content.map((sec, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                  <h3 className="text-sm font-bold text-slate-100">{sec.heading}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{sec.explanation}</p>
                  <ul className="space-y-1.5 text-xs text-slate-400 list-disc pl-4">
                    {sec.keyPoints.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>

                  {/* Optional Comparison Table */}
                  {sec.comparisonTable && (
                    <div className="mt-4 overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
                        <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                          <tr>
                            {sec.comparisonTable.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-2.5 font-semibold">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80 bg-slate-950 text-slate-400 font-mono text-[11px]">
                          {sec.comparisonTable.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/50">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? 'font-bold text-slate-200' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Interview Question */}
            <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Common Cloud Architecture Interview Question
              </span>
              <div className="text-xs font-bold text-slate-200">{selectedTopic.interviewQuestion.question}</div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-cyan-400">Architectural Answer: </span>
                {selectedTopic.interviewQuestion.answer}
              </div>
            </div>

            {/* Next Track Navigation */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Ready to build cloud architectures?</span>
              <Link
                to="/aws"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
              >
                Proceed to AWS Track <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
