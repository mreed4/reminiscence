import useControls from "../hooks/useControls";

export default function Controls() {
  const { inputRef, handlePaste, getRandomComment, cycleThemeMode, videoComments, themeMode } = useControls();

  const themeIconMap = {
    auto: "brightness_auto",
    dark: "dark_mode",
    light: "light_mode",
  };

  const themeIcon = themeIconMap[themeMode] || themeIconMap.light;

  return (
    <div className="controls">
      <input type="text" placeholder="Youtube URL" ref={inputRef} onPaste={handlePaste} />
      <button
        onClick={() => getRandomComment(videoComments)}
        disabled={!videoComments.length}
        type="button"
        className="refresh-button"
        aria-label="Randomize comment">
        <span className="material-icons">autorenew</span>
      </button>
      <button onClick={cycleThemeMode} type="button" className={`theme-toggle ${themeMode}`} aria-label="Toggle theme mode">
        <span className="material-icons">{themeIcon}</span>
      </button>
    </div>
  );
}
