 
// components/HeroSection.tsx
import React from 'react';
import { Button } from './ui/Button';

interface HeroSectionProps {
  onOpenModal: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  return (
    <article className="dashboard-hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-badge"></p>
          <h1 className="hero-title"></h1>
          <p className="hero-description">
            Monitor performance, manage tenant companies, and launch new accounts from a single aligned dashboard.
          </p>
        </div>
        
        <div className="status-badge">
          <span className="status-dot"></span>
          All systems are running smoothly
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-gray-800 bg-black/20 p-6">
          <p className="text-sm text-gray-300">This week</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Main overview</h2>
          <p className="mt-3 text-gray-400">
            Keep an eye on active accounts, revenue growth, and trial company conversions from one workspace.
          </p>
        </div>
        
        <div className="rounded-2xl border border-gray-800 bg-black/20 p-6">
          <p className="text-sm text-gray-300">Quick action</p>
          <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-gray-800 bg-gray-950/70 p-4">
            <div>
              <h3 className="text-white font-semibold">Create a new company</h3>
              <p className="text-sm text-gray-400">Start onboarding in a few clicks.</p>
            </div>
            <Button onClick={onOpenModal}>+ New Company</Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default HeroSection;