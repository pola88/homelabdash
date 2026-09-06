import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import type { EntityState } from "@/lib/schemas/entity-state-schema";

type Store = {
  entities: Record<string, EntityState>;
  updateEntity: (entity: EntityState) => void;
};

export const useEntities = create<Store>()(
  immer((set) => ({
    entities: {},
    updateEntity: (entity) =>
      set((state) => {
        state.entities[entity.entity_id] = entity;
      }),
  })),
);

export const useEntity = (id: string) => useEntities((s) => s.entities[id]);
export const useUpdateEntity = () => useEntities((s) => s.updateEntity);
export const useEntityIds = () =>
  useEntities(useShallow((s) => Object.keys(s.entities)));
export const useEntitySummaries = () =>
  useEntities(useShallow((s) => Object.values(s.entities)));
