"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { track } from "@/lib/track";

/**
 * Tracker global — fire automatically une page_view à chaque navigation.
 * Ne traque PAS les routes admin ou API.
 */
export default function Tracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string>("");

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    const key = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    if (lastTracked.current === key) return;
    lastTracked.current = key;

    track("page_view");
  }, [pathname, searchParams]);

  return null;
}
