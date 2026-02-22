
// Types for application state and components
export enum AppStep {
  JOIN_CHANNELS = 'JOIN_CHANNELS',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD'
}

export interface PredictionState {
  period: string;
  timer: string;
  // Included '...' to support the placeholder state used in the UI during scanning or initialization
  prediction: 'BIG' | 'SMALL' | '...' | null;
  history: Array<{ period: string; result: 'BIG' | 'SMALL' | '...' }>;
  isScanning: boolean;
}

export interface TerminalEntry {
  id: string;
  text: string;
  type: 'info' | 'warn' | 'success' | 'danger';
  timestamp: string;
}

export interface HGNICEResult {
  id: string;
  period: string;
  // Included '...' to maintain consistency with PredictionState
  result: 'BIG' | 'SMALL' | '...';
  probability: string;
}

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  zIndex: number;
  icon: string;
}