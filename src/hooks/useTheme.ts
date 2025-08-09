import { useState, useEffect } from "react";
import { lightTheme, darkTheme } from "../styles/theme";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const themeConfig = theme === "light" ? lightTheme : darkTheme;

  return {
    theme,
    themeConfig,
    toggleTheme,
    setTheme,
  };
};
