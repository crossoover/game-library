import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  Wrap,
  MenuButton,
  ToggleButton,
  SlideMenu,
  MenuOverlay,
  SlideMenuContent,
  MenuCategory,
  CategoryOption,
  MenuHeader,
} from "./styles";
import { ROUTES } from "../../constants/routes";
import { IconButton } from "../ui/IconButton";
import { Typography } from "../ui/Typography";

import logo from "../../assets/logo.png";

export const MobileMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveRoute = (route: string) => {
    return location.pathname.includes(route);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Wrap role="navigation" aria-label="Mobile navigation menu">
        <MenuButton
          isActive={isActiveRoute(ROUTES.slots)}
          onClick={() => handleNavigation(ROUTES.slots)}
          aria-label="Navigate to Slots"
          tabIndex={0}
          role="button"
        >
          <i className="pi pi-crown" />
          <Typography variant="p" size="xss">
            Slots
          </Typography>
        </MenuButton>

        <MenuButton
          isActive={isActiveRoute(ROUTES.tables)}
          onClick={() => handleNavigation(ROUTES.tables)}
          aria-label="Navigate to Table Games"
          tabIndex={0}
          role="button"
        >
          <i className="pi pi-table" />
          <Typography variant="p" size="xss">
            Table Games
          </Typography>
        </MenuButton>

        <MenuButton
          isActive={isActiveRoute(ROUTES.live)}
          onClick={() => handleNavigation(ROUTES.live)}
          aria-label="Navigate to Live Games"
          tabIndex={0}
          role="button"
        >
          <i className="pi pi-bolt" />
          <Typography variant="p" size="xss">
            Live Games
          </Typography>
        </MenuButton>

        <MenuButton
          isActive={isActiveRoute(ROUTES.instant)}
          onClick={() => handleNavigation(ROUTES.instant)}
          aria-label="Navigate to Instant Games"
          tabIndex={0}
          role="button"
        >
          <i className="pi pi-bullseye" />
          <Typography variant="p" size="xss">
            Instant Games
          </Typography>
        </MenuButton>

        <ToggleButton>
          <IconButton
            iconClassName="pi-bars"
            onClick={toggleMenu}
            aria-label="Open menu"
          />
        </ToggleButton>
      </Wrap>

      <MenuOverlay isOpen={isMenuOpen} onClick={toggleMenu} />
      <SlideMenu
        isOpen={isMenuOpen}
        role="navigation"
        aria-label="Full navigation menu"
      >
        <SlideMenuContent>
          <MenuHeader>
            <div>
              <img src={logo} alt="Logo" />
            </div>
            <Typography variant="p" weight="semibold">
              PLayLink
            </Typography>
          </MenuHeader>
          <MenuCategory>
            <Typography variant="h2" size="base" weight="semibold">
              Games
            </Typography>
            <CategoryOption
              isActive={isActiveRoute(ROUTES.games)}
              onClick={() => handleNavigation(ROUTES.games)}
              aria-label="Navigate to All Games"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-box" />
              <Typography variant="p" size="sm">
                All Games
              </Typography>
            </CategoryOption>
            <CategoryOption
              isActive={isActiveRoute(ROUTES.slots)}
              onClick={() => handleNavigation(ROUTES.slots)}
              aria-label="Navigate to Slots"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-crown" />
              <Typography variant="p" size="sm">
                Slots
              </Typography>
            </CategoryOption>
            <CategoryOption
              isActive={isActiveRoute(ROUTES.tables)}
              onClick={() => handleNavigation(ROUTES.tables)}
              aria-label="Navigate to Table Games"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-table" />
              <Typography variant="p" size="sm">
                Table Games
              </Typography>
            </CategoryOption>
            <CategoryOption
              isActive={isActiveRoute(ROUTES.live)}
              onClick={() => handleNavigation(ROUTES.live)}
              aria-label="Navigate to Live Games"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-bolt" />
              <Typography variant="p" size="sm">
                Live Games
              </Typography>
            </CategoryOption>
            <CategoryOption
              isActive={isActiveRoute(ROUTES.instant)}
              onClick={() => handleNavigation(ROUTES.instant)}
              aria-label="Navigate to Instant Games"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-bullseye" />
              <Typography variant="p" size="sm">
                Instant Games
              </Typography>
            </CategoryOption>
          </MenuCategory>

          <MenuCategory>
            <Typography variant="h2" size="base" weight="semibold">
              Account
            </Typography>
            <CategoryOption
              aria-label="View Promotions"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-gift" />
              <Typography variant="p" size="sm">
                Promotions
              </Typography>
            </CategoryOption>
            <CategoryOption aria-label="Buy Crypto" tabIndex={0} role="button">
              <i className="pi pi-bitcoin" />
              <Typography variant="p" size="sm">
                Buy Crypto
              </Typography>
            </CategoryOption>
            <CategoryOption aria-label="View FAQ" tabIndex={0} role="button">
              <i className="pi pi-info-circle" />
              <Typography variant="p" size="sm">
                FAQ
              </Typography>
            </CategoryOption>
            <CategoryOption
              aria-label="Contact Support"
              tabIndex={0}
              role="button"
            >
              <i className="pi pi-user" />
              <Typography variant="p" size="sm">
                Support
              </Typography>
            </CategoryOption>
          </MenuCategory>
        </SlideMenuContent>
      </SlideMenu>
    </>
  );
};
