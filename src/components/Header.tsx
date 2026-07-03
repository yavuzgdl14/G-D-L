/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronLeft, Database, Home } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showHome?: boolean;
  onHome?: () => void;
}

export default function Header({ title, subtitle, onBack, showHome, onHome }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-[#0e1013]/95 backdrop-blur-md border-b border-zinc-900/80 z-40 px-4 py-4.5 flex items-center justify-between transition-all duration-200">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-900/60 hover:bg-zinc-800 active:bg-zinc-700 active:scale-95 border border-zinc-800/50 transition-all text-zinc-300"
            aria-label="Geri"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div className="flex flex-col">
          <h2 className="font-display font-bold text-lg tracking-wide text-white leading-tight uppercase">
            {title}
          </h2>
          {subtitle && (
            <span className="text-[11px] text-zinc-500 font-mono tracking-wider uppercase">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Handwritten Custom Sign-off */}
        <div className="flex flex-col items-end text-right select-none leading-none pr-1 select-none">
          <span className="font-handwritten text-lg font-bold text-amber-400/90 tracking-wide">
            Şaban ve Yavuz
          </span>
          <span className="font-handwritten text-xs font-bold text-zinc-400 tracking-widest uppercase mt-0.5">
            GÜDÜL
          </span>
        </div>

        {showHome && onHome && (
          <button
            onClick={onHome}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-900/60 hover:bg-zinc-800 active:bg-zinc-700 active:scale-95 border border-zinc-800/50 transition-all text-zinc-300"
            aria-label="Ana Sayfa"
          >
            <Home className="w-5 h-5" />
          </button>
        )}
        <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-900 text-[10px] font-mono text-emerald-500 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>ÇEVRİMDIŞI</span>
        </div>
      </div>
    </header>
  );
}
