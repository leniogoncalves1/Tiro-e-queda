
export interface Attempt {
  guess: string;
  tiros: number;
  quedas: number;
  resultLabel: string;
  timestamp: number;
}

export type GameState = 'playing' | 'won' | 'lost';
