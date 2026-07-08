import { useRef, useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function useControls() {
  const { appState, handlePaste, loadVideoUrl, getRandomComment, cycleThemeMode, clearInvalidURL, clearData } = useContext(AppContext);
  const { videoComments, selectedComment, videoId, themeMode, status, invalidURL } = appState;
  const isLoading = status === "loading";

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const commentLoaded = Object.keys(selectedComment).length > 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (videoId) {
      setInputValue("");
      inputRef.current?.focus();
    }
  }, [videoId]);

  const handleInputChange = (event) => {
    if (invalidURL) {
      clearInvalidURL();
    }
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    loadVideoUrl(inputValue.trim());
  };

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
    inputValue,
    handleInputChange,
    handlePaste,
    handleSubmit,
    getRandomComment,
    cycleThemeMode,
    clearData,
    videoComments,
    themeMode,
    isLoading,
    videoId,
  };
}
