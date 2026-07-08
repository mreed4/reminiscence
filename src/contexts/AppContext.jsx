import { createContext, useEffect, useState } from "react";

import { youtubeParser } from "../utils/helpers";

const netlify = "/.netlify/functions";

const AppContext = createContext();

const initialAppState = {
  videoId: "",
  videoTitle: "",
  videoComments: [],
  randomComment: {},
  invalidURL: false,
  commentError: false,
  isLoading: false,
  themeMode: "auto",
};

function AppProvider({ children }) {
  const [appState, setAppState] = useState(() => {
    const storedMode = typeof window !== "undefined" ? localStorage.getItem("themeMode") : null;
    return {
      ...initialAppState,
      themeMode: storedMode === "light" || storedMode === "dark" || storedMode === "auto" ? storedMode : "auto",
    };
  });
  const { randomComment, themeMode } = appState;

  const commentLoaded = Object.keys(randomComment).length > 0;

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const handlePaste = (event) => {
    const videoURL = event.clipboardData.getData("text");
    const videoId = youtubeParser(videoURL);

    if (videoId) {
      setAppState((prev) => ({
        ...prev,
        videoId,
        invalidURL: false,
        commentError: false,
        errorMessage: "",
        isLoading: true,
      }));
      getVideoTitle(videoId);

      setAppState((prev) => ({ ...prev, videoComments: [], randomComment: {} }));
      getVideoComments(videoId);
    } else {
      setAppState((prev) => ({
        ...prev,
        invalidURL: true,
        commentError: false,
        errorMessage: "",
        videoId: "",
        videoTitle: "",
        videoComments: [],
        randomComment: {},
        isLoading: false,
      }));
    }
  };

  const fetchWithTimeout = async (url, timeout = 8000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  async function getVideoTitle(videoId) {
    try {
      const response = await fetchWithTimeout(`${netlify}/getVideoTitle?videoId=${videoId}`);
      const titleData = await response.json();

      const videoTitle = titleData?.items?.[0]?.snippet?.title ?? "";
      setAppState((prev) => ({ ...prev, videoTitle }));
    } catch (error) {
      setAppState((prev) => ({
        ...prev,
        commentError: true,
        errorMessage: error.name === "AbortError" ? "Request timed out. Check Netlify Dev." : "Video title fetch failed.",
        invalidURL: false,
        isLoading: false,
      }));
    }
  }

  async function getVideoComments(videoId) {
    try {
      const response = await fetchWithTimeout(`${netlify}/getVideoComments?videoId=${videoId}`);
      const commentsData = await response.json();

      if (!response.ok || commentsData.error || !Array.isArray(commentsData.items)) {
        setAppState((prev) => ({
          ...prev,
          commentError: true,
          errorMessage: "Comments could not be loaded. Check Netlify Dev or your API key.",
          invalidURL: false,
          videoId: "",
          videoTitle: "",
          videoComments: [],
          randomComment: {},
          isLoading: false,
        }));
        return;
      }

      const videoComments = commentsData.items.filter((item) => {
        const text = item.snippet?.topLevelComment?.snippet?.textDisplay ?? "";
        const lineBreak = text.includes("<br />") || text.includes("<br>");

        return !lineBreak;
      });

      setAppState((prev) => ({ ...prev, videoComments, isLoading: false }));
      getRandomComment(videoComments);
    } catch (error) {
      setAppState((prev) => ({
        ...prev,
        commentError: true,
        errorMessage: error.name === "AbortError" ? "Netlify request timed out." : "Comments fetch failed.",
        invalidURL: false,
        videoId: "",
        videoTitle: "",
        videoComments: [],
        randomComment: {},
        isLoading: false,
      }));
    }
  }

  function getRandomComment(comments) {
    const rand = Math.floor(Math.random() * comments.length);
    const randomComment = comments[rand];

    setAppState((prev) => ({ ...prev, randomComment }));
  }

  const cycleThemeMode = () => {
    setAppState((prev) => {
      const nextMode = prev.themeMode === "auto" ? "dark" : prev.themeMode === "dark" ? "light" : "auto";
      return { ...prev, themeMode: nextMode };
    });
  };

  const value = {
    appState,
    setAppState,
    handlePaste,
    getVideoTitle,
    getVideoComments,
    getRandomComment,
    cycleThemeMode,
    commentLoaded,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
