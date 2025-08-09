import styled from "styled-components";
import type { FC } from "react";
import { useCallback, useMemo } from "react";
import type { Game } from "../../types/games";
import { Typography } from "../ui/Typography";
import { getGameImage } from "../../constants/gameImages";

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

const Card = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  overflow: hidden;
  height: 200px;
  max-width: 280px;
  display: flex;
  flex-direction: column;

  &:hover,
  &:focus {
    transform: ${({ theme }) => theme.transforms.smallUpScale};
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text.active};
    outline-offset: 2px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

const GameImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: ${({ theme }) => theme.transitions.medium};

  ${Card}:hover &,
  ${Card}:focus & {
    filter: blur(3px);
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.background.button};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: ${({ theme }) => theme.transitions.medium};

  ${Card}:hover &,
  ${Card}:focus & {
    opacity: 1;
  }
`;

const PlayTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 18px solid ${({ theme }) => theme.colors.text.primary};
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  margin-left: 4px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.8), transparent);
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.lg}`};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  opacity: 0;
  transition: ${({ theme }) => theme.transitions.medium};

  ${Card}:hover &,
  ${Card}:focus & {
    opacity: 1;
  }

  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: 0.8;
  }
`;

const TagsContainer = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: 0;
  margin: ${({ theme }) => theme.spacing.sm};
  transition: ${({ theme }) => theme.transitions.medium};
  z-index: 2;

  ${Card}:hover &,
  ${Card}:focus & {
    opacity: 1;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.button};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  white-space: nowrap;
  text-transform: capitalize;
`;

const VisuallyHiddenDescription = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
