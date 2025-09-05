"use client";

import { VasaviMaathaIcon } from "@/components/icons/vasavi-maatha-icon";

export default function BackgroundWatermark() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <VasaviMaathaIcon className="h-[80vmin] w-[80vmin] text-foreground/5 opacity-50" />
      </div>
    </div>
  );
}
