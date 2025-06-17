"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { BaseButton } from "../(bases)/base-button";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <BaseButton
      onClick={handleToggleTheme}
      variant="ghost"
      size="icon"
      aria-label="Configurações"
      className="text-muted-foreground hover:text-white mr-4 w-8 flex items-center justify-center"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-muted-foreground" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-muted-foreground" />
      <span className="sr-only">Alternar tema</span>
    </BaseButton>
  );
};
