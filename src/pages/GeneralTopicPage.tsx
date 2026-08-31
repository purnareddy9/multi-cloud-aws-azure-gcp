import React from 'react';
import { Network, Shield, RefreshCw, Layers, CheckCircle2, ArrowRight, AlertTriangle, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GeneralTopicProps {
  levelNumber: number;
  title: string;
  subtitle: string;
  category: string;
  iconType: 'network' | 'security' | 'hadr' | 'multicloud';
  diagramAscii: string;
  sections: {
    heading: string;
    explanation: string;
    points: string[];
    comparisonRow?: { aws: string; azure: string; gcp: string };
  }[];
  interviewQuestion: {
    question: string;
    answer: string;
  };
}

const cleanDiagram = (raw: string) => {
  if (!raw) return '';
  const lines = raw.split('\n');
  while (lines.length > 0 && lines[0].trim() === '') lines.shift();
  while (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();
  
  const minIndent = lines.reduce((min, line) => {
    if (line.trim() === '') return min;
    const match = line.match(/^(\s*)/);
    return match ? Math.min(min, match[1].length) : min;
  }, Infinity);

  if (minIndent === Infinity || minIndent === 0) return lines.join('\n');
  return lines.map(line => line.slice(minIndent)).join('\n');
};

export const GeneralTopicPage: React.FC<GeneralTopicProps> = ({
  levelNumber,
  title,
  subtitle,
  category,
  iconType,
  diagramAscii,
  sections,
  interviewQuestion
}) => {
  const getIcon = () => {
    switch (iconType) {
      case 'network': return <Network className="w-5 h-5 text-cyan-400" />;
      case 'security': return <Shield className="w-5 h-5 text-cyan-400" />;
      case 'hadr': return <RefreshCw className="w-5 h-5 text-cyan-400" />;
      default: return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-2">
          {getIcon()} LEVEL {levelNumber}: {category}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-100">{title}</h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">{subtitle}</p>
      </div>

      {/* Visual Model ASCII Box */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Architecture Topology Model</span>
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] sm:text-xs text-cyan-300 overflow-x-auto custom-scrollbar whitespace-pre leading-relaxed">
          {cleanDiagram(diagramAscii)}
        </pre>
      </div>

      {/* Detailed Concept Sections */}
      <div className="space-y-6">
        {sections.map((sec, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-slate-100">{sec.heading}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{sec.explanation}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 list-disc pl-4">
              {sec.points.map((p, pIdx) => (
                <li key={pIdx}>{p}</li>
              ))}
            </ul>

            {/* Cloud Provider Tri-Mapping */}
            {sec.comparisonRow && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/30">
                  <span className="font-bold text-amber-400 block mb-1">AWS:</span>
                  <span className="text-slate-300">{sec.comparisonRow.aws}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-blue-500/30">
                  <span className="font-bold text-blue-400 block mb-1">Azure:</span>
                  <span className="text-slate-300">{sec.comparisonRow.azure}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-sky-500/30">
                  <span className="font-bold text-sky-400 block mb-1">GCP:</span>
                  <span className="text-slate-300">{sec.comparisonRow.gcp}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interview Question */}
      <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4" /> Senior Architecture Interview Question
        </span>
        <h3 className="text-sm font-bold text-slate-100">{interviewQuestion.question}</h3>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-cyan-400 mb-1 block">Model Architectural Answer:</span>
          {interviewQuestion.answer}
        </div>
      </div>
    </div>
  );
};
