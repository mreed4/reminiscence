import { useEffect, useState } from "react";

const themeModes = ["auto", "dark", "light"];
const defaultThemeMode = "auto";

function getPersistedThemeMode() {
  if (typeof window === "undefined") {
    return defaultThemeMode;
  }

  const stored = localStorage.getItem("themeMode");
  return themeModes.includes(stored) ? stored : defaultThemeMode;
}

export default function useThemeMode() {
  const [themeMode, setThemeMode] = useState(getPersistedThemeMode);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const cycleThemeMode = () => {
    setThemeMode((prev) => (prev === "auto" ? "dark" : prev === "dark" ? "light" : "auto"));
  };

  return [themeMode, cycleThemeMode];
}
