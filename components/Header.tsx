import React from 'react';
import { Bike } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-navy text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-orange p-2 rounded-lg shadow-sm">
            <Bike size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none">Safer Court Street</h1>
            <p className="text-xs text-blue-200 font-semibold tracking-widest uppercase mt-0.5">Boycott & Awareness</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://www.google.com/maps/d/u/0/viewer?ll=40.681043108731906%2C-73.99203354177824&z=16&mid=1T81uohEGzKzNIp2wevV3nwErTv56jAY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition font-semibold"
          >
            <span>View Source Map</span>
          </a>
        </div>
      </div>
    </header>
  );
};