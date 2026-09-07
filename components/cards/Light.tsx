"use client";

import { useEntity } from "@/store/entities";
import { Card } from "@/components/tremor/Card";
import { Switch } from "@/components/tremor/Switch";
import { Label } from "@/components/tremor/Label";

type LightProps = {
  entityId: string;
  label?: string;
};

/**
 * TODO:
 *  Use currentState.attributes.color_mode (example: "onoff") to know if it onoff or dimmer
 */

export const Light = ({ entityId, label }: LightProps) => {
  const currentState = useEntity(entityId);

  if (!currentState) {
    return <LightSkeleton />;
  }

  return (
    <Card className="flex items-center gap-2">
      <Switch checked={currentState?.state === "on"} size="large" />
      <Label className="text-base">
        {label ?? currentState?.attributes?.friendly_name}
      </Label>
      <div className="ml-auto">
        {currentState?.state === "on" ? "Prendida" : "Apagada"}
      </div>
    </Card>
  );
};

const LightSkeleton = () => (
  <Card className="flex animate-pulse items-center gap-2">
    <div className="h-7.5 w-13 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800" />

    <div className="h-7.5 w-full rounded bg-gray-200 dark:bg-gray-800" />
    <div className="ml-auto h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
  </Card>
);
