export interface GamesResponse {
  data: Game[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    hasMore: boolean;
  };
  meta: {
    providers: Provider[];
    types: GameType[];
  };
}

export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  provider: Provider;
  type: GameType;
  slug: string;
  isNew?: boolean;
  tags?: string[];
}

export interface Provider {
  id: string;
  name: string;
  logo?: string;
}

export type GameType = "slots" | "table" | "live" | "instant";
