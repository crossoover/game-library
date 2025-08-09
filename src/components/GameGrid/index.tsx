import type { FC } from "react";
import type { Game } from "../../types/games";
import { GameCard } from "../GameCard";
import { Grid } from "./styles";

export type GameGridProps = {
  games: Game[];
};

export const GameGrid: FC<GameGridProps> = ({ games }) => {
  return (
    <Grid role="grid" aria-label={`${games.length} games available`}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </Grid>
  );
};

