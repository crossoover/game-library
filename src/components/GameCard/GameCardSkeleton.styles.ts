import styled, { keyframes } from "styled-components";

export const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
    opacity: 0.4;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    background-position: calc(1000px + 100%) 0;
    opacity: 0.4;
  }
`;

export const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: translateY(0px);
  }
  50% {
    opacity: 0.7;
    transform: translateY(-2px);
  }
`;

export const glow = keyframes`
  0%, 100% {
    box-shadow: ${({ theme }) => theme.boxShadows.skeleton.glowStart};
  }
  50% {
    box-shadow: ${({ theme }) => theme.boxShadows.skeleton.glowEnd};
  }
`;

export const SkeletonCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  height: 200px;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.background.skeleton} 0%,
    ${({ theme }) => theme.colors.background.button}25 30%,
    ${({ theme }) => theme.colors.background.skeleton} 60%,
    ${({ theme }) => theme.colors.background.button}20 100%
  );
  animation: ${pulse} 2.5s ease-in-out infinite, ${glow} 4s ease-in-out infinite;
  transition: all 0.3s ease;
`;

export const SkeletonImageContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent 0%,
    transparent 35%,
    ${({ theme }) => theme.colors.text.skeleton.tertiary} 45%,
    ${({ theme }) => theme.colors.text.skeleton.quaternary} 50%,
    ${({ theme }) => theme.colors.text.skeleton.tertiary} 55%,
    transparent 65%,
    transparent 100%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 3s ease-in-out infinite;
`;

export const SkeletonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(${({ theme }) => theme.colors.text.skeleton.overlay}, transparent);
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.lg}`};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const SkeletonTitle = styled.div`
  height: 20px;
  width: 70%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.text.skeleton.primary} 0%,
    ${({ theme }) => theme.colors.text.skeleton.secondary} 50%,
    ${({ theme }) => theme.colors.text.skeleton.primary} 100%
  );
  background-size: 300% 100%;
  animation: ${shimmer} 2.8s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  backdrop-filter: blur(1px);
`;

export const SkeletonProvider = styled.div`
  height: 16px;
  width: 50%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.text.skeleton.tertiary} 0%,
    ${({ theme }) => theme.colors.text.skeleton.senary} 50%,
    ${({ theme }) => theme.colors.text.skeleton.tertiary} 100%
  );
  background-size: 300% 100%;
  animation: ${shimmer} 3.2s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  backdrop-filter: blur(1px);
`;

export const SkeletonTags = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.sm};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const SkeletonTag = styled.div`
  height: 20px;
  width: 40px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.text.skeleton.quinary} 0%,
    ${({ theme }) => theme.colors.text.skeleton.quaternary} 50%,
    ${({ theme }) => theme.colors.text.skeleton.quinary} 100%
  );
  background-size: 250% 100%;
  animation: ${shimmer} 2.2s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  backdrop-filter: blur(1px);
  
  &:nth-child(2) {
    animation-delay: 0.3s;
  }
`;