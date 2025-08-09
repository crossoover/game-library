import styled from "styled-components";
import { FlexAlignCenterJustifyBetween } from "../../styles/global";

export const Wrap = styled.div<{ isOpen: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  z-index: 3;
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.sm};
  width: ${({ isOpen }) => (isOpen ? "200px" : "62px")};
  height: calc(100vh - 32px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.background.sidebar};
  transition: ${({ theme }) => theme.transitions.slow} width;

  > div {
    overflow: hidden;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Top = styled.div`
  ${FlexAlignCenterJustifyBetween};
`;

export const Logo = styled.div<{ showFull: boolean }>`
  ${FlexAlignCenterJustifyBetween}

  p {
    margin-left: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme, showFull }) =>
      showFull ? theme.colors.text.primary : "transparent"};
    transition: ${({ theme }) => theme.transitions.slow};
    text-wrap: nowrap;
  }

  div {
    width: 30px;

    img {
      width: 100%;
    }
  }
`;

export const Option = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.sm}`};
  height: ${({ theme }) => theme.dimensions.buttons.button.minHeight};
  margin-top: ${({ theme }) => theme.spacing.xxs};
  cursor: pointer;
  background: ${({ theme, isActive }) =>
    isActive ? theme.colors.background.button : "transparent"};
  transition: ${({ theme }) => theme.transitions.ultraFast};
  outline: none;

  p {
    margin-left: ${({ theme }) => theme.spacing.sm};
    text-wrap: nowrap;
  }

  i,
  p {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.background.button};
  }
`;

export const Middle = styled.div<{ showFull: boolean }>`
  section {
    margin-top: ${({ theme }) => theme.spacing.xxl};

    h2 {
      margin-left: ${({ theme }) => theme.spacing.sm};
      margin-bottom: ${({ theme }) => theme.spacing.xs};
      color: ${({ theme, showFull }) =>
        showFull ? theme.colors.text.primary : "transparent"};
      transition: ${({ theme }) => theme.transitions.slow};
    }
  }
`;
