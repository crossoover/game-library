import { useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ROUTES } from "../../constants/routes";
import { TabsContainer, Tab } from "./styles";
import { Typography } from "../ui/Typography";

const tabs = [
  { key: "games", label: "All Games", route: ROUTES.games },
  { key: "slots", label: "Slots", route: ROUTES.slots },
  {
    key: "tables",
    label: "Table Games",
    route: ROUTES.tables,
  },
  { key: "live", label: "Live Games", route: ROUTES.live, icon: "pi-bolt" },
  {
    key: "instant",
    label: "Instant Games",
    route: ROUTES.instant,
  },
];

export const GameTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const getActiveTab = useCallback(() => {
    const currentPath = location.pathname;
    const activeTab = tabs.find((tab) => currentPath.includes(tab.route));
    return activeTab?.key || "games";
  }, [location.pathname]);

  const getActiveIndex = useCallback(() => {
    const activeTab = getActiveTab();
    return tabs.findIndex((tab) => tab.key === activeTab);
  }, [getActiveTab]);

  const activeTab = useMemo(() => getActiveTab(), [getActiveTab]);

  useEffect(() => {
    setFocusedIndex(getActiveIndex());
  }, [getActiveIndex]);

  const handleTabClick = useCallback((route: string) => {
    navigate(route);
  }, [navigate]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft": {
        event.preventDefault();
        const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : tabs.length - 1;
        setFocusedIndex(prevIndex);
        tabRefs.current[prevIndex]?.focus();
        break;
      }
      case "ArrowRight": {
        event.preventDefault();
        const nextIndex = focusedIndex < tabs.length - 1 ? focusedIndex + 1 : 0;
        setFocusedIndex(nextIndex);
        tabRefs.current[nextIndex]?.focus();
        break;
      }
      case "Home":
        event.preventDefault();
        setFocusedIndex(0);
        tabRefs.current[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        setFocusedIndex(tabs.length - 1);
        tabRefs.current[tabs.length - 1]?.focus();
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        navigate(tabs[focusedIndex].route);
        break;
    }
  }, [focusedIndex, navigate]);


  return (
    <TabsContainer role="tablist" aria-label="Game categories">
      {tabs.map((tab, index) => (
        <Tab
          key={tab.key}
          ref={(el) => {
            tabRefs.current[index] = el;
          }}
          isActive={activeTab === tab.key}
          onClick={() => handleTabClick(tab.route)}
          onKeyDown={handleKeyDown}
          role="tab"
          aria-selected={activeTab === tab.key}
          aria-controls={`tabpanel-${tab.key}`}
          tabIndex={index === focusedIndex ? 0 : -1}
        >
          <Typography variant="p" size="sm" weight="medium">
            {tab.label}
          </Typography>
        </Tab>
      ))}
    </TabsContainer>
  );
};
