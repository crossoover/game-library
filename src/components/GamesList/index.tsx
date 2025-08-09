import styled from "styled-components";
import type { FC } from "react";
import { useState, useMemo, useCallback } from "react";
import type { Game, GameType } from "../../types/games";
import { Typography } from "../ui/Typography";
import { GameGrid } from "../GameGrid";
import { GameCardSkeleton } from "../GameCard/GameCardSkeleton";
import { EmptyState } from "./EmptyState";

export type GamesListProps = {
  games: Game[];
  searchQuery?: string;
  currentRoute?: string;
  hasActiveFilters?: boolean;
  isLoading?: boolean;
};

const categoryOrder: GameType[] = ["live", "slots", "table", "instant"];

const categoryTitles: Record<GameType, string> = {
  live: "Live Games",
  slots: "Slot Games",
  table: "Table Games",
  instant: "Instant Games",
};

export const GamesList: FC<GamesListProps> = ({
  games,
  searchQuery = "",
  currentRoute = "/games",
  hasActiveFilters = false,
  isLoading = false,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<GameType>>(
    new Set()
  );

  const gamesByCategory = useMemo(
    () =>
      games.reduce((acc, game) => {
        if (!acc[game.type]) {
          acc[game.type] = [];
        }
        acc[game.type].push(game);
        return acc;
      }, {} as Record<GameType, Game[]>),
    [games]
  );

  const isMainGamesRoute = useMemo(
    () => currentRoute === "/games",
    [currentRoute]
  );
  const shouldLimitGames = useMemo(
    () => isMainGamesRoute && !hasActiveFilters && !searchQuery,
    [isMainGamesRoute, hasActiveFilters, searchQuery]
  );

  const handleShowAll = useCallback((category: GameType) => {
    setExpandedCategories((prev) => new Set(prev).add(category));
  }, []);

  const handleShowLess = useCallback((category: GameType) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      newSet.delete(category);
      return newSet;
    });
  }, []);

  const handleShowAllKeyDown = useCallback(
    (event: React.KeyboardEvent, category: GameType) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleShowAll(category);
      }
    },
    [handleShowAll]
  );

  const handleShowLessKeyDown = useCallback(
    (event: React.KeyboardEvent, category: GameType) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleShowLess(category);
      }
    },
    [handleShowLess]
  );

  if (isLoading) {
    return (
      <Container>
        {categoryOrder.map((category) => (
          <CategorySection key={category}>
            <CategoryHeader>
              <Typography variant="h3">{categoryTitles[category]}</Typography>
            </CategoryHeader>
            <SkeletonGrid>
              {Array.from({ length: 5 }, (_, index) => (
                <GameCardSkeleton key={`${category}-skeleton-${index}`} />
              ))}
            </SkeletonGrid>
          </CategorySection>
        ))}
      </Container>
    );
  }

  return (
    <Container role="main" aria-label="Games library">
      {games.length > 0 ? (
        <>
          {categoryOrder.map((category) => {
            const categoryGames = gamesByCategory[category];
            if (!categoryGames || categoryGames.length === 0) {
              return null;
            }

            const isExpanded = expandedCategories.has(category);
            const shouldShowAll = !shouldLimitGames || isExpanded;
            const displayGames = shouldShowAll
              ? categoryGames
              : categoryGames.slice(0, 5);
            const showExpandButton =
              shouldLimitGames && !isExpanded && categoryGames.length > 5;
            const showCollapseButton =
              shouldLimitGames && isExpanded && categoryGames.length > 5;

            return (
              <CategorySection
                key={category}
                role="region"
                aria-labelledby={`category-heading-${category}`}
              >
                <CategoryHeader>
                  <Typography variant="h3">
                    {categoryTitles[category]}
                  </Typography>
                  {showExpandButton && (
                    <ShowAllButton
                      onClick={() => handleShowAll(category)}
                      onKeyDown={(e) => handleShowAllKeyDown(e, category)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Show all ${categoryTitles[
                        category
                      ].toLowerCase()}`}
                    >
                      <Typography variant="p" size="sm">
                        Show all
                      </Typography>
                    </ShowAllButton>
                  )}
                  {showCollapseButton && (
                    <ShowAllButton
                      onClick={() => handleShowLess(category)}
                      onKeyDown={(e) => handleShowLessKeyDown(e, category)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Show less ${categoryTitles[
                        category
                      ].toLowerCase()}`}
                    >
                      <Typography variant="p" size="sm">
                        Show less
                      </Typography>
                    </ShowAllButton>
                  )}
                </CategoryHeader>
                <GameGrid games={displayGames} />
              </CategorySection>
            );
          })}
        </>
      ) : (
        <EmptyState
          searchQuery={searchQuery}
          hasActiveFilters={hasActiveFilters}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const CategorySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ShowAllButton = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.background.button}20;
    outline: none;

    p {
      text-decoration: underline;
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text.active};
    outline-offset: 2px;
  }
`;

const SkeletonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  > * {
    flex: 1 1 calc(50% - ${({ theme }) => theme.spacing.md} / 2);
    min-width: 150px;
  }

  @media (min-width: 480px) {
    > * {
      flex: 1 1 calc(33.333% - ${({ theme }) => theme.spacing.md} * 2 / 3);
      min-width: 180px;
    }
  }

  @media (min-width: 768px) {
    > * {
      flex: 1 1 calc(25% - ${({ theme }) => theme.spacing.md} * 3 / 4);
      min-width: 200px;
    }
  }

  @media (min-width: 1024px) {
    > * {
      flex: 1 1 calc(20% - ${({ theme }) => theme.spacing.md} * 4 / 5);
      min-width: 220px;
    }
  }
`;
