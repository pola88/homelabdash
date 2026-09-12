"use client";

import { useEntity } from "@/store/entities";
import { BaseCard } from "@/components/cards/Base";
import { Switch } from "@/components/tremor/Switch";
import { Label } from "@/components/tremor/Label";

type LightProps = {
  entityId: string;
  label?: string;
  asChild?: boolean;
};

type LightSkeletonProps = {
  asChild?: boolean;
};

/**
 * TODO:
 *  Use currentState.attributes.color_mode (example: "onoff") to know if it onoff or dimmer
 */

export const Light = ({ entityId, label, asChild }: LightProps) => {
  const currentState = useEntity(entityId);

  if (!currentState) {
    return <LightSkeleton asChild={asChild} />;
  }

  return (
    <BaseCard asChild={asChild}>
      <Switch checked={currentState?.state === "on"} size="large" />
      <Label className="text-base">
        {label ?? currentState?.attributes?.friendly_name}
      </Label>
      <div className="ml-auto">{currentState?.state.toUpperCase()}</div>
    </BaseCard>
  );
};

const LightSkeleton = ({ asChild }: LightSkeletonProps) => (
  <BaseCard className="animate-pulse" asChild={asChild}>
    <div className="h-7.5 w-13 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800" />

    <div className="h-7.5 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
    <div className="ml-auto h-7.5 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
  </BaseCard>
);
