import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredProgress } from '../lib/progressStore';
import { awsLessons } from '../data/aws';
import { azureLessons } from '../data/azure';
import { gcpLessons } from '../data/gcp';
import { 
  Cloud, ArrowRight, ShieldCheck, Sparkles, Terminal, 
  Layers, Shuffle, Compass, Award, CheckCircle2, 
  Flame, Globe, Zap, Cpu, BarChart3, Search
} from 'lucide-react';

export const HomeDashboard: React.FC = () => {
  const [progress, setProgress] = useState(getStoredProgress());

  useEffect(() => {
    const update = () => setProgress(getStoredProgress());
    window.addEventListener('progress_updated', update);
    return () => window.removeEventListener('progress_updated', update);
  }, []);

  // Calculate percentages
  const awsCompleted = awsLessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const awsPct = Math.round((awsCompleted / Math.max(1, awsLessons.length)) * 100);

  const azureCompleted = azureLessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const azurePct = Math.round((azureCompleted / Math.max(1, azureLessons.length)) * 100);

  const gcpCompleted = gcpLessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const gcpPct = Math.round((gcpCompleted / Math.max(1, gcpLessons.length)) * 100);

  const overallCompleted = progress.completedLessons.length;
  const totalLessons = awsLessons.length + azureLessons.length + gcpLessons.length;
  const overallPct = Math.round((overallCompleted / totalLessons) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Interactive Senior Cloud Architecture Academy
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Master Cloud Architecture across <span className="text-amber-400">AWS</span>, <span className="text-blue-400">Azure</span> & <span className="text-sky-400">GCP</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Understand cloud services deeply. Design resilient, highly available architectures. Confidently evaluate trade-offs, choose the right cloud for every requirement, and defend your designs in senior architect interviews.
          </p>

          {/* Primary Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/aws"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              Learn AWS <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/azure"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              Learn Azure <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/gcp"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
            >
              Learn GCP <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs transition-colors"
            >
              <Search className="w-4 h-4 text-cyan-400" /> Explore Services
            </Link>
            <Link
              to="/compare"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-colors"
            >
              <Shuffle className="w-4 h-4" /> Compare Clouds
            </Link>
            <Link
              to="/lab"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs transition-colors"
            >
              <Terminal className="w-4 h-4" /> Architecture Lab
            </Link>
            <Link
              to="/interviews"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold text-xs transition-colors"
            >
              <Award className="w-4 h-4 text-amber-400" /> Interview Mode
            </Link>
          </div>
        </div>
      </section>

      {/* Progress & Knowledge Tracker */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100">Your Cloud Mastery Progress</h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">{overallCompleted} Lessons Mastered</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* AWS Progress Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-400">
              <span>AWS Path</span>
              <span>{awsPct}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${awsPct}%` }} />
            </div>
            <p className="text-[11px] text-slate-400">{awsCompleted} / {awsLessons.length} Modules</p>
          </div>

          {/* Azure Progress Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Azure Path</span>
              <span>{azurePct}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${azurePct}%` }} />
            </div>
            <p className="text-[11px] text-slate-400">{azureCompleted} / {azureLessons.length} Modules</p>
          </div>

          {/* GCP Progress Card */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-sky-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-sky-400">
              <span>GCP Path</span>
              <span>{gcpPct}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-sky-400 transition-all duration-500" style={{ width: `${gcpPct}%` }} />
            </div>
            <p className="text-[11px] text-slate-400">{gcpCompleted} / {gcpLessons.length} Modules</p>
          </div>
        </div>
      </section>

      {/* 3 Independent Cloud Track Cards */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-100">Choose Your Cloud Learning Track</h2>
          <p className="text-xs text-slate-400 mt-1">Each path is 100% self-contained from beginner fundamentals to production architecture.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AWS Card */}
          <Link
            to="/aws"
            className="group relative p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/10 transition-all space-y-4"
          >
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit border border-amber-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Amazon Web Services</div>
              <h3 className="text-xl font-extrabold text-slate-100 group-hover:text-amber-300 transition-colors mt-0.5">
                AWS Architect Track
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                VPC networking, IAM zero-trust, EC2, EKS, Serverless Lambda, Aurora databases, and high-availability design.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-bold text-amber-400">
              <span>Beginner → Senior Architect</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Azure Card */}
          <Link
            to="/azure"
            className="group relative p-6 rounded-2xl bg-slate-900/90 border border-blue-500/30 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition-all space-y-4"
          >
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 w-fit border border-blue-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400">Microsoft Azure</div>
              <h3 className="text-xl font-extrabold text-slate-100 group-hover:text-blue-300 transition-colors mt-0.5">
                Azure Architect Track
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                VNets, Entra ID, Managed Identities, AKS, Azure SQL MI, Cosmos DB, Hub-and-Spoke topologies, and Key Vault.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-bold text-blue-400">
              <span>Beginner → Senior Architect</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* GCP Card */}
          <Link
            to="/gcp"
            className="group relative p-6 rounded-2xl bg-slate-900/90 border border-sky-500/30 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/10 transition-all space-y-4"
          >
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 w-fit border border-sky-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-400">Google Cloud Platform</div>
              <h3 className="text-xl font-extrabold text-slate-100 group-hover:text-sky-300 transition-colors mt-0.5">
                GCP Architect Track
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Global VPCs, GKE Autopilot, Cloud Run, Cloud Spanner, Global Anycast Load Balancing, and Shared VPC.
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-bold text-sky-400">
              <span>Beginner → Senior Architect</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Interactive Feature Suites */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/lab"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3"
        >
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Interactive Architecture Designer</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Drag-and-drop React Flow canvas with automated SPOF detection and Well-Architected pillar scores.
          </p>
        </Link>

        <Link
          to="/decision-engine"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Cloud Decision Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Which cloud should I choose? Input your technical and business constraints to calculate the optimal cloud fit.
          </p>
        </Link>

        <Link
          to="/scenarios"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Real-World Scenarios</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Step-by-step challenges from simple 3-tier corporate web apps to enterprise tri-cloud global platforms.
          </p>
        </Link>

        <Link
          to="/interviews"
          className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3"
        >
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-100">Architecture Interview Simulator</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Practice scenario defense, trade-off explanations, and system design interviews with 50+ question bank.
          </p>
        </Link>
      </section>
    </div>
  );
};
