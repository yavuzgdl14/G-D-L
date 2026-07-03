/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppState, CategoryKey } from './types';
import { INITIAL_STATE } from './constants';
import Splash from './components/Splash';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AmerikanPanelSection from './components/AmerikanPanelSection';
import MelaminSection from './components/MelaminSection';
import PvcSection from './components/PvcSection';
import CelikSection from './components/CelikSection';
import KasalarSection from './components/KasalarSection';
import StokOzetiSection from './components/StokOzetiSection';

const LOCAL_STORAGE_KEY = 'gudul_ticaret_stok_state';

export default function App() {
  const [showSplash, setShowSplash] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState<CategoryKey | null>(null);
  const [state, setState] = React.useState<AppState>(INITIAL_STATE);

  // Load state from local storage
  React.useEffect(() => {
    try {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        // Quick validate schema
        if (parsed.amerikanPanel && parsed.melamin && parsed.pvc && parsed.celik && parsed.kasalar) {
          setState(parsed);
        }
      }
    } catch (e) {
      console.error("Local storage'dan stok verileri yüklenemedi:", e);
    }
  }, []);

  // Save state to local storage on change
  const saveToLocalStorage = (newState: AppState) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error("Local storage'a stok verileri kaydedilemedi:", e);
    }
  };

  // State modifiers
  const handleUpdateAmerikanPanel = (model: string, type: string, direction: 'Sağ' | 'Sol', delta: number) => {
    setState((prev) => {
      const modelData = prev.amerikanPanel[model] || {};
      const typeData = modelData[type] || { Sağ: 0, Sol: 0 };
      const currentVal = typeData[direction] || 0;
      const newVal = Math.max(0, currentVal + delta);

      const nextState = {
        ...prev,
        amerikanPanel: {
          ...prev.amerikanPanel,
          [model]: {
            ...modelData,
            [type]: {
              ...typeData,
              [direction]: newVal,
            },
          },
        },
      };
      saveToLocalStorage(nextState);
      return nextState;
    });
  };

  const handleUpdateMelamin = (model: string, type: string, delta: number) => {
    setState((prev) => {
      const modelData = prev.melamin[model] || {};
      const currentVal = modelData[type] || 0;
      const newVal = Math.max(0, currentVal + delta);

      const nextState = {
        ...prev,
        melamin: {
          ...prev.melamin,
          [model]: {
            ...modelData,
            [type]: newVal,
          },
        },
      };
      saveToLocalStorage(nextState);
      return nextState;
    });
  };

  const handleUpdatePvc = (model: string, type: string, delta: number) => {
    setState((prev) => {
      const modelData = prev.pvc[model] || {};
      const currentVal = modelData[type] || 0;
      const newVal = Math.max(0, currentVal + delta);

      const nextState = {
        ...prev,
        pvc: {
          ...prev.pvc,
          [model]: {
            ...modelData,
            [type]: newVal,
          },
        },
      };
      saveToLocalStorage(nextState);
      return nextState;
    });
  };

  const handleUpdateCelik = (model: string, direction: 'Sağ' | 'Sol', delta: number) => {
    setState((prev) => {
      const modelData = prev.celik[model] || { Sağ: 0, Sol: 0 };
      const currentVal = modelData[direction] || 0;
      const newVal = Math.max(0, currentVal + delta);

      const nextState = {
        ...prev,
        celik: {
          ...prev.celik,
          [model]: {
            ...modelData,
            [direction]: newVal,
          },
        },
      };
      saveToLocalStorage(nextState);
      return nextState;
    });
  };

  const handleUpdateKasalar = (
    type: 'amerikanPanel' | 'melamin' | 'pvc',
    size: string,
    subType: string,
    delta: number
  ) => {
    setState((prev) => {
      const typeData = prev.kasalar[type] || {};
      const sizeData = typeData[size] || {};
      const currentVal = sizeData[subType] || 0;
      const newVal = Math.max(0, currentVal + delta);

      const nextState = {
        ...prev,
        kasalar: {
          ...prev.kasalar,
          [type]: {
            ...typeData,
            [size]: {
              ...sizeData,
              [subType]: newVal,
            },
          },
        },
      };
      saveToLocalStorage(nextState);
      return nextState;
    });
  };

  const handleResetAll = () => {
    setState(INITIAL_STATE);
    saveToLocalStorage(INITIAL_STATE);
  };

  const handleImportState = (newState: AppState) => {
    setState(newState);
    saveToLocalStorage(newState);
  };

  // Back action helper
  const handleBackToDashboard = () => {
    setActiveCategory(null);
  };

  // Title translation
  const getCategoryTitle = (key: CategoryKey): string => {
    switch (key) {
      case 'amerikanPanel': return 'Amerikan Panel Kapılar';
      case 'melamin': return 'Melamin Kapılar';
      case 'pvc': return 'PVC Kapılar';
      case 'celik': return 'Çelik Kapılar';
      case 'kasalar': return 'Kasalar';
      case 'stokOzeti': return 'Stok Özeti';
      default: return '';
    }
  };

  // Render sub view
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'amerikanPanel':
        return (
          <AmerikanPanelSection
            stok={state.amerikanPanel}
            onUpdate={handleUpdateAmerikanPanel}
          />
        );
      case 'melamin':
        return (
          <MelaminSection
            stok={state.melamin}
            onUpdate={handleUpdateMelamin}
          />
        );
      case 'pvc':
        return (
          <PvcSection
            stok={state.pvc}
            onUpdate={handleUpdatePvc}
          />
        );
      case 'celik':
        return (
          <CelikSection
            stok={state.celik}
            onUpdate={handleUpdateCelik}
          />
        );
      case 'kasalar':
        return (
          <KasalarSection
            stok={state.kasalar}
            onUpdate={handleUpdateKasalar}
          />
        );
      case 'stokOzeti':
        return (
          <StokOzetiSection
            state={state}
            onReset={handleResetAll}
            onImport={handleImportState}
          />
        );
      default:
        return null;
    }
  };

  if (showSplash) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div id="app-container" className="min-h-screen bg-[#0b0c0e] flex flex-col select-none max-w-lg mx-auto border-x border-zinc-950/90 shadow-2xl relative">
      {activeCategory === null ? (
        <>
          <Header title="GÜDÜL TİCARET" subtitle="STOK TAKİP SİSTEMİ" />
          <Dashboard state={state} onSelectCategory={setActiveCategory} />
        </>
      ) : (
        <>
          <Header
            title={getCategoryTitle(activeCategory)}
            subtitle="GÜDÜL TİCARET"
            onBack={handleBackToDashboard}
            showHome
            onHome={handleBackToDashboard}
          />
          {renderCategoryContent()}
        </>
      )}
    </div>
  );
}
