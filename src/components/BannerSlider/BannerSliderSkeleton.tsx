import styled, { keyframes } from "styled-components";
import type { FC } from "react";

export const BannerSliderSkeleton: FC = () => {
  return (
    <SkeletonContainer
      role="presentation"
      aria-label="Loading banner images"
      aria-hidden="true"
    >
      <SkeletonBanner />
    </SkeletonContainer>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    background-position: calc(1000px + 100%) 0;
    opacity: 0.3;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.02);
  }
`;

const SkeletonContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  position: relative;
  aspect-ratio: 3 / 1;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.skeleton} 0%,
    ${({ theme }) => theme.colors.background.button}20 25%,
    ${({ theme }) => theme.colors.background.skeleton} 50%,
    ${({ theme }) => theme.colors.background.button}15 75%,
    ${({ theme }) => theme.colors.background.skeleton} 100%
  );
  animation: ${pulse} 3s ease-in-out infinite;
  box-shadow: ${({ theme }) => theme.boxShadows.skeleton.inset};
`;

const SkeletonBanner = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    110deg,
    transparent 0%,
    transparent 40%,
    ${({ theme }) => theme.colors.text.skeleton.primary} 50%,
    ${({ theme }) => theme.colors.text.skeleton.senary} 55%,
    ${({ theme }) => theme.colors.text.skeleton.primary} 60%,
    transparent 70%,
    transparent 100%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 2.5s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;
