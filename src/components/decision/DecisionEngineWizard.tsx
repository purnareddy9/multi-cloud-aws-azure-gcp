import React, { useState } from 'react';
import { decisionQuestions } from '../../data/decisionRules';
import { ArrowRight, RotateCcw, CheckCircle2, Sparkles, Scale, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DecisionEngineWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < decisionQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  // Calculate Scores
  const calculateResult = () => {
    let scores = { aws: 0, azure: 0, gcp: 0 };
    const rationales: string[] = [];

    decisionQuestions.forEach(q => {
      const chosenOptionId = selectedAnswers[q.id];
      if (chosenOptionId) {
        const option = q.options.find(o => o.id === chosenOptionId);
        if (option) {
          scores.aws += option.scores.aws;
          scores.azure += option.scores.azure;
          scores.gcp += option.scores.gcp;
          rationales.push(option.rationale);
        }
      }
    });

    const sorted = [
      { cloud: 'AWS', key: 'aws', score: scores.aws, color: 'text-amber-400 border-amber-500/40 bg-amber-950/30' },
      { cloud: 'Azure', key: 'azure', score: scores.azure, color: 'text-blue-400 border-blue-500/40 bg-blue-950/30' },
      { cloud: 'GCP', key: 'gcp', score: scores.gcp, color: 'text-sky-400 border-sky-500/40 bg-sky-950/30' }
    ].sort((a, b) => b.score - a.score);

    const winner = sorted[0];
    const runnerUp = sorted[1];

    return { winner, runnerUp, sorted, rationales };
  };

  const currentQ = decisionQuestions[currentStep];
  const canProceed = !!selectedAnswers[currentQ?.id];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Interactive Architectural Decision Engine
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100">Which Cloud Should I Choose?</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Enter your real-world technical, organizational, and financial requirements. We evaluate AWS, Azure, and GCP trade-offs to calculate the optimal cloud fit.
        </p>
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Step {currentStep + 1} of {decisionQuestions.length}</span>
            <span>{Math.round(((currentStep + 1) / decisionQuestions.length) * 100)}% Completed</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentStep + 1) / decisionQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Title */}
          <div>
            <h2 className="text-xl font-bold text-slate-100">{currentQ.question}</h2>
            <p className="text-xs text-slate-400 mt-1">{currentQ.description}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/50 border-cyan-500/80 shadow-lg shadow-cyan-950/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-slate-100">{opt.label}</div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{opt.description}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950' : 'border-slate-700'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 fill-cyan-400 text-slate-950" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
            >
              {currentStep === decisionQuestions.length - 1 ? 'Calculate Recommendation' : 'Next Question'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        (() => {
          const { winner, runnerUp, sorted, rationales } = calculateResult();
          return (
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
              {/* Winner Header */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/50 via-slate-900 to-slate-950 border border-cyan-500/40 text-center">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Top Recommended Cloud Platform
                </span>
                <h2 className="text-3xl font-extrabold text-slate-100 mt-1">
                  {winner.cloud}
                </h2>
                <p className="text-xs text-slate-300 mt-2 max-w-lg mx-auto">
                  Based on your requirements, {winner.cloud} offers the highest architectural efficiency, lowest operational complexity, and optimal pricing model.
                </p>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {sorted.map((item, idx) => (
                  <div key={item.key} className={`p-4 rounded-xl border ${item.color}`}>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>{idx + 1}. {item.cloud}</span>
                      <span>{item.score} pts</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Reasons */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800">
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Architectural Rationales
                </h3>
                <ul className="space-y-2 text-xs text-slate-300 list-disc pl-5">
                  {rationales.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Alternative & Trade-Offs */}
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800">
                <h3 className="text-sm font-bold text-slate-200 mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" /> Viable Alternative: {runnerUp.cloud}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {runnerUp.cloud} is a strong runner-up. If your organization has secondary constraints or partner incentives, consider {runnerUp.cloud} as an alternative, but account for potential retraining or tooling integration adjustments.
                </p>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> Test Another Workload
                </button>
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
};
