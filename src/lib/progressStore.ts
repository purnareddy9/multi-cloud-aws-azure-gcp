import { UserProgress } from '../types';

const STORAGE_KEY = 'cloud_architecture_academy_progress_v1';

const defaultProgress: UserProgress = {
  completedLessons: [],
  quizScores: {},
  savedArchitectures: [],
  interviewAttempts: [],
  lastActive: new Date().toISOString()
};

export const getStoredProgress = (): UserProgress => {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load user progress', e);
    return defaultProgress;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    progress.lastActive = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event('progress_updated'));
  } catch (e) {
    console.error('Failed to save user progress', e);
  }
};

export const markLessonComplete = (lessonId: string, score: number = 100): void => {
  const current = getStoredProgress();
  if (!current.completedLessons.includes(lessonId)) {
    current.completedLessons.push(lessonId);
  }
  current.quizScores[lessonId] = score;
  saveProgress(current);
};

export const isLessonComplete = (lessonId: string): boolean => {
  const current = getStoredProgress();
  return current.completedLessons.includes(lessonId);
};

export const saveArchitectureToStorage = (name: string, nodes: unknown[], edges: unknown[], score?: number): string => {
  const current = getStoredProgress();
  const id = 'arch_' + Date.now();
  current.savedArchitectures.unshift({
    id,
    name,
    createdAt: new Date().toISOString(),
    nodes,
    edges,
    score
  });
  saveProgress(current);
  return id;
};

export const getSavedArchitectures = () => {
  return getStoredProgress().savedArchitectures || [];
};

export const deleteSavedArchitecture = (id: string) => {
  const current = getStoredProgress();
  current.savedArchitectures = current.savedArchitectures.filter(a => a.id !== id);
  saveProgress(current);
};
