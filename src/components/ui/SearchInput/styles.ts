import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SearchIcon = styled.i`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  z-index: 1;
  pointer-events: none;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: ${({ theme }) => theme.dimensions.buttons.button.minHeight};
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.xxl} ${theme.spacing.md} ${theme.spacing.xxl}`};
  background: ${({ theme }) => theme.colors.background.input};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  transition: ${({ theme }) => theme.transitions.fast};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.primary}80;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  background: transparent;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  transition: ${({ theme }) => theme.transitions.fast};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text.active};
    transform: ${({ theme }) => theme.transforms.regularUpScale};
  }
`;