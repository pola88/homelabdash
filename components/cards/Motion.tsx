"use client";

import { useEntity } from "@/store/entities";
import { BaseCard } from "@/components/cards/Base";
import { Icon } from "@/components/cards/Icon";
import { Label } from "@/components/tremor/Label";
import { Radio } from "lucide-react";
import { cx } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

type MotionProps = {
  entityId: string;
  label?: string;
  asChild?: boolean;
};

type MotionSkeletonProps = {
  asChild?: boolean;
};

export const Motion = ({ entityId, label, asChild }: MotionProps) => {
  const currentState = useEntity(entityId);

  if (!currentState) {
    return <MotionSkeleton asChild={asChild} />;
  }

  const detected = currentState?.state === "on";

  return (
    <BaseCard asChild={asChild}>
      <Icon className={cx({ "text-accent-700": detected })}>
        <Radio />
      </Icon>
      <div className="flex flex-col">
        <Label className="text-base">
          {label ?? currentState?.attributes?.friendly_name}
        </Label>
        <span className="text-xs opacity-60">
          Last activity at {formatDistanceToNow(currentState.last_changed)}
        </span>
      </div>

      <div className="ml-auto">{detected ? "Detected" : "Clear"}</div>
    </BaseCard>
  );
};

const MotionSkeleton = ({ asChild }: MotionSkeletonProps) => (
  <BaseCard className="animate-pulse" asChild={asChild}>
    <div className="rounded-pill h-9 w-9 shrink-0 bg-gray-200 dark:bg-gray-800" />

    <div className="h-7.5 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
    <div className="ml-auto h-7.5 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
  </BaseCard>
);
