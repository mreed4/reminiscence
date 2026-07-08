import useControls from "../hooks/useControls";

export default function Controls() {
  const {
    inputRef,
    inputValue,
    handleInputChange,
    handlePaste,
    handleSubmit,
    getRandomComment,
    cycleThemeMode,
    videoComments,
    themeMode,
    isLoading,
  } = useControls();

  const themeIconMap = {
    auto: "brightness_auto",
    dark: "dark_mode",
    light: "light_mode",
  };

  const themeIcon = themeIconMap[themeMode] || themeIconMap.light;

  return (
    <form className="controls" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="YouTube URL"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onPaste={handlePaste}
        disabled={isLoading}
      />
      {/* <button type="submit" disabled={!inputValue.trim() || isLoading} className="submit-button" aria-label="Load comments">
        Load
      </button> */}
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
    </form>
  );
}
