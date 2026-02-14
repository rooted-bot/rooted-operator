"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "next-themes";
import { ReactNode, useMemo } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      // Return a dummy client for build time
      return new ConvexReactClient("https://dummy.convex.site");
    }
    return new ConvexReactClient(url);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme="dark"
    >
      <ConvexProvider client={convex}>{children}</ConvexProvider>
    </ThemeProvider>
  );
}
