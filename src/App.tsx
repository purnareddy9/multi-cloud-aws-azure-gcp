import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Pages
import { HomeDashboard } from './pages/HomeDashboard';
import { FundamentalsPage } from './pages/FundamentalsPage';
import { AwsTrackPage } from './pages/AwsTrackPage';
import { AzureTrackPage } from './pages/AzureTrackPage';
import { GcpTrackPage } from './pages/GcpTrackPage';
import { ComparePage } from './pages/ComparePage';
import { DecisionEnginePage } from './pages/DecisionEnginePage';
import { ArchitectureLabPage } from './pages/ArchitectureLabPage';
import { ScenariosPage } from './pages/ScenariosPage';
import { InterviewPrepPage } from './pages/InterviewPrepPage';
import { TransitionPage } from './pages/TransitionPage';
import { NetworkingPage } from './pages/NetworkingPage';
import { SecurityPage } from './pages/SecurityPage';
import { HaPage } from './pages/HaPage';
import { DrPage } from './pages/DrPage';
import { MultiCloudPage } from './pages/MultiCloudPage';

export const App: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
        {/* Global Navbar */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        />

        {/* Main Body Layout with Sidebar */}
        <div className="flex-1 flex w-full">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <main className="flex-1 min-w-0 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomeDashboard />} />
              <Route path="/fundamentals" element={<FundamentalsPage />} />
              <Route path="/aws" element={<AwsTrackPage />} />
              <Route path="/azure" element={<AzureTrackPage />} />
              <Route path="/gcp" element={<GcpTrackPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/decision-engine" element={<DecisionEnginePage />} />
              <Route path="/lab" element={<ArchitectureLabPage />} />
              <Route path="/scenarios" element={<ScenariosPage />} />
              <Route path="/interviews" element={<InterviewPrepPage />} />
              <Route path="/transition" element={<TransitionPage />} />
              <Route path="/networking" element={<NetworkingPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/ha" element={<HaPage />} />
              <Route path="/dr" element={<DrPage />} />
              <Route path="/ha-dr" element={<HaPage />} />
              <Route path="/multicloud" element={<MultiCloudPage />} />
              <Route path="*" element={<HomeDashboard />} />
            </Routes>
          </main>
        </div>

        {/* Global Cmd+K Search Modal */}
        <GlobalSearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </div>
    </HashRouter>
  );
};

export default App;
