import styled from "styled-components";
import type { FC } from "react";
import { Typography } from "../ui/Typography";
import logo from "../../assets/logo.png";

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

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  width: 100%;
`;

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  position: relative;
`;

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Logo = styled.img`
  height: 80px;
  position: relative;
  z-index: 2;
  object-fit: contain;
`;

const TextContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    line-height: 1.6;
    opacity: 0.8;
  }
`;
