"use client";

import { cn } from "@/lib/utils";
import * as React from 'react';

export function VasaviMaathaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      data-testid="vasavi-maatha-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
      className={cn("h-[80vmin] w-[80vmin] text-foreground/10", props.className)}
    >
      <path d="M12 20.5c-2.5 0-4.73-.9-6.33-2.58a10.5 10.5 0 0 1 0-14.84C7.27 1.4 9.5.5 12 .5s4.73.9 6.33 2.58 c.63.63 1.14 1.35 1.5 2.12h.74c.36 0 .7.07 1 .2L24 8l-2 13.5h-4l2.5-11.27c-.34-.22-.73-.42-1.13-.65a6.5 6.5 0 0 0-9.19 0 6.5 6.5 0 0 0 0 9.19 6.5 6.5 0 0 0 4.59 1l-1.5 2.25h-2.02a2.5 2.5 0 0 0-1.76.76zM8 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1zm11 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );
}
