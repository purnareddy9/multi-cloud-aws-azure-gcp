import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { azureLessons } from '../data/azure';
import { LessonViewer } from '../components/lessons/LessonViewer';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { isLessonComplete } from '../lib/progressStore';

export const AzureTrackPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // Find active lesson from slug or fallback to first
  const selectedLesson = useMemo(() => {
    if (slug) {
      const match = azureLessons.find(
        l => l.slug.toLowerCase() === slug.toLowerCase() ||
             l.id.toLowerCase() === slug.toLowerCase() ||
             l.id.toLowerCase().includes(slug.toLowerCase())
      );
      if (match) return match;
    }
    return azureLessons[0];
  }, [slug]);

  const handleSelectLesson = (lessonSlug: string) => {
    navigate(`/azure/${lessonSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextLesson = () => {
    const currentIndex = azureLessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < azureLessons.length - 1) {
      handleSelectLesson(azureLessons[currentIndex + 1].slug);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-blue-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">Azure Learning Track</span>
            <h1 className="text-xl font-extrabold text-slate-100">Microsoft Azure Architect Path</h1>
            <p className="text-xs text-slate-400 mt-0.5">Enterprise Cloud Architecture with Entra ID, VNets, and AKS</p>
          </div>
        </div>

        {/* Fast Module Selector Dropdown */}
        <select
          value={selectedLesson.slug}
          onChange={(e) => handleSelectLesson(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-blue-400 focus:outline-none focus:border-blue-400 max-w-xs"
        >
          {azureLessons.map((l, idx) => (
            <option key={l.id} value={l.slug}>
              {idx + 1}. {l.title} {isLessonComplete(l.id) ? '✓' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content Layout with Module Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Module Navigation */}
        <div className="space-y-2 order-2 lg:order-1">
          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Azure Track Modules ({azureLessons.length})
            </span>
            <div className="space-y-1.5 max-h-[650px] overflow-y-auto custom-scrollbar pr-1">
              {azureLessons.map((lesson, idx) => {
                const isActive = selectedLesson.id === lesson.id;
                const isDone = isLessonComplete(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.slug)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between gap-2 ${
                      isActive
                        ? 'bg-blue-950/60 border border-blue-500/50 text-blue-300 font-bold shadow-sm'
                        : 'hover:bg-slate-800/60 text-slate-300 border border-transparent'
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-[10px] text-slate-500 font-mono">Module 0{idx + 1}</div>
                      <div className="truncate mt-0.5">{lesson.title}</div>
                    </div>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center/Right 16-Point Lesson Viewer */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <LessonViewer lesson={selectedLesson} onNextLesson={handleNextLesson} />
        </div>
      </div>
    </div>
  );
};
