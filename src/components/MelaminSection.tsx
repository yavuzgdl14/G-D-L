/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MelaminStok } from '../types';
import { Minus, Plus, Search } from 'lucide-react';

interface MelaminSectionProps {
  stok: MelaminStok;
  onUpdate: (model: string, type: string, delta: number) => void;
}

export default function MelaminSection({ stok, onUpdate }: MelaminSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const models = ["Çift Göbek", "Tek Göbek", "Melamin Madra", "Matrix"];
  const subTypes = ["Kapalı", "Camlı", "WC"];

  const filteredModels = models.filter(m => 
    m.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Search Bar */}
      <div className="px-4 pt-4 pb-2">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Model ara (örn. Çift Göbek, Matrix...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all font-sans"
          />
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto px-4 pb-12 space-y-5">
        {filteredModels.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-sm">
            Eşleşen model bulunamadı.
          </div>
        ) : (
          filteredModels.map((model) => (
            <div key={model} className="bg-zinc-950/60 border border-zinc-900/60 rounded-2xl p-4 shadow-lg">
              {/* Card Title */}
              <div className="border-b border-zinc-900/80 pb-3 mb-4 flex justify-between items-center">
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                  {model}
                </h3>
                <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded-full uppercase border border-zinc-800">
                  Melamin Kapı
                </span>
              </div>

              {/* Sub categories */}
              <div className="space-y-3.5">
                {subTypes.map((type) => {
                  const currentStock = stok[model]?.[type] || 0;
                  
                  return (
                    <div 
                      key={type} 
                      className="flex items-center justify-between bg-zinc-900/30 p-3 rounded-xl border border-zinc-900/40"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-300 font-sans tracking-wide uppercase">
                          {type}
                        </span>
                      </div>
                      
                      {/* Stock Adjuster Control */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdate(model, type, -1)}
                          disabled={currentStock <= 0}
                          className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all border ${
                            currentStock <= 0 
                              ? 'bg-zinc-900/20 text-zinc-700 border-zinc-900/50 cursor-not-allowed' 
                              : 'bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-800 active:scale-95 text-red-400 border-zinc-800 shadow-md'
                          }`}
                          aria-label="Azalt"
                        >
                          <Minus className="w-4 h-4 stroke-[3]" />
                        </button>

                        <div className="min-w-[40px] text-center">
                          <span className="font-mono font-bold text-lg text-white block">
                            {currentStock}
                          </span>
                        </div>

                        <button
                          onClick={() => onUpdate(model, type, 1)}
                          className="w-11 h-11 flex items-center justify-center rounded-xl bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-800 active:scale-95 text-emerald-400 border border-zinc-800 shadow-md transition-all"
                          aria-label="Artır"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
