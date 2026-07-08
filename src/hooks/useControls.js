import { useRef, useEffect, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function useControls() {
  const { appState, handlePaste, getRandomComment, cycleThemeMode } = useContext(AppContext);
  const { videoComments, randomComment, videoId, themeMode } = appState;

  const inputRef = useRef();
  const commentLoaded = Object.keys(randomComment).length > 0;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [videoId]);

  useEffect(() => {
    function handleSpacebar(event) {
      if (event.code === "Space") {
        getRandomComment(videoComments);
      }
    }

    if (commentLoaded) {
      inputRef.current?.blur();
      window.addEventListener("keydown", handleSpacebar);
    }

    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [commentLoaded, getRandomComment, videoComments]);

  return {
    inputRef,
    handlePaste,
    getRandomComment,
    cycleThemeMode,
    videoComments,
    themeMode,
  };
}
