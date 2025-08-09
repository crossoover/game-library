import styled, { keyframes } from "styled-components";
import type { FC } from "react";
import { Typography } from "../ui/Typography";
import logo from "../../assets/logo.png";

export const OfflineState: FC = () => {
  return (
    <OfflineContainer
      role="alert"
      aria-live="assertive"
      aria-label="You are currently offline"
    >
      <OfflineContent>
        <LogoContainer>
          <Logo src={logo} alt="PlayLink logo" role="img" />
        </LogoContainer>
        <TextContainer>
          <Typography variant="h1" size="2xl" weight="bold">
            You're offline
          </Typography>
          <Typography variant="h2" size="lg" weight="medium">
            No internet connection detected
          </Typography>
          <Typography variant="p" size="base">
            Please check your internet connection and try again. We'll be here
            waiting with all your favorite games when you get back online!
          </Typography>
        </TextContainer>

        <ActionContainer>
          <RetryButton
            onClick={() => window.location.reload()}
            tabIndex={0}
            role="button"
            aria-label="Retry connection"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.location.reload();
              }
            }}
          >
            <Typography variant="span" size="base" weight="medium">
              Try again
            </Typography>
          </RetryButton>
        </ActionContainer>
      </OfflineContent>
    </OfflineContainer>
  );
};

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const OfflineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  width: 100%;
  background: ${({ theme }) => theme.colors.background.screen};
`;

const OfflineContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  position: relative;
`;

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Logo = styled.img`
  height: 120px;
  object-fit: contain;
  animation: ${float} 3s ease-in-out infinite;
`;

const TextContainer = styled.div`
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

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const RetryButton = styled.div`
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
