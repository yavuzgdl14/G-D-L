/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { KasaStok } from '../types';
import { Minus, Plus, Box } from 'lucide-react';

interface KasalarSectionProps {
  stok: KasaStok;
  onUpdate: (type: 'amerikanPanel' | 'melamin' | 'pvc', size: string, subType: string, delta: number) => void;
}

export default function KasalarSection({ stok, onUpdate }: KasalarSectionProps) {
  const [activeTab, setActiveTab] = React.useState<'amerikanPanel' | 'melamin' | 'pvc'>('amerikanPanel');

  const tabs = [
    { key: 'amerikanPanel' as const, label: 'Amerikan Panel' },
    { key: 'melamin' as const, label: 'Melamin' },
    { key: 'pvc' as const, label: 'PVC' }
  ];

  // Config per tab
  const tabConfig = {
    amerikanPanel: {
      sizes: ["10", "12", "14", "15", "17", "22", "24"],
      subTypes: ["70'lik", "80'lik"] as const
    },
    melamin: {
      sizes: ["10", "12", "14", "16", "22"],
      subTypes: ["70", "80"] as const
    },
    pvc: {
      sizes: ["12", "16", "22"],
      subTypes: ["70", "80"] as const
    }
  };

  const currentConfig = tabConfig[activeTab];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Tab Selectors */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex bg-zinc-950/80 border border-zinc-900 rounded-xl p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 px-2 rounded-lg text-xs font-semibold font-sans tracking-wide uppercase transition-all duration-150 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/55'
                  : 'text-zinc-500 hover:text-zinc-350'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto px-4 pb-12 space-y-4">
        {currentConfig.sizes.map((size) => {
          const sizeStok = stok[activeTab]?.[size] || {};

          return (
            <div key={size} className="bg-zinc-950/60 border border-zinc-900/60 rounded-2xl p-4 shadow-lg">
              {/* Card Title */}
              <div className="border-b border-zinc-900/80 pb-2.5 mb-3.5 flex justify-between items-center">
                <span className="font-display font-bold text-base text-zinc-300">
                  ÖLÇÜ: {size}
                </span>
                <span className="text-[10px] font-mono bg-zinc-900 text-zinc-500 px-2.5 py-1 rounded-full border border-zinc-800 uppercase">
                  {activeTab === 'amerikanPanel' ? 'Amerikan' : activeTab.toUpperCase()} KASA
                </span>
              </div>

              {/* Grid of subtypes (70'lik vs 80'lik, etc) */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                {currentConfig.subTypes.map((subType) => {
                  const currentStock = sizeStok[subType] || 0;

                  return (
                    <div 
                      key={subType} 
                      className="flex items-center justify-between bg-zinc-900/30 p-2.5 rounded-xl border border-zinc-900/40"
                    >
                      <span className="text-sm font-bold text-zinc-400 font-sans pl-1 uppercase">
                        {subType}
                      </span>

                      {/* Adjuster */}
                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => onUpdate(activeTab, size, subType, -1)}
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

                        <div className="min-w-[36px] text-center">
                          <span className="font-mono font-bold text-base text-white">
                            {currentStock}
                          </span>
                        </div>

                        <button
                          onClick={() => onUpdate(activeTab, size, subType, 1)}
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
  );
}
