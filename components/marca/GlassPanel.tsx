import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export default function GlassPanel({
  children,
  className,
  as: Tag = "div",
}: GlassPanelProps) {
  return <Tag className={cn("glass-panel", className)}>{children}</Tag>;
}
