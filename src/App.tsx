import styled, { ThemeProvider } from "styled-components";
import { FlexAlignCenterJustifyCenter, GlobalStyle } from "./styles/global";
import { useTheme } from "./hooks/useTheme";
import { BrowserRouter, useNavigate } from "react-router";
import { MobileMenu } from "./components/MobileMenu";
import { Sidebar } from "./components/Sidebar";
import { BannerSlider } from "./components/BannerSlider";
import { SearchInput } from "./components/ui/SearchInput";
import {
  ProvidersDropdown,
  TagsDropdown,
} from "./components/ui/FilterDropdown";
import { GamesList } from "./components/GamesList";
import { GameTabs } from "./components/GameTabs";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import type { GamesResponse, Game } from "./types/games";
import { Typography } from "./components/ui/Typography";
import { ROUTES } from "./constants/routes";
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { OfflineState } from "./components/OfflineState";

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const [games, setGames] = useState<GamesResponse>();
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("isSidebarOpen") || "true")
  );

  useEffect(() => {
    const fetchGames = async () => {
      if (!isOnline) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          "https://raw.githubusercontent.com/crossoover/mock-api-games/main/db.json"
        );
        const data = await response.json();

        // mock 1 second delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setGames(data);
        setFilteredGames(data.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [isOnline]);

  const getGameTypeFromRoute = useCallback(() => {
    const path = location.pathname;
    if (path.includes("/slots")) return "slots";
    if (path.includes("/tables")) return "table";
    if (path.includes("/live")) return "live";
    if (path.includes("/instant")) return "instant";
    return null;
  }, [location.pathname]);

  const filterGames = useCallback(
    (query: string = searchQuery) => {
      if (!games?.data) return;

      let filtered = games.data;

      const gameType = getGameTypeFromRoute();
      if (gameType) {
        filtered = filtered.filter((game) => game.type === gameType);
      }

      if (query.trim() !== "") {
        filtered = filtered.filter((game) =>
          game.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (selectedProvider) {
        filtered = filtered.filter((game) =>
          game.provider.name
            .toLowerCase()
            .replace(/['\s]/g, "")
            .includes(selectedProvider)
        );
      }

      if (selectedTag) {
        filtered = filtered.filter((game) =>
          game.tags?.some((tag) =>
            tag.toLowerCase().includes(selectedTag.toLowerCase())
          )
        );
      }

      setFilteredGames(filtered);
    },
    [
      games?.data,
      getGameTypeFromRoute,
      searchQuery,
      selectedProvider,
      selectedTag,
    ]
  );

  useEffect(() => {
    if (games?.data) {
      filterGames();
    }
  }, [games, filterGames]);

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      filterGames(query);
    },
    [filterGames]
  );

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedProvider(null);
    setSelectedTag(null);
    navigate(ROUTES.games);
  }, [navigate]);

  const handleClearFiltersKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleClearFilters();
      }
    },
    [handleClearFilters]
  );

  const hasActiveFilters = useMemo(
    () => !!(searchQuery || selectedProvider || selectedTag),
    [searchQuery, selectedProvider, selectedTag]
  );

  const isNotGamesRoute = useMemo(
    () => location.pathname !== "/games",
    [location.pathname]
  );

  const shouldShowClearFilters = useMemo(
    () => hasActiveFilters || isNotGamesRoute,
    [hasActiveFilters, isNotGamesRoute]
  );

  if (!isOnline) {
    return <OfflineState />;
  }

  return (
    <>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <MobileMenu />
      <Wrapper>
        <InnerWrap isSidebarOpen={isSidebarOpen} id="main-content">
          <BannerSlider />
          <FiltersContainer role="region" aria-label="Game filters and search">
            <SearchContainer>
              <SearchInput onSearch={handleSearch} value={searchQuery} />
            </SearchContainer>
            <FeaturesContainer>
              <GameTabs />
              <DropdownsContainer role="group" aria-label="Filter options">
                <ProvidersDropdown
                  value={selectedProvider}
                  onChange={setSelectedProvider}
                  placeholder="All Providers"
                  label="Provider"
                />
                <TagsDropdown
                  value={selectedTag}
                  onChange={setSelectedTag}
                  placeholder="All Tags"
                  label="Tags"
                />
                {shouldShowClearFilters && (
                  <ClearFiltersWrap
                    onClick={handleClearFilters}
                    onKeyDown={handleClearFiltersKeyDown}
                    tabIndex={0}
                    role="button"
                    aria-label="Clear all filters"
                  >
                    <ClearFilters variant="p" size="sm">
                      Clear filters
                    </ClearFilters>
                  </ClearFiltersWrap>
                )}
              </DropdownsContainer>
            </FeaturesContainer>
          </FiltersContainer>
          <GamesList
            games={filteredGames}
            searchQuery={searchQuery}
            currentRoute={location.pathname}
            hasActiveFilters={hasActiveFilters}
            isLoading={isLoading}
          />
        </InnerWrap>
      </Wrapper>
    </>
  );
};

export const App = () => {
  const { themeConfig } = useTheme();

  return (
    <ThemeProvider theme={themeConfig}>
      <GlobalStyle />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${(props) => props.theme.colors.background.screen};
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 100px;
`;

const InnerWrap = styled.div<{ isSidebarOpen: boolean }>`
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen && "220") || "80"}px;
  transition: ${({ theme }) => theme.transitions.slow};
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const FiltersContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const FeaturesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const SearchContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DropdownsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media screen and (max-width: 550px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ClearFiltersWrap = styled.div`
  ${FlexAlignCenterJustifyCenter}
  cursor: pointer;
  height: 44px;
  padding: ${({ theme }) => theme.spacing.md};

  &:hover,
  &:focus {
    p {
      text-decoration: underline;
    }
  }
`;

const ClearFilters = styled(Typography)`
  white-space: nowrap;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 6px;
  background: ${({ theme }) => theme.colors.background.button};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  z-index: 9999;
  transition: ${({ theme }) => theme.transitions.fast};

  &:focus {
    top: 6px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.text.active};
  }
`;
