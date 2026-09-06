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
      <div>Id: {entityId}</div>
      <div>Label: {label ?? currentState?.attributes?.friendly_name}</div>
      <div>State: {currentState?.state}</div>
    </div>
  );
};
