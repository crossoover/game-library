import type { FC } from "react";
import {
  SkeletonContainer,
  SkeletonBanner,
} from "./BannerSliderSkeleton.styles";

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

