import React from 'react';
import { ArchitectureScorecard } from '../../types';
import { ShieldCheck, AlertTriangle, AlertCircle, CheckCircle2, Lightbulb, X, Award } from 'lucide-react';

interface ArchitectureValidatorProps {
  scorecard: ArchitectureScorecard;
  onClose?: () => void;
}

export const ArchitectureValidator: React.FC<ArchitectureValidatorProps> = ({ scorecard, onClose }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
    if (score >= 5) return 'text-amber-400 border-amber-500/40 bg-amber-950/40';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/40';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-500';
    if (score >= 5) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const categories = [
    { label: 'Availability', data: scorecard.availability },
    { label: 'Security', data: scorecard.security },
    { label: 'Scalability', data: scorecard.scalability },
    { label: 'Networking', data: scorecard.networking },
    { label: 'Disaster Recovery (DR)', data: scorecard.disasterRecovery },
    { label: 'Cost Optimization', data: scorecard.costOptimization },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900/95 border border-slate-800 rounded-xl p-4 backdrop-blur-md overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-bold text-slate-100">Educational Architecture Review</h3>
            <p className="text-[11px] text-slate-400">Automated Well-Architected validation</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Overall Score Badge */}
      <div className="my-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Architecture Score</span>
          <div className="text-xs text-slate-400 mt-0.5">
            {scorecard.overallScore >= 80 ? 'Production Enterprise Ready' : scorecard.overallScore >= 50 ? 'Functional with Architectural Risks' : 'Critical Flaws Detected'}
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl text-2xl font-black border ${getScoreColor(Math.round(scorecard.overallScore / 10))}`}>
          {scorecard.overallScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Pillar Breakdown */}
      <div className="space-y-3 mb-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pillar Evaluation</h4>
        <div className="grid grid-cols-1 gap-2.5">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-200">{cat.label}</span>
                <span className="font-bold text-cyan-300">{cat.data.score} / 10</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${getScoreBarColor(cat.data.score)}`}
                  style={{ width: `${cat.data.score * 10}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">{cat.data.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Issues */}
      {scorecard.criticalIssues.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-500/40">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-xs mb-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            Critical Architectural Flaws ({scorecard.criticalIssues.length})
          </div>
          <ul className="space-y-1.5 text-[11px] text-rose-200/90 pl-5 list-disc">
            {scorecard.criticalIssues.map((issue, idx) => (
              <li key={idx}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {scorecard.warnings.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-amber-950/30 border border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            Architectural Warnings ({scorecard.warnings.length})
          </div>
          <ul className="space-y-1.5 text-[11px] text-amber-200/90 pl-5 list-disc">
            {scorecard.warnings.map((warn, idx) => (
              <li key={idx}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Strengths */}
      {scorecard.strengths.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            Architectural Strengths ({scorecard.strengths.length})
          </div>
          <ul className="space-y-1.5 text-[11px] text-emerald-200/90 pl-5 list-disc">
            {scorecard.strengths.map((str, idx) => (
              <li key={idx}>{str}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Actionable Educational Recommendations */}
      {scorecard.recommendations.length > 0 && (
        <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs mb-2">
            <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0" />
            Recommendations to Improve
          </div>
          <ul className="space-y-1.5 text-[11px] text-cyan-200/90 pl-5 list-disc">
            {scorecard.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400 text-center">
        * Evaluation is provided as automated educational guidance.
      </div>
    </div>
  );
};
