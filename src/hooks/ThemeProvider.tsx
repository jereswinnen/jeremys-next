"use client";

import { useEffect } from "react";

export default function ThemeProvider({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme?: string;
}) {
  useEffect(() => {
    console.log("Applying theme:", theme); // Debug log
    if (theme) {
      document.body.classList.add(theme);
    }

    return () => {
      console.log("Removing theme:", theme); // Debug log
      if (theme) {
        document.body.classList.remove(theme);
      }
    };
  }, [theme]);

  return <>{children}</>;
}
