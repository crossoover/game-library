import type { FC } from "react";
import { StyledTypography } from "./styles";
import type { TypographyVariant, TypographySize, TypographyWeight } from "./styles";
import type { ReactNode } from "react";

export type TypographyProps = {
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  children: ReactNode;
};

export type { TypographyVariant, TypographySize, TypographyWeight };


export const Typography: FC<TypographyProps> = ({
  variant = "span",
  size,
  weight,
  children,
  ...props
}) => {
  return (
    <StyledTypography
      as={variant}
      $variant={variant}
      $size={size}
      $weight={weight}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};
