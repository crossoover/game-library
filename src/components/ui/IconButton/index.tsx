import styled from "styled-components";
import type { ButtonHTMLAttributes, FC } from "react";
import { FlexAlignCenterJustifyCenter } from "../../../styles/global";

type IconButtonProps = {
  iconClassName: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton: FC<IconButtonProps> = ({
  iconClassName,
  ...props
}) => {
  return (
    <Button {...props}>
      <i className={`pi ${iconClassName}`} />
    </Button>
  );
};

const Button = styled.button`
  ${FlexAlignCenterJustifyCenter}
  padding: ${({ theme }) => theme.spacing.sm};
  width: ${({ theme }) => theme.dimensions.buttons.iconButton.width};
  height: ${({ theme }) => theme.dimensions.buttons.iconButton.width};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  border: none;
  background: transparent;
  transition: ${({ theme }) => theme.transitions.fast};
  border: none;
  outline: none;

  i {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    color: ${({ theme }) => theme.colors.text.primary};
    transition: ${({ theme }) => theme.transitions.fast};
  }

  &:focus,
  &:hover {
    transform: ${({ theme }) => theme.transforms.regularUpScale};

    i {
      color: ${({ theme }) => theme.colors.text.active};
    }
  }
`;
