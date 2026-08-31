import React, { useState } from 'react';
import { azureLessons } from '../data/azure';
import { LessonViewer } from '../components/lessons/LessonViewer';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { isLessonComplete } from '../lib/progressStore';

export const AzureTrackPage: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState(azureLessons[0]);

  const handleNextLesson = () => {
    const currentIndex = azureLessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < azureLessons.length - 1) {
      setSelectedLesson(azureLessons[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Track Selector Ribbon */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-blue-500/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100">Microsoft Azure Architect Track</h1>
            <p className="text-xs text-slate-400">Enterprise Cloud Architecture with Entra ID, VNets, and AKS</p>
          </div>
        </div>

        {/* Module Selector Pill Dropdown */}
        <select
          value={selectedLesson.id}
          onChange={(e) => {
            const found = azureLessons.find(l => l.id === e.target.value);
            if (found) setSelectedLesson(found);
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-blue-400 focus:outline-none focus:border-blue-400"
        >
          {azureLessons.map((l, idx) => (
            <option key={l.id} value={l.id}>
              {idx + 1}. {l.title} {isLessonComplete(l.id) ? '✓' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Render 16-point Lesson */}
      <LessonViewer lesson={selectedLesson} onNextLesson={handleNextLesson} />
    </div>
  );
};
