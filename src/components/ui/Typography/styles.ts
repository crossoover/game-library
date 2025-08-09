import styled, { css } from "styled-components";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

export type TypographySize =
  keyof typeof import("../../../styles/theme").darkTheme.typography.fontSizes;

export type TypographyWeight =
  keyof typeof import("../../../styles/theme").darkTheme.typography.fontWeights;

export const getVariantStyles = (variant: TypographyVariant) => {
  switch (variant) {
    case "h1":
      return css`
        font-size: ${({ theme }) => theme.typography.fontSizes["2xl"]};
        font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
      `;
    case "h2":
      return css`
        font-size: ${({ theme }) => theme.typography.fontSizes.xl};
        font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
      `;
    case "h3":
      return css`
        font-size: ${({ theme }) => theme.typography.fontSizes.lg};
        font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
      `;
    case "h4":
      return css`
        font-size: ${({ theme }) => theme.typography.fontSizes.base};
        font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
      `;
    case "h5":
      return css`
        font-size: ${({ theme }) => theme.typography.fontSizes.sm};
        font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
      `;
    case "h6":
      return css`
        font-size: ${({ theme }) => theme.typography.fontSizes.xs};
        font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
      `;
    case "p":
      return css`
        font-size: ${({ theme }) => theme.typography.fontSizes.base};
        font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
      `;
    case "span":
    default:
      return css`
        font-size: ${({ theme }) => theme.typography.fontSizes.base};
        font-weight: ${({ theme }) => theme.typography.fontWeights.normal};
      `;
  }
};

export const StyledTypography = styled.div<{
  $variant: TypographyVariant;
  $size?: TypographySize;
  $weight?: TypographyWeight;
}>`
  color: ${({ theme }) => theme.colors.text.primary};

  ${({ $variant }) => getVariantStyles($variant)}

  ${({ $size, theme }) =>
    $size &&
    css`
      font-size: ${theme.typography.fontSizes[$size]};
    `}
  
  ${({ $weight, theme }) =>
    $weight &&
    css`
      font-weight: ${theme.typography.fontWeights[$weight]};
    `}
`;