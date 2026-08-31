import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gcpLessons } from '../data/gcp';
import { LessonViewer } from '../components/lessons/LessonViewer';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { isLessonComplete } from '../lib/progressStore';

export const GcpTrackPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // Find active lesson from slug or fallback to first
  const selectedLesson = useMemo(() => {
    if (slug) {
      const match = gcpLessons.find(
        l => l.slug.toLowerCase() === slug.toLowerCase() ||
             l.id.toLowerCase() === slug.toLowerCase() ||
             l.id.toLowerCase().includes(slug.toLowerCase())
      );
      if (match) return match;
    }
    return gcpLessons[0];
  }, [slug]);

  const handleSelectLesson = (lessonSlug: string) => {
    navigate(`/gcp/${lessonSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextLesson = () => {
    const currentIndex = gcpLessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < gcpLessons.length - 1) {
      handleSelectLesson(gcpLessons[currentIndex + 1].slug);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-sky-500/30 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">GCP Learning Track</span>
            <h1 className="text-xl font-extrabold text-slate-100">Google Cloud Platform Architect Path</h1>
            <p className="text-xs text-slate-400 mt-0.5">Global VPCs, GKE Autopilot, Cloud Run, and Anycast Load Balancing</p>
          </div>
        </div>

        {/* Fast Module Selector Dropdown */}
        <select
          value={selectedLesson.slug}
          onChange={(e) => handleSelectLesson(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-sky-400 focus:outline-none focus:border-sky-400 max-w-xs"
        >
          {gcpLessons.map((l, idx) => (
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
              GCP Track Modules ({gcpLessons.length})
            </span>
            <div className="space-y-1.5 max-h-[650px] overflow-y-auto custom-scrollbar pr-1">
              {gcpLessons.map((lesson, idx) => {
                const isActive = selectedLesson.id === lesson.id;
                const isDone = isLessonComplete(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson.slug)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between gap-2 ${
                      isActive
                        ? 'bg-sky-950/60 border border-sky-500/50 text-sky-300 font-bold shadow-sm'
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
