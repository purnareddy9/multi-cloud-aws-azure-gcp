import React, { useState } from 'react';
import { scenariosList } from '../data/scenarios';
import { Compass, Sparkles, CheckCircle2, ArrowRight, ShieldAlert, DollarSign, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ScenariosPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState(scenariosList[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
          <Compass className="w-3.5 h-3.5" /> LEVEL 11: Real-World Architecture Scenarios
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
          Enterprise Architecture Challenges & Capstones
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Apply your architectural knowledge to solve progressively harder real-world industry requirements. Analyze constraints, choose cloud services, review trade-offs, and defend reference architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Scenario List */}
        <div className="space-y-2">
          {scenariosList.map((sc) => {
            const isSelected = selectedScenario.id === sc.id;
            return (
              <div
                key={sc.id}
                onClick={() => setSelectedScenario(sc)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                    {sc.levelBadge}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    sc.difficulty === 'Beginner' ? 'text-emerald-400 bg-emerald-950/50' :
                    sc.difficulty === 'Intermediate' ? 'text-blue-400 bg-blue-950/50' :
                    sc.difficulty === 'Advanced' ? 'text-amber-400 bg-amber-950/50' :
                    'text-purple-400 bg-purple-950/50'
                  }`}>
                    {sc.difficulty}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200">{sc.title}</div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{sc.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Center/Right Scenario Breakdown */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-cyan-400">{selectedScenario.levelBadge}</span>
                <span className="text-xs text-slate-400">• {selectedScenario.difficulty} Level Challenge</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-100">{selectedScenario.title}</h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedScenario.summary}</p>
            </div>

            {/* Requirements & Constraints Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Functional & SLA Requirements</span>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
                  {selectedScenario.requirements.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Architectural Constraints</span>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
                  {selectedScenario.constraints.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommended Cloud Components */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Selected Cloud Building Blocks</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedScenario.recommendedNodes.map((node, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-200">{node.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        node.provider === 'aws' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                        node.provider === 'azure' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                        node.provider === 'gcp' ? 'bg-sky-950 text-sky-400 border border-sky-500/30' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {node.provider}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{node.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reference Architecture Details */}
            <div className="p-5 rounded-xl bg-slate-950/90 border border-cyan-500/30 space-y-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Reference Architecture Solution</span>
                <h3 className="text-base font-bold text-slate-100 mt-0.5">{selectedScenario.referenceArchitecture.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedScenario.referenceArchitecture.explanation}</p>
              </div>

              {/* Step Sequence */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Traffic & Data Flow</span>
                {selectedScenario.referenceArchitecture.diagramSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/70 border border-slate-800 text-xs text-slate-300">
                    <span className="font-mono text-cyan-400 font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Trade-Offs & Cost Estimate */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="text-xs text-slate-300">
                  <span className="font-bold text-amber-400">Architectural Trade-Offs: </span>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-400">
                    {selectedScenario.referenceArchitecture.tradeOffs.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium pt-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Estimated Baseline Cost: {selectedScenario.referenceArchitecture.costEstimate}</span>
                </div>
              </div>
            </div>

            {/* Action to build in Lab */}
            <div className="flex justify-end pt-2">
              <Link
                to="/lab"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
              >
                Design this in Architecture Lab <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
