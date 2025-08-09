import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: space-around;
  height: 70px;
  z-index: 10;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  margin: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.sidebar};
  border-radius: ${({ theme }) => theme.borderRadius.full};

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MenuButton = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.button : "transparent"};
  transition: ${({ theme }) => theme.transitions.ultraFast};
  outline: none;
  min-width: 50px;

  i {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xxs};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    text-align: center;
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.background.button};
  }
`;

export const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 15;
  background: ${({ theme }) => theme.colors.background.mobileMenuOverlay};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: ${({ theme }) => theme.transitions.slow};

  @media (min-width: 768px) {
    display: none;
  }
`;

export const SlideMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: ${({ theme }) => theme.colors.background.sidebar};
  z-index: 20;
  transform: translateX(${({ isOpen }) => (isOpen ? "0" : "-100%")});
  transition: ${({ theme }) => theme.transitions.slow};
  overflow-y: auto;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const SlideMenuContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.xxl};
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.lg};

  p {
    margin-left: ${({ theme }) => theme.spacing.sm};
    text-wrap: nowrap;
  }

  div {
    width: 30px;

    img {
      width: 100%;
    }
  }
`;

export const MenuCategory = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  &:first-child {
    margin-top: ${({ theme }) => theme.spacing.lg};
  }
`;

export const CategoryOption = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  height: ${({ theme }) => theme.dimensions.buttons.button.minHeight};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.button : "transparent"};
  transition: ${({ theme }) => theme.transitions.ultraFast};
  outline: none;

  p {
    margin-left: ${({ theme }) => theme.spacing.sm};
    text-wrap: nowrap;
  }

  i {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.background.button};
  }
`;
