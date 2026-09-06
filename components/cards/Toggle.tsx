"use client";

import { useEntity } from "@/store/entities";

type ToggleProps = {
  entityId: string;
  label?: string;
};

export const Toggle = ({ entityId, label }: ToggleProps) => {
  const currentState = useEntity(entityId);
  return (
    <div>
      <div>{entityId}</div>
      <div>{label}</div>
      <div>{currentState?.state}</div>
    </div>
  );
};
