/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppState } from '../types';
import { getStockSummary, StockSummary } from '../utils';
import { 
  TrendingUp, 
  DoorClosed, 
  Layers, 
  LayoutGrid, 
  FolderLock, 
  Box, 
  Download, 
  Upload, 
  RotateCcw,
  AlertTriangle,
  Check,
  X
} from 'lucide-react';

interface StokOzetiSectionProps {
  state: AppState;
  onReset: () => void;
  onImport: (newState: AppState) => void;
}

export default function StokOzetiSection({ state, onReset, onImport }: StokOzetiSectionProps) {
  const summary = getStockSummary(state);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Modal confirmations
  const [showResetModal, setShowResetModal] = React.useState(false);
  const [showImportSuccess, setShowImportSuccess] = React.useState(false);
  const [importError, setImportError] = React.useState<string | null>(null);

  const categoriesData = [
    {
      title: 'Amerikan Panel Kapılar',
      value: summary.amerikanPanel,
      icon: DoorClosed,
      color: 'bg-zinc-800 text-zinc-100',
      percentage: summary.genelToplam > 0 ? Math.round((summary.amerikanPanel / summary.genelToplam) * 100) : 0
    },
    {
      title: 'Melamin Kapılar',
      value: summary.melamin,
      icon: Layers,
      color: 'bg-zinc-800 text-zinc-100',
      percentage: summary.genelToplam > 0 ? Math.round((summary.melamin / summary.genelToplam) * 100) : 0
    },
    {
      title: 'PVC Kapılar',
      value: summary.pvc,
      icon: LayoutGrid,
      color: 'bg-zinc-800 text-zinc-100',
      percentage: summary.genelToplam > 0 ? Math.round((summary.pvc / summary.genelToplam) * 100) : 0
    },
    {
      title: 'Çelik Kapılar',
      value: summary.celik,
      icon: FolderLock,
      color: 'bg-zinc-800 text-zinc-100',
      percentage: summary.genelToplam > 0 ? Math.round((summary.celik / summary.genelToplam) * 100) : 0
    },
    {
      title: 'Kasalar',
      value: summary.kasalar,
      icon: Box,
      color: 'bg-zinc-800 text-zinc-100',
      percentage: summary.genelToplam > 0 ? Math.round((summary.kasalar / summary.genelToplam) * 100) : 0
    }
  ];

  // Backup data
  const handleExport = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
      const downloadAnchor = document.createElement('a');
      
      const dateStr = new Date().toISOString().split('T')[0];
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `Gudul_Ticaret_Stok_Yedek_${dateStr}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error(e);
    }
  };

  // Import / Restore data
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        
        // Basic schema verification
        if (json.amerikanPanel && json.melamin && json.pvc && json.celik && json.kasalar) {
          onImport(json);
          setShowImportSuccess(true);
          setImportError(null);
          setTimeout(() => setShowImportSuccess(false), 3000);
        } else {
          setImportError('Geçersiz dosya formatı. Lütfen doğru stok yedek dosyasını seçin.');
        }
      } catch (err) {
        setImportError('Dosya okunamadı. Geçerli bir JSON dosyası olduğundan emin olun.');
      }
    };
    reader.readAsText(file);
    
    // Reset input value so same file can be imported again if needed
    if (e.target) {
      e.target.value = '';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
      {/* Grand Total Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-[#121418] to-black border-2 border-zinc-800/60 p-6 shadow-xl flex items-center justify-between">
        <div className="space-y-1.5 z-10">
          <span className="text-zinc-500 font-mono text-[10px] tracking-widest font-bold uppercase block">
            GENEL DURUM ÖZETİ
          </span>
          <h2 className="font-display font-black text-3xl text-white tracking-tight uppercase">
            GENEL TOPLAM
          </h2>
          <p className="text-zinc-400 text-xs font-sans">
            Tüm ürün gruplarının toplam stok adeti.
          </p>
        </div>
        <div className="text-right z-10 flex flex-col items-end justify-center">
          <div className="font-display font-extrabold text-4xl text-emerald-400 tracking-tight flex items-baseline gap-1">
            {summary.genelToplam}
            <span className="text-xs text-zinc-500 font-medium">adet</span>
          </div>
        </div>
        {/* Background graphic glow */}
        <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-emerald-500/5 blur-3xl rounded-full"></div>
      </div>

      {/* Progress Section */}
      <div className="bg-zinc-950/60 border border-zinc-900/80 rounded-2xl p-5 shadow-lg space-y-4">
        <h3 className="font-display font-bold text-sm tracking-widest text-zinc-400 uppercase">
          KATEGORİ DAĞILIMI
        </h3>
        
        <div className="space-y-4">
          {categoriesData.map((cat, idx) => {
            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-200">{cat.title}</span>
                  </div>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-zinc-100 font-bold">{cat.value}</span>
                    <span className="text-[10px] text-zinc-500">({cat.percentage}%)</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-900">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Administration Zone */}
      <div className="bg-zinc-950/60 border border-zinc-900/80 rounded-2xl p-5 shadow-lg space-y-4">
        <h3 className="font-display font-bold text-sm tracking-widest text-zinc-400 uppercase">
          VERİ VE YEDEKLEME YÖNETİMİ
        </h3>

        <p className="text-zinc-500 text-xs font-sans leading-relaxed">
          Tüm stok bilgileri telefonunuzun yerel hafızasında saklanır. Telefonunuzu değiştireceğinizde veya yedek almak istediğinizde aşağıdaki butonları kullanabilirsiniz.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Backup / Export */}
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2.5 py-4.5 px-4 bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-800 active:scale-98 border border-zinc-800 rounded-xl font-semibold font-sans text-sm text-zinc-200 shadow-md transition-all cursor-pointer"
          >
            <Download className="w-4.5 h-4.5 text-zinc-400" />
            <span>Yedek Al (Dışa Aktar)</span>
          </button>

          {/* Restore / Import */}
          <button
            onClick={handleImportClick}
            className="flex items-center justify-center gap-2.5 py-4.5 px-4 bg-zinc-900 hover:bg-zinc-850 active:bg-zinc-800 active:scale-98 border border-zinc-800 rounded-xl font-semibold font-sans text-sm text-zinc-200 shadow-md transition-all cursor-pointer"
          >
            <Upload className="w-4.5 h-4.5 text-zinc-400" />
            <span>Yedeği Yükle (İçe Aktar)</span>
          </button>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
        </div>

        {/* Reset Button (Dangerous action) */}
        <div className="pt-2 border-t border-zinc-900/80">
          <button
            onClick={() => setShowResetModal(true)}
            className="w-full flex items-center justify-center gap-2.5 py-4.5 px-4 bg-red-950/20 hover:bg-red-950/40 active:bg-red-950/60 border border-red-900/30 rounded-xl font-semibold font-sans text-sm text-red-400 shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-4.5 h-4.5 text-red-500" />
            <span>Tüm Stokları Sıfırla (Kritik)</span>
          </button>
        </div>
      </div>

      {/* Notifications and Alerts */}
      {showImportSuccess && (
        <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 bg-emerald-950/90 border border-emerald-500/50 p-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white uppercase">Başarılı</h4>
            <p className="text-zinc-300 text-xs">Yedek başarıyla yüklendi ve uygulandı.</p>
          </div>
        </div>
      )}

      {importError && (
        <div className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 bg-red-950/90 border border-red-500/50 p-4 rounded-xl shadow-2xl flex items-start gap-3 z-50">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white uppercase">Hata</h4>
            <p className="text-zinc-300 text-xs">{importError}</p>
          </div>
          <button onClick={() => setImportError(null)} className="text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Custom Confirmation Dialog for Resetting Stocks */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-800 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-white">
                STOKLARI SIFIRLA?
              </h3>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                Bu işlem GÜDÜL TİCARET'e ait tüm kategorilerdeki stok miktarlarını sıfırlayacaktır. <strong>Bu işlem geri alınamaz!</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="py-3 px-4 bg-zinc-900 hover:bg-zinc-850 rounded-xl text-zinc-400 text-xs font-semibold cursor-pointer border border-zinc-800"
              >
                İptal Et
              </button>
              <button
                onClick={() => {
                  onReset();
                  setShowResetModal(false);
                }}
                className="py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-850 text-white text-xs font-semibold rounded-xl shadow-md cursor-pointer"
              >
                Evet, Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
