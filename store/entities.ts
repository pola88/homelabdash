import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

type Entity = {
  id: string;
  state: string;
};

type Store = {
  entities: Record<string, Entity>;
  updateEntity: (entity: Entity) => void;
};

export const useEntities = create<Store>()(
  immer((set) => ({
    entities: {},
    updateEntity: (entity) =>
      set((state) => {
        state.entities[entity.id] = entity;
      }),
  })),
);

export const useEntity = (id: string) => useEntities((s) => s.entities[id]);
export const useUpdateEntity = () => useEntities((s) => s.updateEntity);
export const useEntityIds = () =>
  useEntities(useShallow((s) => Object.keys(s.entities)));
export const useEntitySummaries = () =>
  useEntities(useShallow((s) => Object.values(s.entities)));
