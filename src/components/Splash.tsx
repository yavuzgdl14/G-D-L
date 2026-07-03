/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      id="splash-screen"
      className="fixed inset-0 bg-[#0b0c0e] flex flex-col items-center justify-between py-16 px-6 text-white z-50 select-none cursor-pointer"
      onClick={onComplete}
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Modern Minimalistic Icon / Logo using the official launcher SVG */}
        <div className="w-32 h-32 mb-8 shadow-2xl relative select-none">
          <img 
            src="/icon.svg" 
            alt="Güdül Stok" 
            className="w-full h-full object-contain filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] animate-fade-in"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <h1 className="font-display font-bold text-4xl tracking-widest text-white mb-3 uppercase">
          GÜDÜL STOK
        </h1>
        
        <div className="h-[2px] w-16 bg-zinc-600 rounded-full mb-4"></div>
        
        <p className="text-zinc-400 font-sans tracking-wide text-sm font-medium">
          Profesyonel Stok Takip Sistemi
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono">
          <Shield className="w-3.5 h-3.5 text-zinc-600" />
          <span>YEREL GÜVENLİ VERİ DEPOSU</span>
        </div>
        <span className="text-[10px] text-zinc-600 font-mono tracking-wider">v2.0.0 • ÇEVRİMDIŞI</span>
      </div>
    </div>
  );
}
