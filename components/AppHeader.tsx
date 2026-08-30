"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import type { Area } from "@/lib/schemas/dashboard-schema";
import {
  TabNavigation,
  TabNavigationLink,
} from "@/components/tremor/TabNavigation";
import { Button } from "./tremor/Button";
import { cx } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type AppHeaderProps = {
  areas: Pick<Area, "id" | "name">[];
};

const pill = (active: boolean) =>
  active
    ? "bg-accent text-white"
    : "bg-surface text-ink hover:bg-accent-200 dark:hover:bg-accent-800";

export const AppHeader = ({ areas }: AppHeaderProps) => {
  const { theme, toggle } = useTheme();
  const searchParams = useSearchParams();
  const currentArea = searchParams.get("area") ?? areas[0].id;

  const away = false;

  return (
    <header className="bg-ground border-divider sticky top-0 z-20 border-b px-4 pt-3.5 sm:px-6 lg:px-7">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-3">
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
        </div>
        <Button
          onClick={toggle}
          aria-label={theme === "dark" ? "Light theme" : "Dark theme"}
          className="bg-surface hover:bg-accent-200 dark:hover:bg-accent-800 grid h-10 w-10 shrink-0 place-items-center rounded-full"
        >
          {theme === "dark" ? (
            <Sun size={20} strokeWidth={2.75} />
          ) : (
            <Moon size={20} strokeWidth={2.75} />
          )}
        </Button>
      </div>
      {areas && (
        <div className="pb-3">
          <TabNavigation className="bg-surface rounded-pill mt-3 flex w-min items-center gap-2 overflow-x-auto p-1">
            {areas.map((area) => (
              <TabNavigationLink
                className={cx(
                  "organic-pill px-4.4 min-h-[42px] pb-0 text-[15px] text-white!",
                  pill(area.id === currentArea),
                )}
                key={area.id}
                href={`?area=${area.id}`}
              >
                {area.name}
              </TabNavigationLink>
            ))}
          </TabNavigation>
        </div>
      )}
    </header>
  );
};
