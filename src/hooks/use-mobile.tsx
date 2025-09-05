"use client"

import * as React from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches
      setIsMobile(isMobileDevice)
    }

    checkIsMobile()

    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return isMobile
}
