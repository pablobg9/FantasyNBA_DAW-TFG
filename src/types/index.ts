export interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  stats: PlayerStats;
}

export interface PlayerStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
}

export interface Team {
  id: number;
  name: string;
  owner: string;
  players: Player[];
  points: number;
}

export interface League {
  id: number;
  name: string;
  teams: Team[];
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'draft';
} 