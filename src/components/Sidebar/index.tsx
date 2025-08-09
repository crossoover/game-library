import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { Logo, Middle, Top, Wrap, Option } from "./styles";
import { ROUTES } from "../../constants/routes";
import { IconButton } from "../ui/IconButton";
import { Typography } from "../ui/Typography";

import logo from "../../assets/logo.png";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, action?: () => void) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        action?.();
      }
    },
    []
  );

  const [isQuickOpen, setIsQuickOpen] = useState(() =>
    JSON.parse(localStorage.getItem("isSidebarQuickOpen") || "true")
  );

  const showFull = useMemo(
    () => isQuickOpen || isSidebarOpen,
    [isSidebarOpen, isQuickOpen]
  );

  const isActiveRoute = (route: string) => {
    return location.pathname.includes(route);
  };

  useEffect(() => {
    scrollToTop();
  }, [location]);

  useEffect(() => {
    localStorage.setItem("isSidebarQuickOpen", JSON.stringify(isQuickOpen));
  }, [isQuickOpen]);

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <Wrap
      isOpen={showFull}
      onMouseEnter={() => setIsQuickOpen(true)}
      onMouseLeave={() => setIsQuickOpen(false)}
    >
      <div>
        <Top>
          <Logo showFull={showFull}>
            <div>
              <img src={logo} alt="Logo" />
            </div>
            <Typography variant="p" weight="semibold">
              PLayLink
            </Typography>
          </Logo>
          <IconButton
            iconClassName={
              isSidebarOpen ? "pi-window-minimize" : "pi-window-maximize"
            }
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          />
        </Top>
        <Middle
          showFull={showFull}
          role="navigation"
          aria-label="Game categories"
        >
          <section role="group" aria-labelledby="games-heading">
            <Typography variant="h2" size="base" weight="semibold">
              Games
            </Typography>
            <Option
              isActive={isActiveRoute(ROUTES.games)}
              onClick={() => navigate(ROUTES.games)}
              onKeyDown={(e) => handleKeyDown(e, () => navigate(ROUTES.games))}
              aria-label="Navigate to All Games"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-box" />
              <Typography variant="p" size="sm">
                All Games
              </Typography>
            </Option>
            <Option
              isActive={isActiveRoute(ROUTES.slots)}
              onClick={() => navigate(ROUTES.slots)}
              onKeyDown={(e) => handleKeyDown(e, () => navigate(ROUTES.slots))}
              aria-label="Navigate to Slots"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-crown" />
              <Typography variant="p" size="sm">
                Slots
              </Typography>
            </Option>
            <Option
              isActive={isActiveRoute(ROUTES.tables)}
              onClick={() => navigate(ROUTES.tables)}
              onKeyDown={(e) => handleKeyDown(e, () => navigate(ROUTES.tables))}
              aria-label="Navigate to Table Games"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-table" />
              <Typography variant="p" size="sm">
                Table Games
              </Typography>
            </Option>
            <Option
              isActive={isActiveRoute(ROUTES.live)}
              onClick={() => navigate(ROUTES.live)}
              onKeyDown={(e) => handleKeyDown(e, () => navigate(ROUTES.live))}
              aria-label="Navigate to Live Games"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-bolt" />
              <Typography variant="p" size="sm">
                Live Games
              </Typography>
            </Option>
            <Option
              isActive={isActiveRoute(ROUTES.instant)}
              onClick={() => navigate(ROUTES.instant)}
              onKeyDown={(e) =>
                handleKeyDown(e, () => navigate(ROUTES.instant))
              }
              aria-label="Navigate to Instant Games"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-bullseye" />
              <Typography variant="p" size="sm">
                Instant Games
              </Typography>
            </Option>
          </section>
          <section role="group" aria-labelledby="account-heading">
            <Typography variant="h2" size="base" weight="semibold">
              Account
            </Typography>
            <Option
              aria-label="View Promotions"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => handleKeyDown(e)}
            >
              <i className="pi pi-gift" />
              <Typography variant="p" size="sm">
                Promotions
              </Typography>
            </Option>
            <Option
              aria-label="Buy Crypto"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => handleKeyDown(e)}
            >
              <i className="pi pi-bitcoin" />
              <Typography variant="p" size="sm">
                Buy Crypto
              </Typography>
            </Option>
            <Option
              aria-label="View FAQ"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => handleKeyDown(e)}
            >
              <i className="pi pi-info-circle" />
              <Typography variant="p" size="sm">
                FAQ
              </Typography>
            </Option>
            <Option
              aria-label="Contact Support"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => handleKeyDown(e)}
            >
              <i className="pi pi-user" />
              <Typography variant="p" size="sm">
                Support
              </Typography>
            </Option>
          </section>
        </Middle>
      </div>
    </Wrap>
  );
};
