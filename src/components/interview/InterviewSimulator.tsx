import React, { useState } from 'react';
import { interviewScenarios, interviewQuestionBank } from '../../data/interviews';
import { ShieldCheck, MessageSquare, CheckCircle, HelpCircle, Sparkles, Award, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InterviewSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'bank'>('simulator');
  const [currentScenario] = useState(interviewScenarios[0]);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [stageSelections, setStageSelections] = useState<Record<number, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const currentStage = currentScenario.stages[currentStageIdx];

  const handleSelectOption = (optionId: string) => {
    setStageSelections(prev => ({ ...prev, [currentStageIdx]: optionId }));
  };

  const handleNextStage = () => {
    if (currentStageIdx < currentScenario.stages.length - 1) {
      setCurrentStageIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleReset = () => {
    setCurrentStageIdx(0);
    setStageSelections({});
    setIsFinished(false);
  };

  const calculateScore = () => {
    let total = 0;
    currentScenario.stages.forEach((stage, idx) => {
      const selectedId = stageSelections[idx];
      const opt = stage.options.find(o => o.id === selectedId);
      if (opt) total += opt.score;
    });
    return Math.round((total / (currentScenario.stages.length * 10)) * 100);
  };

  const filteredQuestions = interviewQuestionBank.filter(q => 
    q.question.toLowerCase().includes(searchFilter.toLowerCase()) ||
    q.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" /> Level 12: Senior Cloud Architect Interview Room
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100">
            Architecture Interview Simulator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Defend high-level and low-level architectural decisions against senior technical interviewers.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'simulator'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Interview Simulator
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'bank'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Question Bank ({interviewQuestionBank.length})
          </button>
        </div>
      </div>

      {activeTab === 'simulator' ? (
        !isFinished ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            {/* Scenario Problem Banner */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-500/30">
                  {currentScenario.level}
                </span>
                <span className="text-xs text-slate-400">⏱️ {currentScenario.timeLimitMinutes} min round</span>
              </div>
              <h2 className="text-lg font-bold text-slate-100 mb-1">{currentScenario.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{currentScenario.problemStatement}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-[11px]">
                <div><span className="text-slate-500">Target RPS:</span> <span className="font-semibold text-slate-300">{currentScenario.requirements.nonFunctional.rps}</span></div>
                <div><span className="text-slate-500">Availability:</span> <span className="font-semibold text-slate-300">{currentScenario.requirements.nonFunctional.availability}</span></div>
                <div><span className="text-slate-500">Target RPO:</span> <span className="font-semibold text-slate-300">{currentScenario.requirements.nonFunctional.rpo}</span></div>
                <div><span className="text-slate-500">Target RTO:</span> <span className="font-semibold text-slate-300">{currentScenario.requirements.nonFunctional.rto}</span></div>
              </div>
            </div>

            {/* Current Stage Interview Question */}
            <div className="p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Interviewer Question • {currentStage.stageName}
              </span>
              <p className="text-sm font-semibold text-slate-100 mt-1">
                "{currentStage.prompt}"
              </p>
            </div>

            {/* Candidate Defense Options */}
            <div className="space-y-3">
              {currentStage.options.map((opt) => {
                const isSelected = stageSelections[currentStageIdx] === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/80 shadow-md shadow-cyan-950/20'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full border text-xs font-bold shrink-0 mt-0.5">
                        {opt.id.toUpperCase()}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{opt.label}</div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{opt.details}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">Round {currentStageIdx + 1} of {currentScenario.stages.length}</span>
              <button
                onClick={handleNextStage}
                disabled={!stageSelections[currentStageIdx]}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
              >
                {currentStageIdx === currentScenario.stages.length - 1 ? 'Finish Interview' : 'Defend Decision'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Finished Interview Summary */
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Interview Evaluation Completed</span>
              <h2 className="text-3xl font-extrabold text-slate-100 mt-1">
                Candidate Score: {calculateScore()}%
              </h2>
              <p className="text-xs text-slate-400 mt-2 max-w-lg mx-auto">
                {calculateScore() >= 80
                  ? 'Strong Hire: Exceptional understanding of latency, caching, database locking, and disaster recovery.'
                  : 'Needs Review: Solid fundamentals, but review the architectural trade-offs below.'}
              </p>
            </div>

            {/* Model Architecture Summary */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <h3 className="text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" /> Benchmark Senior Architect Architecture
              </h3>
              <pre className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {currentScenario.modelArchitectureSummary}
              </pre>
            </div>

            {/* Architectural Defense Script */}
            <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <h3 className="text-sm font-bold text-emerald-400 mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Interviewer Defense Script
              </h3>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                "{currentScenario.architecturalDefense}"
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> Retry Interview
              </button>
            </div>
          </div>
        )
      ) : (
        /* Question Bank View */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <input
              type="text"
              placeholder="Search interview questions by keyword (e.g. SQS, Kubernetes, IMDS, DR)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    {q.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{q.difficulty}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-100">{q.question}</h3>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  <div className="font-semibold text-cyan-400 mb-1">Architectural Answer:</div>
                  {q.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
