import { z } from "zod";

export const entityStateSchema = z.object({
  entity_id: z.string(),
  state: z.string(),
  attributes: z.record(z.string(), z.any()),
  last_changed: z.string().datetime({ offset: true }).pipe(z.coerce.date()),
  last_reported: z.string().datetime({ offset: true }).pipe(z.coerce.date()),
  last_updated: z.string().datetime({ offset: true }).pipe(z.coerce.date()),
  context: z.object({
    id: z.string(),
    parent_id: z.string().nullable(),
    user_id: z.string().nullable(),
  }),
});

export type EntityState = z.infer<typeof entityStateSchema>;
