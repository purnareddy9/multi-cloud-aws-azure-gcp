import React from 'react';
import { ArchitectureCanvas } from '../components/canvas/ArchitectureCanvas';

export const ArchitectureLabPage: React.FC = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)]">
      <ArchitectureCanvas />
    </div>
  );
};
