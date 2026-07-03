/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AmerikanPanelStok {
  [model: string]: {
    [type: string]: {
      Sağ: number;
      Sol: number;
    };
  };
}

export interface MelaminStok {
  [model: string]: {
    [type: string]: number;
  };
}

export interface PvcStok {
  [model: string]: {
    [type: string]: number;
  };
}

export interface CelikStok {
  [model: string]: {
    Sağ: number;
    Sol: number;
  };
}

export interface KasaStok {
  amerikanPanel: {
    [size: string]: {
      "70'lik": number;
      "80'lik": number;
    };
  };
  melamin: {
    [size: string]: {
      "70": number;
      "80": number;
    };
  };
  pvc: {
    [size: string]: {
      "70": number;
      "80": number;
    };
  };
}

export interface AppState {
  amerikanPanel: AmerikanPanelStok;
  melamin: MelaminStok;
  pvc: PvcStok;
  celik: CelikStok;
  kasalar: KasaStok;
}

export type CategoryKey = 'amerikanPanel' | 'melamin' | 'pvc' | 'celik' | 'kasalar' | 'stokOzeti';
