import type { FC } from "react";
import { Typography } from "../ui/Typography";
import logo from "../../assets/logo.png";
import {
  OfflineContainer,
  OfflineContent,
  LogoContainer,
  Logo,
  TextContainer,
  ActionContainer,
  RetryButton,
} from "./styles";

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

