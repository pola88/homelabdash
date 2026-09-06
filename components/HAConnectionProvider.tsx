"use client";

import { useEffect } from "react";
import { useUpdateEntity } from "@/store/entities";
import type { EntityState } from "@/lib/schemas/entity-state-schema";

type HAConnectionProviderProps = {
  children: React.ReactNode;
};

export function HAConnectionProvider({ children }: HAConnectionProviderProps) {
  const updateEntity = useUpdateEntity();

  useEffect(() => {
    const eventSource = new EventSource("/api/ha-events");

    eventSource.onmessage = (event) => {
      console.log("event.data", JSON.parse(event.data));
      const { entity_id, state } = JSON.parse(event.data);
      const entity: EntityState = {
        entity_id,
        state,
      };
      updateEntity(entity);
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, [updateEntity]);

  return children;
}
