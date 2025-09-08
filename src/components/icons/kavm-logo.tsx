
"use client";

import * as React from 'react';

export function KAVMLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100"
      {...props}
    >
      <g transform="translate(50,50) scale(0.45)">
        <path d="M-100,90 V100 H-90 L-90,90 Z M90,90 V100 H100 L100,90 Z M-100,-90 V-100 H-90 L-90,-90 Z M90,-90 V-100 H100 L100,-90 Z" fill="currentColor"/>
        <path d="M-80-100h160v10h-160z M-80,90h160v10h-160z M-100-80h10v160h-10z M90-80h10v160h-10z" fill="currentColor"/>
        <path d="M-80-90v-5h-5v-5h-5v10h10z M80-90v-5h5v-5h5v10h-10z M-80,90v5h-5v5h-5v-10h10z M80,90v5h5v5h5v-10h-10z" fill="currentColor"/>
        <path d="M-60-100h-10v-5h-5v-5h15v10z M60-100h10v-5h5v-5h-15v10z M-60,100h-10v5h-5v5h15v-10z M60,100h10v5h5v5h-15v-10z" fill="currentColor"/>
        <path d="M-50,-105h100v-5h5v-5h-110v10z M-50,105h100v5h5v5h-110v-10z" fill="currentColor"/>
        <path d="M-105,-50v-10h-5v-5h-5v15h10z M-105,50v10h-5v5h-5v-15h10z M105,-50v-10h5v-5h5v15h-10z M105,50v10h5v5h5v-15h-10z" fill="currentColor"/>
        <path d="M-115,-40v80h-5v5h-5v-90h10z M115,-40v80h5v5h5v-90h-10z" fill="currentColor"/>

        <path d="M-80-80 L-90,-70 L-90,70 L-80,80 L80,80 L90,70 L90,-70 L80,-80 Z M-75,-70 L75,-70 L80,-65 L80,65 L75,70 L-75,70 L-80,65 L-80,-65 Z" fill="currentColor"/>

        {/* Justice Scale */}
        <g transform="translate(-40,-25) scale(0.4)">
          <path d="M-30,-20 L30,-20 L0,-50 Z" fill="none" stroke="currentColor" strokeWidth="5"/>
          <path d="M0,-20 V20" fill="none" stroke="currentColor" strokeWidth="5"/>
          <path d="M-30,-10 C-40,10 -30,20 -20,20 C-10,20 -20,10 -30,-10" stroke="currentColor" fill="none" strokeWidth="5"/>
          <path d="M30,-10 C40,10 30,20 20,20 C10,20 20,10 30,-10" stroke="currentColor" fill="none" strokeWidth="5"/>
        </g>
        
        {/* Ship */}
        <g transform="translate(40, -25) scale(0.4)">
          <path d="M-40,10 C-20,-20 20,-20 40,10 L30,30 L-30,30 Z" stroke="currentColor" fill="none" strokeWidth="5"/>
          <path d="M0,10 V-40" stroke="currentColor" fill="none" strokeWidth="5"/>
          <path d="M-20,-40 L0,-40 L-10,-50 Z" stroke="currentColor" fill="none" strokeWidth="5"/>
          <path d="M-30,20 C-20,40 20,40 30,20" stroke="currentColor" fill="none" strokeWidth="5"/>
        </g>

        {/* Rowboat */}
        <g transform="translate(0, 35) scale(0.4)">
            <path d="M-50,0 C-30,-30 30,-30 50,0 L40,15 L-40,15 Z" stroke="currentColor" fill="none" strokeWidth="5" />
            <path d="M-20,-10 C-25,-20 -15,-20 -20,-10" stroke="currentColor" fill="none" strokeWidth="5" />
            <path d="M20,-10 C25,-20 15,-20 20,-10" stroke="currentColor" fill="none" strokeWidth="5" />
            <path d="M-40,-5 L-20,-10" stroke="currentColor" fill="none" strokeWidth="5" />
            <path d="M40,-5 L20,-10" stroke="currentColor" fill="none" strokeWidth="5" />
            <path d="M-40,10 C-20,30 20,30 40,10" stroke="currentColor" fill="none" strokeWidth="5" />
        </g>
      </g>
    </svg>
  );
}
