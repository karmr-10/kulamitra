"use client";

import { VasaviMaathaIcon } from "@/components/icons/vasavi-maatha-icon";
import { useState, useEffect } from "react";

export default function BackgroundWatermark() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <VasaviMaathaIcon />
      </div>
    </div>
  );
}
