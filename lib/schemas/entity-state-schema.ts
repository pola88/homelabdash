import { z } from "zod";

export const entityStateSchema = z.object({
  entity_id: z.string(),
  state: z.string(),
});

export type EntityState = z.infer<typeof entityStateSchema>;
