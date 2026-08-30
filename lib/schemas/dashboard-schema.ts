import { z } from "zod";

const entityId = z
  .string()
  .min(1, "entity_id can not be empty")
  .regex(
    /^[a-z_]+\.[a-z0-9_]+$/,
    "entity_id must be like domain.name (ex: light.kitchen)",
  );

const lightCardSchema = z.object({
  type: z.literal("light"),
  entity: entityId,
  label: z.string().optional(),
});

const motionCardSchema = z.object({
  type: z.literal("motion"),
  entity: entityId,
  label: z.string().optional(),
});

const climateCardSchema = z.object({
  type: z.literal("climate"),
  temperature_entity: entityId,
  humidity_entity: entityId.optional(),
  label: z.string().optional(),
});

const metricCardSchema = z.object({
  type: z.literal("metric"),
  entity: entityId,
  label: z.string().min(1, "metric card label is required"),
  unit: z.string().optional(),

  min: z.number().optional(),
  max: z.number().optional(),
});

const switchCardSchema = z.object({
  type: z.literal("switch"),
  entity: entityId,
  label: z.string().optional(),
});

const cardSchema = z.discriminatedUnion("type", [
  lightCardSchema,
  motionCardSchema,
  climateCardSchema,
  metricCardSchema,
  switchCardSchema,
]);

const areaSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(
      /^[a-z0-9_]+$/,
      "id must be snake_case without blank spaces (ex: living_room)",
    ),
  name: z.string().min(1, "Area name is required"),
  icon: z.string().optional(), // ej: nombre de ícono lucide-react
  cards: z.array(cardSchema).min(1, "Cards can not be empty"),
});

export const dashboardConfigSchema = z.object({
  areas: z
    .array(areaSchema)
    .min(1, "dashboard.yaml needs at least an area")
    .refine((areas) => new Set(areas.map((a) => a.id)).size === areas.length, {
      message: "There are repeated ids",
    }),
});

export type DashboardConfig = z.infer<typeof dashboardConfigSchema>;
export type Area = z.infer<typeof areaSchema>;
