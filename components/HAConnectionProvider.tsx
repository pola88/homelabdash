"use client";

import { useEffect } from "react";
import { useUpdateEntity } from "@/store/entities";

type HAConnectionProviderProps = {
  children: React.ReactNode;
};

export function HAConnectionProvider({ children }: HAConnectionProviderProps) {
  const updateEntity = useUpdateEntity();

  useEffect(() => {
    const eventSource = new EventSource("/api/ha-events");

    eventSource.onmessage = (event) => {
      const entity = JSON.parse(event.data);
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
