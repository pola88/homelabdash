import fs from "fs";
import path from "path";
import { load } from "js-yaml";
import { dashboardConfigSchema } from "./schemas/dashboard-schema";
import type { Area } from "./schemas/dashboard-schema";

type CachedConfig = {
  [id: string]: Area;
} | null;

let cachedConfig: CachedConfig = null;

export function getDashboardConfig(): CachedConfig {
  if (cachedConfig) return cachedConfig;

  const filePath = path.join(process.cwd(), "config", "dashboard.yaml");
  const raw = fs.readFileSync(filePath, "utf8");
  if (!raw) {
    throw new Error("Empty dashboard.yaml file");
  }
  const parsed = load(raw);

  const result = dashboardConfigSchema.safeParse(parsed);
  if (!result.success) {
    console.error(result.error.format());
    throw new Error("Invalid dashboard.yaml");
  }
  cachedConfig = {};
  for (const area of result.data.areas) {
    cachedConfig[area.id] = area;
  }

  return cachedConfig;
}

export function getAreas(): Area[] {
  const dashboardConfig = getDashboardConfig();
  return Object.values(dashboardConfig ?? {});
}

export function getAreaById(areaId: string): Area | null {
  const dashboardConfig = getDashboardConfig();
  return dashboardConfig?.[areaId] ?? null;
}
