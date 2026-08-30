import fs from "fs";
import path from "path";
import { load } from "js-yaml";
import { dashboardConfigSchema } from "./schemas/dashboard-schema";
import type { DashboardConfig } from "./schemas/dashboard-schema";

let cachedConfig: DashboardConfig | null = null;

export function getDashboardConfig() {
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

  cachedConfig = result.data;
  return cachedConfig;
}
