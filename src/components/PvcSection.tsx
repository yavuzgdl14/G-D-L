/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PvcStok } from '../types';
import { Minus, Plus } from 'lucide-react';

interface PvcSectionProps {
  stok: PvcStok;
  onUpdate: (model: string, type: string, delta: number) => void;
}

export default function PvcSection({ stok, onUpdate }: PvcSectionProps) {
  // Only 1 model: "407"
  const model = "407";
  const subTypes = ["Kapalı", "Camlı", "WC"];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Main List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-12 space-y-5">
        <div className="bg-zinc-950/60 border border-zinc-900/60 rounded-2xl p-5 shadow-lg">
          {/* Card Title */}
          <div className="border-b border-zinc-900/80 pb-3 mb-4 flex justify-between items-center">
            <h3 className="font-display font-bold text-xl text-white tracking-wider">
              MODEL {model}
            </h3>
            <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded-full uppercase border border-zinc-800">
              PVC Kapı
            </span>
          </div>

          <p className="text-zinc-500 text-xs font-sans mb-5">
            Model 407 PVC Kapı stok durumu.
          </p>

          {/* Sub categories */}
          <div className="space-y-4">
            {subTypes.map((type) => {
              const currentStock = stok[model]?.[type] || 0;
              
              return (
                <div 
                  key={type} 
                  className="flex items-center justify-between bg-zinc-900/30 p-4 rounded-xl border border-zinc-900/40"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-200 font-sans tracking-wide uppercase">
                      {type}
                    </span>
                  </div>
                  
                  {/* Stock Adjuster Control */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdate(model, type, -1)}
                      disabled={currentStock <= 0}
                      className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all border ${
                        currentStock <= 0 
                          ? 'bg-zinc-900/20 text-zinc-700 border-zinc-900/50 cursor-not-allowed' 
                          : 'bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-800 active:scale-95 text-red-400 border-zinc-800 shadow-md'
                      }`}
                      aria-label="Azalt"
                    >
                      <Minus className="w-5 h-5 stroke-[3]" />
                    </button>

                    <div className="min-w-[45px] text-center">
                      <span className="font-mono font-extrabold text-xl text-white block">
                        {currentStock}
                      </span>
                    </div>

                    <button
                      onClick={() => onUpdate(model, type, 1)}
                      className="w-12 h-12 flex items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-800 active:scale-95 text-emerald-400 border border-zinc-800 shadow-md transition-all"
                      aria-label="Artır"
                    >
                      <Plus className="w-5 h-5 stroke-[3]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
