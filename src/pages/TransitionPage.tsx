import React, { useState } from 'react';
import { transitionMapAWS } from '../data/comparisons';
import { ArrowRight, Sparkles, Cpu, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TransitionPage: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = transitionMapAWS.filter(item =>
    item.awsConcept.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.azureEquivalent.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.gcpEquivalent.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.keyDifference.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Mental Model Translation Bridge
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
          "I Know AWS — Teach Me Azure & GCP"
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Leverage your existing AWS knowledge to accelerate your mastery of Microsoft Azure and Google Cloud Platform. Translate IAM, VPCs, Security Groups, and storage concepts directly into their exact multi-cloud equivalents.
        </p>
      </div>

      {/* Filter Search */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <input
          type="text"
          placeholder="Filter concepts (e.g. 'IAM', 'VPC', 'Security Group', 'S3')..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Mapping Cards */}
      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* AWS Concept */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30">
                  WHAT YOU KNOW IN AWS
                </span>
                <h3 className="text-sm font-bold text-slate-100 mt-2">{item.awsConcept}</h3>
              </div>

              {/* Azure Equivalent */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/40">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-500/30">
                  HOW TO DO IT IN AZURE
                </span>
                <h3 className="text-sm font-bold text-slate-100 mt-2">{item.azureEquivalent}</h3>
              </div>

              {/* GCP Equivalent */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/40">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-500/30">
                  HOW TO DO IT IN GCP
                </span>
                <h3 className="text-sm font-bold text-slate-100 mt-2">{item.gcpEquivalent}</h3>
              </div>
            </div>

            {/* Crucial Architectural Differences */}
            <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
              <span className="font-bold text-cyan-400">Crucial Architectural Differences & Nuances: </span>
              {item.keyDifference}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
