import { createContext } from "react";

import useThemeMode from "../hooks/useThemeMode";
import useYouTubeData from "../hooks/useYouTubeData";

const AppContext = createContext();

function AppProvider({ children }) {
  const [themeMode, cycleThemeMode] = useThemeMode();
  const { appState: youTubeState, selectedComment, handlePaste, getRandomComment, commentLoaded } = useYouTubeData();

  const appState = { ...youTubeState, themeMode, selectedComment };

  const value = {
    appState,
    handlePaste,
    getRandomComment,
    cycleThemeMode,
    commentLoaded,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
