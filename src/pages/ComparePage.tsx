import React, { useState } from 'react';
import { serviceComparisons } from '../data/comparisons';
import { Shuffle, CheckCircle, Scale, ArrowRight, Layers, Sparkles, Cpu, HardDrive, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ComparePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(serviceComparisons[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
          <Shuffle className="w-3.5 h-3.5" /> LEVEL 4: Multi-Cloud Comparison Matrix
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
          AWS vs Azure vs GCP Service Matrix
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          We never make arbitrary claims like "AWS is best." We analyze exact requirements, architectural trade-offs, pricing models, and capabilities to help you choose the right service.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {serviceComparisons.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedCategory(item)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory.id === item.id
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            {item.category}
          </button>
        ))}
      </div>

      {/* Side-by-Side 3-Cloud Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AWS Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-950/70 text-amber-400 border border-amber-500/30">
              AWS OFFERING
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-100">{selectedCategory.aws.name}</h2>
          
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <span className="font-bold text-amber-400 block mb-1">Best For:</span>
            <p className="text-slate-300 leading-relaxed">{selectedCategory.aws.bestFor}</p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Architectural Features</span>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
              {selectedCategory.aws.keyFeatures.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Pricing Model: </span>
            {selectedCategory.aws.pricingModel}
          </div>
        </div>

        {/* Azure Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-blue-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-950/70 text-blue-400 border border-blue-500/30">
              AZURE OFFERING
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-100">{selectedCategory.azure.name}</h2>
          
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <span className="font-bold text-blue-400 block mb-1">Best For:</span>
            <p className="text-slate-300 leading-relaxed">{selectedCategory.azure.bestFor}</p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Architectural Features</span>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
              {selectedCategory.azure.keyFeatures.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Pricing Model: </span>
            {selectedCategory.azure.pricingModel}
          </div>
        </div>

        {/* GCP Card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-sky-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-950/70 text-sky-400 border border-sky-500/30">
              GCP OFFERING
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-100">{selectedCategory.gcp.name}</h2>
          
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <span className="font-bold text-sky-400 block mb-1">Best For:</span>
            <p className="text-slate-300 leading-relaxed">{selectedCategory.gcp.bestFor}</p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Architectural Features</span>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
              {selectedCategory.gcp.keyFeatures.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Pricing Model: </span>
            {selectedCategory.gcp.pricingModel}
          </div>
        </div>
      </div>

      {/* Decision Matrix Scenarios */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Scale className="w-5 h-5 text-cyan-400" /> Scenario-Based Decision Matrix
        </h3>
        <p className="text-xs text-slate-400">
          How to decide between the three based on exact architectural constraints:
        </p>

        <div className="space-y-3 mt-4">
          {selectedCategory.decisionMatrix.map((dm, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-200">Constraint: "{dm.scenario}"</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                  dm.winner === 'aws' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                  dm.winner === 'azure' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                  dm.winner === 'gcp' ? 'bg-sky-950 text-sky-400 border border-sky-500/30' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  Recommended: {dm.winner.toUpperCase()}
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed pl-1">{dm.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trade-Off Summary */}
      <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
        <span className="font-bold text-cyan-400 block mb-1">Architectural Synthesis & Trade-Offs:</span>
        {selectedCategory.architecturalTradeoffs}
      </div>

      {/* Fast Link to Transition Guide */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-100">Transitioning between clouds?</h3>
          <p className="text-xs text-slate-400 mt-0.5">Explore the "I Know AWS → Teach Me Azure / GCP" mental model bridge.</p>
        </div>
        <Link
          to="/transition"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition-colors"
        >
          View Transition Bridge <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
