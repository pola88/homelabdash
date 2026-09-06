import { z } from "zod";

const entityId = z
  .string()
  .min(1, "entity_id can not be empty")
  .regex(
    /^[a-z_]+\.[a-z0-9_]+$/,
    "entity_id must be like domain.name (ex: light.kitchen)",
  );

// Cards that control something can target a single entity (`entity`) or
// several at once (`entities`) — e.g. every light in a room on one toggle.
const toggleTarget = {
  entity: entityId.optional(),
  entities: z.array(entityId).min(1, "entities can not be empty").optional(),
  label: z.string().optional(),
};

const hasTarget = (c: { entity?: string; entities?: string[] }) =>
  c.entity != null || c.entities != null;

const lightCardSchema = z
  .object({ type: z.literal("light"), ...toggleTarget })
  .refine(hasTarget, { message: "light card needs 'entity' or 'entities'" });

const switchCardSchema = z
  .object({ type: z.literal("switch"), ...toggleTarget })
  .refine(hasTarget, { message: "switch card needs 'entity' or 'entities'" });

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

const leafCardSchema = z.union([
  lightCardSchema,
  motionCardSchema,
  climateCardSchema,
  metricCardSchema,
  switchCardSchema,
]);

// A container that renders other cards together under one title.
// Groups can nest; the renderer defaults `layout` to "stack".
const groupCardSchema = z.object({
  type: z.literal("group"),
  title: z.string().optional(),
  layout: z.enum(["grid", "stack"]).optional(),
  get cards(): z.ZodArray<typeof cardSchema> {
    return z.array(cardSchema).min(1, "a group needs at least one card");
  },
});

const cardSchema = z.union([leafCardSchema, groupCardSchema]);

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
export type DashboardCard = z.infer<typeof cardSchema>;
export type GroupCard = z.infer<typeof groupCardSchema>;

export type Entity = z.infer<typeof leafCardSchema>;
