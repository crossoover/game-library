import type { ButtonHTMLAttributes, FC } from "react";
import { Button } from "./styles";

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

