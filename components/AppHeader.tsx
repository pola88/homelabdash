"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export const AppHeader = () => {
  const { theme, toggle } = useTheme();
  const away = false;

  return (
    <header className="bg-ground sticky top-0 z-20 pt-3.5">
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 sm:px-6 lg:px-7">
        <span className="font-heading text-[21px] leading-tight sm:text-[26px]">
          Casa
        </span>
        <span className="rounded-pill bg-surface mr-auto flex min-w-0 items-center gap-2 px-3.5 py-[7px] text-[13px] font-semibold">
          <span
            className={
              "h-[9px] w-[9px] shrink-0 rounded-full " +
              (away ? "bg-accent" : "bg-accent2")
            }
          />
          <span className="truncate">
            {away ? "Casa vacía · alarma activa" : "Todo en orden"}
          </span>
        </span>
        <button
          onClick={toggle}
          aria-label={theme === "dark" ? "Modo claro" : "Modo oscuro"}
          className="bg-surface hover:bg-accent-200 dark:hover:bg-accent-800 grid h-10 w-10 shrink-0 place-items-center rounded-full"
        >
          {theme === "dark" ? (
            <Sun size={20} strokeWidth={2.75} />
          ) : (
            <Moon size={20} strokeWidth={2.75} />
          )}
        </button>
      </div>
    </header>
  );
};
