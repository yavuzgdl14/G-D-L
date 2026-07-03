/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppState } from './types';

export function calculateAmerikanPanelTotal(amerikanPanel: AppState['amerikanPanel']): number {
  let total = 0;
  for (const model in amerikanPanel) {
    for (const type in amerikanPanel[model]) {
      total += (amerikanPanel[model][type].Sağ || 0) + (amerikanPanel[model][type].Sol || 0);
    }
  }
  return total;
}

export function calculateMelaminTotal(melamin: AppState['melamin']): number {
  let total = 0;
  for (const model in melamin) {
    for (const type in melamin[model]) {
      total += melamin[model][type] || 0;
    }
  }
  return total;
}

export function calculatePvcTotal(pvc: AppState['pvc']): number {
  let total = 0;
  for (const model in pvc) {
    for (const type in pvc[model]) {
      total += pvc[model][type] || 0;
    }
  }
  return total;
}

export function calculateCelikTotal(celik: AppState['celik']): number {
  let total = 0;
  for (const model in celik) {
    total += (celik[model].Sağ || 0) + (celik[model].Sol || 0);
  }
  return total;
}

export function calculateKasalarTotal(kasalar: AppState['kasalar']): number {
  let total = 0;
  
  // Amerikan Panel Kasalar
  for (const size in kasalar.amerikanPanel) {
    total += (kasalar.amerikanPanel[size]["70'lik"] || 0) + (kasalar.amerikanPanel[size]["80'lik"] || 0);
  }
  
  // Melamin Kasalar
  for (const size in kasalar.melamin) {
    total += (kasalar.melamin[size]["70"] || 0) + (kasalar.melamin[size]["80"] || 0);
  }
  
  // PVC Kasalar
  for (const size in kasalar.pvc) {
    total += (kasalar.pvc[size]["70"] || 0) + (kasalar.pvc[size]["80"] || 0);
  }
  
  return total;
}

export interface StockSummary {
  amerikanPanel: number;
  melamin: number;
  pvc: number;
  celik: number;
  kasalar: number;
  genelToplam: number;
}

export function getStockSummary(state: AppState): StockSummary {
  const amerikanPanel = calculateAmerikanPanelTotal(state.amerikanPanel);
  const melamin = calculateMelaminTotal(state.melamin);
  const pvc = calculatePvcTotal(state.pvc);
  const celik = calculateCelikTotal(state.celik);
  const kasalar = calculateKasalarTotal(state.kasalar);
  const genelToplam = amerikanPanel + melamin + pvc + celik + kasalar;

  return {
    amerikanPanel,
    melamin,
    pvc,
    celik,
    kasalar,
    genelToplam
  };
}
