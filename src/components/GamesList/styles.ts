import styled from "styled-components";

export const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const CategorySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ShowAllButton = styled.div`
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.background.button}20;
    outline: none;

    p {
      text-decoration: underline;
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.text.active};
    outline-offset: 2px;
  }
`;

export const SkeletonGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  > * {
    flex: 1 1 calc(50% - ${({ theme }) => theme.spacing.md} / 2);
    min-width: 150px;
  }

  @media (min-width: 480px) {
    > * {
      flex: 1 1 calc(33.333% - ${({ theme }) => theme.spacing.md} * 2 / 3);
      min-width: 180px;
    }
  }

  @media (min-width: 768px) {
    > * {
      flex: 1 1 calc(25% - ${({ theme }) => theme.spacing.md} * 3 / 4);
      min-width: 200px;
    }
  }

  @media (min-width: 1024px) {
    > * {
      flex: 1 1 calc(20% - ${({ theme }) => theme.spacing.md} * 4 / 5);
      min-width: 220px;
    }
  }
`;