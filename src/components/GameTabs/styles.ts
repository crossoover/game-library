import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.input};
  width: fit-content;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  height: 44px;
`;

export const Tab = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  height: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.button : "transparent"};
  border: none;
  outline: none;
  margin: ${({ theme }) => theme.spacing.xxs};

  i {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.background.button};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text.active};
    outline-offset: 2px;
  }

  @media screen and (max-width: 550px) {
    p {
      font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    }
  }
`;
