import type { FC } from "react";
import { useCallback, useMemo } from "react";
import type { Game } from "../../types/games";
import { Typography } from "../ui/Typography";
import { getGameImage } from "../../constants/gameImages";
import {
  Card,
  ImageContainer,
  GameImage,
  PlayButton,
  PlayTriangle,
  Overlay,
  TagsContainer,
  TagWrapper,
  VisuallyHiddenDescription,
} from "./styles";

export type GameCardProps = {
  game: Game;
};

export const GameCard: FC<GameCardProps> = ({ game }) => {
  const gameImage = useMemo(() => getGameImage(game.slug), [game.slug]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        console.log(`Launch game: ${game.title}`);
      }
    },
    [game.title]
  );

  return (
    <Card
      tabIndex={0}
      role="button"
      aria-label={`Play ${game.title} by ${game.provider.name}${
        game.tags ? `. Tags: ${game.tags.join(", ")}` : ""
      }`}
      aria-describedby={`game-description-${game.id}`}
      onKeyDown={handleKeyDown}
      data-testid={`game-card-${game.id}`}
    >
      <ImageContainer>
        <GameImage
          src={gameImage}
          alt={`${game.title} game thumbnail`}
          role="img"
        />
        <PlayButton aria-hidden="true">
          <PlayTriangle />
        </PlayButton>
        <Overlay aria-hidden="true">
          <Typography variant="h3" size="base" weight="medium">
            {game.title}
          </Typography>
          <Typography variant="p" size="sm">
            {game.provider.name}
          </Typography>
        </Overlay>
        {game.tags && game.tags.length > 0 && (
          <TagsContainer
            aria-label={`Game tags: ${game.tags.join(", ")}`}
            role="list"
          >
            {game.tags.slice(0, 2).map((tag) => (
              <TagWrapper key={tag} role="listitem" aria-label={`Tag: ${tag}`}>
                <Typography variant="span" size="xss" weight="medium">
                  {tag}
                </Typography>
              </TagWrapper>
            ))}
            {game.tags && game.tags.length > 2 && (
              <TagWrapper role="listitem" aria-label={`Tag: Additional`}>
                <Typography variant="span" size="xss" weight="medium">
                  +{game.tags.length - 2}
                </Typography>
              </TagWrapper>
            )}
          </TagsContainer>
        )}
        <VisuallyHiddenDescription id={`game-description-${game.id}`}>
          {game.title} is a {game.type} game by {game.provider.name}.
          {game.tags &&
            game.tags.length > 0 &&
            ` Tagged as: ${game.tags.join(", ")}.`}
          Press Enter or Space to play this game.
        </VisuallyHiddenDescription>
      </ImageContainer>
    </Card>
  );
};

