import styled from "styled-components";

export const Grid = styled.div`
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