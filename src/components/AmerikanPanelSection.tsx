/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AmerikanPanelStok } from '../types';
import { Minus, Plus, Search, HelpCircle } from 'lucide-react';

interface AmerikanPanelSectionProps {
  stok: AmerikanPanelStok;
  onUpdate: (model: string, type: string, direction: 'Sağ' | 'Sol', delta: number) => void;
}

export default function AmerikanPanelSection({ stok, onUpdate }: AmerikanPanelSectionProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const models = ["Madra", "Merdiven", "Yumurta", "D Model", "Kum Saati"];
  const subTypes = ["Kapalı", "Camlı", "WC"];
  const directions: ('Sağ' | 'Sol')[] = ["Sağ", "Sol"];

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
            placeholder="Model ara (örn. Madra, Merdiven...)"
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
                  Panel Kapı
                </span>
              </div>

              {/* Sub categories */}
              <div className="space-y-4">
                {subTypes.map((type) => {
                  const typeStok = stok[model]?.[type] || { Sağ: 0, Sol: 0 };
                  
                  return (
                    <div key={type} className="bg-zinc-900/30 p-3.5 rounded-xl border border-zinc-900/40">
                      {/* Subtype Name */}
                      <span className="inline-block text-xs font-semibold text-zinc-300 font-sans tracking-wide uppercase mb-3">
                        {type}
                      </span>

                      {/* Direction Adjusters */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                        {directions.map((dir) => {
                          const currentStock = typeStok[dir] || 0;
                          return (
                            <div 
                              key={dir} 
                              className="flex items-center justify-between bg-zinc-950/50 p-2.5 rounded-xl border border-zinc-900/80"
                            >
                              <span className="text-sm font-semibold text-zinc-400 pl-1 font-sans">
                                {dir}
                              </span>
                              
                              {/* Stock Adjuster Control */}
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => onUpdate(model, type, dir, -1)}
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
                                  onClick={() => onUpdate(model, type, dir, 1)}
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
