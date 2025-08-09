import type { FC } from "react";
import { Typography } from "../ui/Typography";
import logo from "../../assets/logo.png";
import {
  EmptyContainer,
  EmptyContent,
  LogoContainer,
  Logo,
  TextContainer,
} from "./EmptyState.styles";

export type EmptyStateProps = {
  searchQuery?: string;
  hasActiveFilters?: boolean;
};

export const EmptyState: FC<EmptyStateProps> = ({
  searchQuery,
  hasActiveFilters,
}) => {
  const getEmptyMessage = () => {
    if (searchQuery) {
      return {
        title: "No games found",
        description: `We couldn't find any games matching "${searchQuery}". Try adjusting your search or explore our other amazing games!`,
      };
    }

    if (hasActiveFilters) {
      return {
        title: "No matches found",
        description:
          "No games match your current filters. Try adjusting your selection or clear filters to see all available games.",
      };
    }

    return {
      title: "No games available",
      description:
        "It looks like there are no games to display right now. Check back soon for exciting new additions!",
    };
  };

  const { title, description } = getEmptyMessage();

  return (
    <EmptyContainer
      role="status"
      aria-live="polite"
      aria-label="No games found"
    >
      <EmptyContent>
        <LogoContainer>
          <Logo src={logo} alt="PlayLink logo" role="img" aria-hidden="false" />
        </LogoContainer>

        <TextContainer>
          <Typography variant="h2" size="xl" weight="semibold">
            {title}
          </Typography>
          <Typography variant="p" size="base">
            {description}
          </Typography>
        </TextContainer>
      </EmptyContent>
    </EmptyContainer>
  );
};

