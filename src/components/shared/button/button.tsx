import clsx from "clsx";
import type { ReactNode } from "react";
import css from "./Button.module.css";

type ButtonTheme = "primary" | "secondary";

type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  theme?: ButtonTheme;
  size?: "m" | "s";
  type?: "submit";
  disabled?: boolean;
};

export function Button({
  onClick,
  children,
  size = "m",
  theme = "primary",
  disabled,
  type,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        css.root,
        css[`root_size_${size}`],
        css[`root_theme_${theme}`],
        disabled && css.root_disabled
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
