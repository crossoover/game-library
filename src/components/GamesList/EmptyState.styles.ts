import styled from "styled-components";

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  width: 100%;
`;

export const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  position: relative;
`;

export const LogoContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Logo = styled.img`
  height: 80px;
  position: relative;
  z-index: 2;
  object-fit: contain;
`;

export const TextContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    line-height: 1.6;
    opacity: 0.8;
  }
`;