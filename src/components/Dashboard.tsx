/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppState, CategoryKey } from '../types';
import { 
  FolderLock, 
  DoorClosed, 
  LayoutGrid, 
  Layers, 
  Box, 
  TrendingUp, 
  ChevronRight,
  Database
} from 'lucide-react';
import { 
  calculateAmerikanPanelTotal, 
  calculateMelaminTotal, 
  calculatePvcTotal, 
  calculateCelikTotal, 
  calculateKasalarTotal,
  getStockSummary
} from '../utils';

interface DashboardProps {
  state: AppState;
  onSelectCategory: (category: CategoryKey) => void;
}

export default function Dashboard({ state, onSelectCategory }: DashboardProps) {
  const summary = getStockSummary(state);

  const categories = [
    {
      key: 'amerikanPanel' as CategoryKey,
      title: 'Amerikan Panel Kapılar',
      stockCount: summary.amerikanPanel,
      icon: DoorClosed,
      description: 'Madra, Merdiven, Yumurta, D Model, Kum Saati',
      color: 'from-zinc-900 to-zinc-950 border-zinc-800'
    },
    {
      key: 'melamin' as CategoryKey,
      title: 'Melamin Kapılar',
      stockCount: summary.melamin,
      icon: Layers,
      description: 'Çift/Tek Göbek, Melamin Madra, Matrix',
      color: 'from-zinc-900 to-zinc-950 border-zinc-800'
    },
    {
      key: 'pvc' as CategoryKey,
      title: 'PVC Kapılar',
      stockCount: summary.pvc,
      icon: LayoutGrid,
      description: 'Model 407 (Kapalı, Camlı, WC)',
      color: 'from-zinc-900 to-zinc-950 border-zinc-800'
    },
    {
      key: 'celik' as CategoryKey,
      title: 'Çelik Kapılar',
      stockCount: summary.celik,
      icon: FolderLock,
      description: 'Yeni Model, Uzun Kol, TOKİ ve 8 diğer model',
      color: 'from-zinc-900 to-zinc-950 border-zinc-800'
    },
    {
      key: 'kasalar' as CategoryKey,
      title: 'Kasalar',
      stockCount: summary.kasalar,
      icon: Box,
      description: 'Amerikan Panel, Melamin, PVC Kasaları',
      color: 'from-zinc-900 to-zinc-950 border-zinc-800'
    },
    {
      key: 'stokOzeti' as CategoryKey,
      title: 'Stok Özeti',
      stockCount: summary.genelToplam,
      icon: TrendingUp,
      description: 'Tüm kategorilerin toplamı ve veri yönetimi',
      color: 'from-zinc-900 to-zinc-950 border-zinc-800',
      isSummary: true
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {/* Welcome & Info Card */}
      <div className="relative overflow-hidden rounded-2xl bg-zinc-950/60 border border-zinc-900 p-6 flex items-center justify-between gap-4">
        <h1 className="font-display font-bold text-2xl text-white tracking-tight">
          GÜDÜL TİCARET
        </h1>
        <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden shadow-xl border border-zinc-800/80 bg-zinc-900/40 p-1.5 flex items-center justify-center">
          <img 
            src="/icon.svg" 
            alt="Güdül Stok Logo" 
            className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Main Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => {
          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`group relative text-left p-5 rounded-2xl bg-gradient-to-br ${cat.color} border flex items-start justify-between gap-4 transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-md`}
              style={{ minHeight: '120px' }}
            >
              <div className="flex-1 flex flex-col justify-between h-full">
                <div className="flex flex-col mb-3">
                  <h3 className="font-display font-semibold text-base text-zinc-100 group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-zinc-500 text-xs mt-0.5 line-clamp-1">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1.5 mt-auto">
                  <span className="font-display font-bold text-3xl tracking-tight text-white">
                    {cat.stockCount}
                  </span>
                  <span className="text-xs text-zinc-500 font-sans">adet stok</span>
                </div>
              </div>

              <div className="self-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-zinc-300 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>

              {/* Decorative indicator for Summary */}
              {cat.isSummary && (
                <div className="absolute top-3 right-3 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="text-center pt-2">
        <p className="text-zinc-600 text-xs font-mono">
          GÜDÜL TİCARET • TÜM HAKLARI SAKLIDIR © 2026
        </p>
      </div>
    </div>
  );
}
