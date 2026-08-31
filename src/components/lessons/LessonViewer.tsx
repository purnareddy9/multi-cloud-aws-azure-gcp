import React, { useState } from 'react';
import { LessonModule } from '../../types';
import { markLessonComplete, isLessonComplete } from '../../lib/progressStore';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, Play, ShieldAlert, Sparkles, 
  HelpCircle, ArrowRight, BookOpen, Layers, 
  Terminal, Code2, AlertTriangle, Lightbulb, ExternalLink
} from 'lucide-react';

interface LessonViewerProps {
  lesson: LessonModule;
  onNextLesson?: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({ lesson, onNextLesson }) => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'diagram' | 'equivalents' | 'handson' | 'scenario' | 'interview'>('concepts');
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completed, setCompleted] = useState(isLessonComplete(lesson.id));
  const [cliOutput, setCliOutput] = useState<string | null>(null);

  const handleRunSimulation = () => {
    if (lesson.handsOn.cliCommand || lesson.handsOn.terraformCode) {
      setCliOutput(`[SIMULATING EXECUTION IN BROWSER ENVIRONMENT...]\n$ ${lesson.handsOn.cliCommand || 'terraform apply -auto-approve'}\n\n[SUCCESS 200 OK]\n${lesson.handsOn.expectedOutcome}`);
    }
  };

  const handleQuizSelect = (optionId: string) => {
    if (!quizSubmitted) {
      setSelectedQuizOption(optionId);
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const chosen = lesson.scenarioChallenge.options.find(o => o.id === selectedQuizOption);
    if (chosen?.isCorrect) {
      markLessonComplete(lesson.id, 100);
      setCompleted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Lesson Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${
                lesson.track === 'aws' ? 'bg-amber-950/60 text-amber-400 border-amber-500/30' :
                lesson.track === 'azure' ? 'bg-blue-950/60 text-blue-400 border-blue-500/30' :
                lesson.track === 'gcp' ? 'bg-sky-950/60 text-sky-400 border-sky-500/30' :
                'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                {lesson.track.toUpperCase()} TRACK • Level {lesson.level}
              </span>
              <span className="text-xs text-slate-400">• {lesson.estimatedMinutes} min read</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              {lesson.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#/lab"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold transition-all shadow-sm"
              title="Open and edit this architecture in the interactive drag-and-drop designer"
            >
              <Terminal className="w-3.5 h-3.5" /> Open in Lab
            </a>
            {completed && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-xs font-bold shadow-lg shadow-emerald-950/40">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Completed
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto custom-scrollbar">
          {[
            { id: 'concepts', label: '1. Core Concepts', icon: BookOpen },
            { id: 'diagram', label: '2. Architecture Diagram', icon: Layers },
            { id: 'equivalents', label: '3. Cloud Equivalents', icon: Sparkles },
            { id: 'handson', label: '4. Hands-On Lab', icon: Terminal },
            { id: 'scenario', label: '5. Scenario Challenge', icon: HelpCircle },
            { id: 'interview', label: '6. Interview Defense', icon: ShieldAlert }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Core Concepts */}
      {activeTab === 'concepts' && (
        <div className="space-y-6">
          {/* What & Why */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">1. What is it?</span>
              <p className="text-sm text-slate-200 mt-2 leading-relaxed">{lesson.whatIsIt}</p>
            </div>
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">2. Why does it exist?</span>
              <p className="text-sm text-slate-200 mt-2 leading-relaxed">{lesson.whyExists}</p>
            </div>
          </div>

          {/* Simple Explanation */}
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> 3. Simple Explanation
            </span>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">{lesson.simpleExplanation}</p>
          </div>

          {/* Real World Example */}
          <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">5. Real-World Case Study</span>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{lesson.realWorldExample}</p>
          </div>

          {/* When to use vs When NOT to use */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">7. When to Use</span>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-300 list-disc pl-4">
                {lesson.whenToUse.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">8. When NOT to Use</span>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-300 list-disc pl-4">
                {lesson.whenNotToUse.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Mistakes */}
          {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
            <div className="p-5 rounded-xl bg-slate-900/80 border border-amber-500/30">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> 12. Common Mistakes & Anti-Patterns
              </span>
              <div className="mt-3 space-y-3">
                {lesson.commonMistakes.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                    <div className="font-bold text-rose-300">❌ Mistake: {m.mistake}</div>
                    <div className="text-slate-400 mt-0.5">⚠️ Consequence: {m.consequence}</div>
                    <div className="text-emerald-300 mt-1 font-medium">✅ Architectural Fix: {m.fix}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          <div className="p-5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">16. Key Takeaways</span>
            <ul className="mt-2 space-y-1.5 text-xs text-cyan-100 list-disc pl-4">
              {lesson.keyTakeaways.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Visual Architecture Diagram */}
      {activeTab === 'diagram' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800">
            <h3 className="text-base font-bold text-slate-100 mb-1">
              4. Visual Architecture Flow: {lesson.architectureExample.title}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {lesson.architectureExample.description}
            </p>

            {/* Structured Diagram Viewer */}
            {lesson.diagramData && (
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 relative mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Interactive Service Nodes
                  </span>
                  <a
                    href="#/lab"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500 hover:text-slate-950 transition-all"
                  >
                    <Terminal className="w-3.5 h-3.5" /> Customize in Architecture Lab
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {lesson.diagramData.nodes.map((n) => (
                    <div key={n.id} className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 shadow-lg shadow-cyan-950/20 text-center">
                      <div className="text-xs font-bold text-cyan-300">{n.label}</div>
                      {n.details && <div className="text-[10px] text-slate-400 mt-1">{n.details}</div>}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Network Interconnects</span>
                  {lesson.diagramData.flow.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[10px]">{f.from}</span>
                      <span className="text-cyan-400">───({f.label})──►</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[10px]">{f.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Steps */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Request Lifecycle</span>
              <div className="space-y-2">
                {lesson.architectureExample.flow.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-300 pt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Cloud Equivalents */}
      {activeTab === 'equivalents' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800">
            <h3 className="text-base font-bold text-slate-100 mb-2">
              11. Cloud Equivalents Matrix (AWS ↔ Azure ↔ GCP)
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Compare how this exact architecture capability translates across all three major clouds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/40">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">AWS Equivalent</span>
                <div className="text-sm font-bold text-slate-100 mt-2">{lesson.cloudEquivalents.aws}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/40">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Azure Equivalent</span>
                <div className="text-sm font-bold text-slate-100 mt-2">{lesson.cloudEquivalents.azure}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/40">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">GCP Equivalent</span>
                <div className="text-sm font-bold text-slate-100 mt-2">{lesson.cloudEquivalents.gcp}</div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-cyan-400">Architectural Note: </span>
              {lesson.cloudEquivalents.notes}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Hands-On Practice */}
      {activeTab === 'handson' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800">
            {/* Visual Differentiation: Browser Simulation vs Real Cloud Lab */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                🟢 Browser Simulation
              </span>
              <span className="text-xs text-slate-400">
                Zero cloud credentials required • Safe in-browser execution
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-1">{lesson.handsOn.title}</h3>
            <p className="text-xs text-slate-400 mb-4">{lesson.handsOn.scenario}</p>

            {/* Code / CLI Snippet */}
            {lesson.handsOn.terraformCode && (
              <div className="mb-4">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950 rounded-t-xl border border-slate-800 border-b-0 text-xs text-slate-400 font-mono">
                  <span>main.tf (Terraform)</span>
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <pre className="p-4 bg-slate-950 rounded-b-xl border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto custom-scrollbar">
                  {lesson.handsOn.terraformCode}
                </pre>
              </div>
            )}

            {lesson.handsOn.cliCommand && (
              <div className="mb-4">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950 rounded-t-xl border border-slate-800 border-b-0 text-xs text-slate-400 font-mono">
                  <span>Terminal Command (CLI)</span>
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <pre className="p-4 bg-slate-950 rounded-b-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto custom-scrollbar">
                  $ {lesson.handsOn.cliCommand}
                </pre>
              </div>
            )}

            {/* Run Button */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleRunSimulation}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" /> Run Simulation Sandbox
              </button>
            </div>

            {/* Output console */}
            {cliOutput && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-500/40 font-mono text-xs text-emerald-300 whitespace-pre-wrap">
                {cliOutput}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Scenario Challenge */}
      {activeTab === 'scenario' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              14. Real-World Architecture Scenario Challenge
            </span>
            <h3 className="text-lg font-bold text-slate-100 mt-1 mb-2">
              {lesson.scenarioChallenge.title}
            </h3>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 mb-6">
              <div className="font-semibold text-slate-200 mb-1">Problem:</div>
              <p className="mb-3 leading-relaxed">{lesson.scenarioChallenge.problem}</p>
              <div className="font-semibold text-slate-200 mb-1">Constraints:</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                {lesson.scenarioChallenge.constraints.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-6">
              {lesson.scenarioChallenge.options.map((option) => {
                const isSelected = selectedQuizOption === option.id;
                let optionStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700';

                if (quizSubmitted) {
                  if (option.isCorrect) {
                    optionStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-cyan-950/40 border-cyan-500/60 text-cyan-200';
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => handleQuizSelect(option.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${optionStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full border text-xs font-bold shrink-0 mt-0.5">
                        {option.id.toUpperCase()}
                      </span>
                      <div className="flex-1">
                        <div className="text-xs font-medium leading-relaxed">{option.text}</div>
                        {quizSubmitted && isSelected && (
                          <div className={`mt-2 pt-2 border-t text-[11px] ${option.isCorrect ? 'text-emerald-300 border-emerald-500/30' : 'text-rose-300 border-rose-500/30'}`}>
                            {option.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Button */}
            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={!selectedQuizOption}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
              >
                Submit Solution
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setQuizSubmitted(false); setSelectedQuizOption(null); }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
                >
                  Try Again
                </button>
                {onNextLesson && (
                  <button
                    onClick={onNextLesson}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                  >
                    Next Lesson <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Interview Defense */}
      {activeTab === 'interview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              15. Senior Cloud Architect Interview Questions & Model Defense
            </span>
            <div className="mt-4 space-y-4">
              {lesson.interviewQuestions.map((q, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px] shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100">{q.question}</h4>
                  </div>

                  <div className="text-xs text-slate-400 italic">
                    Why the interviewer asks this: {q.whyAsked}
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                    <div className="font-bold text-cyan-400 mb-1">Model Answer:</div>
                    <p className="leading-relaxed">{q.answer}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                    <div className="font-bold text-emerald-400 mb-1">Architectural Defense:</div>
                    <p className="leading-relaxed">{q.architecturalDefense}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
