import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import useControls from "../hooks/useControls";

export default function Controls({ onHelp }) {
  const { toggleFavoritesOpen } = useContext(AppContext);
  const { getRandomComment, clearData, cycleThemeMode, videoComments, themeMode, isLoading, videoId } = useControls();

  const themeIconMap = {
    auto: "brightness_auto",
    dark: "dark_mode",
    light: "light_mode",
  };

  const themeIcon = themeIconMap[themeMode] || themeIconMap.light;

  return (
    <div className="controls">
      <button
        onClick={() => clearData()}
        disabled={isLoading || !videoId}
        type="button"
        className="clear-button"
        aria-label="Clear comments and video">
        <span className="material-icons">clear</span>
      </button>
      <button
        onClick={() => getRandomComment(videoComments)}
        disabled={!videoComments.length || isLoading}
        type="button"
        className="refresh-button"
        aria-label="Randomize comment">
        <span className="material-icons">autorenew</span>
      </button>
      <button onClick={cycleThemeMode} type="button" className={`theme-toggle ${themeMode}`} aria-label="Toggle theme mode">
        <span className="material-icons">{themeIcon}</span>
      </button>
      <button type="button" className="help-button" onClick={onHelp} aria-label="Open help modal">
        <span className="material-icons">help_outline</span>
      </button>
      <button type="button" className="favorites-button" onClick={toggleFavoritesOpen} aria-label="View favorites">
        <span className="material-icons">favorite</span>
      </button>
    </div>
  );
}
