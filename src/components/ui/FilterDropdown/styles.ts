import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  min-width: 230px;
  height: ${({ theme }) => theme.dimensions.buttons.button.minHeight};
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.input};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  transition: ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.text.active};
    outline-offset: 2px;
  }

  span {
    text-align: left;
    flex: 1;
  }

  @media screen and (max-width: 550px) {
    min-width: 100%;

    span {
      font-size: ${({ theme }) => theme.typography.fontSizes.xs} !important;
    }
  }
`;

export const DropdownIcon = styled.i<{ $isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: ${({ theme }) => theme.transitions.fast};
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.xs});
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background.input};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
`;

export const DropdownOption = styled.button<{
  $isSelected: boolean;
  $isFocused: boolean;
}>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  background: ${({ theme, $isSelected, $isFocused }) => {
    if ($isSelected) return theme.colors.background.button;
    if ($isFocused) return `${theme.colors.background.button}40`;
    return "transparent";
  }};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  outline: none;

  &:hover {
    background: ${({ theme, $isSelected }) =>
      $isSelected
        ? theme.colors.background.button
        : `${theme.colors.background.button}20`};
  }

  @media screen and (max-width: 550px) {
    span {
      font-size: ${({ theme }) => theme.typography.fontSizes.xs} !important;
    }
  }
`;

export const ClearOptionWrapper = styled.span`
  font-style: italic;
  opacity: 0.8;
`;