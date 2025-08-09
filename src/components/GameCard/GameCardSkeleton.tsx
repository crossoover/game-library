import styled, { keyframes } from "styled-components";
import type { FC } from "react";

export const GameCardSkeleton: FC = () => {
  return (
    <SkeletonCard 
      role="presentation" 
      aria-label="Loading game information"
      aria-hidden="true"
    >
      <SkeletonImageContainer>
        <SkeletonImage />
        <SkeletonOverlay>
          <SkeletonTitle />
          <SkeletonProvider />
        </SkeletonOverlay>
        <SkeletonTags>
          <SkeletonTag />
          <SkeletonTag />
        </SkeletonTags>
      </SkeletonImageContainer>
    </SkeletonCard>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  height: 200px;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background.input};
`;

const SkeletonImageContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.input} 0%,
    ${({ theme }) => theme.colors.background.button}40 50%,
    ${({ theme }) => theme.colors.background.input} 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

const SkeletonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.6), transparent);
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.lg}`};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SkeletonTitle = styled.div`
  height: 20px;
  width: 70%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.button}40 0%,
    ${({ theme }) => theme.colors.background.button}80 50%,
    ${({ theme }) => theme.colors.background.button}40 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SkeletonProvider = styled.div`
  height: 16px;
  width: 50%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.button}40 0%,
    ${({ theme }) => theme.colors.background.button}80 50%,
    ${({ theme }) => theme.colors.background.button}40 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const SkeletonTags = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SkeletonTag = styled.div`
  height: 20px;
  width: 40px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.button}60 0%,
    ${({ theme }) => theme.colors.background.button}80 50%,
    ${({ theme }) => theme.colors.background.button}60 100%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;
