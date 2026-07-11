import { createContext, useState } from "react";

import useThemeMode from "../hooks/useThemeMode";
import useYouTubeData from "../hooks/useYouTubeData";
import useFavorites from "../hooks/useFavorites";

const AppContext = createContext();

function AppProvider({ children }) {
  const [themeMode, cycleThemeMode] = useThemeMode();
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const {
    appState: youTubeState,
    selectedComment,
    handlePaste,
    loadVideoUrl,
    getRandomComment,
    clearInvalidURL,
    clearData,
    commentLoaded,
  } = useYouTubeData();
  const { favorites, toggleFavorite, isFavorited, clearAllFavorites } = useFavorites();

  const toggleFavoritesOpen = () => setFavoritesOpen(!favoritesOpen);

  const appState = { ...youTubeState, themeMode, selectedComment };

  const value = {
    appState,
    handlePaste,
    loadVideoUrl,
    getRandomComment,
    clearInvalidURL,
    clearData,
    cycleThemeMode,
    commentLoaded,
    favorites,
    toggleFavorite,
    isFavorited,
    clearAllFavorites,
    favoritesOpen,
    toggleFavoritesOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
