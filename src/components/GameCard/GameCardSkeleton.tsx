import type { FC } from "react";
import {
  SkeletonCard,
  SkeletonImageContainer,
  SkeletonImage,
  SkeletonOverlay,
  SkeletonTitle,
  SkeletonProvider,
  SkeletonTags,
  SkeletonTag,
} from "./GameCardSkeleton.styles";

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

