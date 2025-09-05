"use client";

import * as React from 'react';

export function OmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 10v0c-4.4 0-8 3.6-8 8v0c0 4.4 3.6 8 8 8s8-3.6 8-8-3.6-8-8-8zm0 0c-4.4 0-8-3.6-8-8v0c0-4.4 3.6-8 8-8s8 3.6 8 8v8" />
        <path d="M12 12v0c-4.4 0-8 3.6-8 8v0" />
        <path d="M12 2v10" />
        <path d="m3.5 3.5 2 2" />
        <path d="M21 12V2h-5" />
    </svg>
  );
}
