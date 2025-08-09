import styled, { keyframes } from "styled-components";

export const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export const OfflineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  width: 100%;
  background: ${({ theme }) => theme.colors.background.screen};
`;

export const OfflineContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  position: relative;
`;

export const LogoContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Logo = styled.img`
  height: 120px;
  object-fit: contain;
  animation: ${float} 3s ease-in-out infinite;
`;

export const TextContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text.primary};
    max-width: 480px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const RetryButton = styled.div`
  background: ${({ theme }) => theme.colors.background.button};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  border: 2px solid transparent;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.text.active};
    transform: ${({ theme }) => theme.transforms.smallUpScale};
    outline: none;
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.text.active};
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }
`;