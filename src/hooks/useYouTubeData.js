import { useReducer } from "react";

import { youtubeParser } from "../utils/helpers";
import { fetchVideoTitle, fetchVideoComments } from "../services/youtubeService";

const initialYouTubeState = {
  videoId: "",
  videoTitle: "",
  videoComments: [],
  selectedCommentIndex: null,
  invalidURL: false,
  errorMessage: "",
  status: "idle",
};

function reducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        videoId: action.payload,
        invalidURL: false,
        errorMessage: "",
        status: "loading",
        videoComments: [],
        selectedCommentIndex: null,
      };
    case "SET_INVALID_URL":
      return {
        ...state,
        invalidURL: true,
        errorMessage: "",
        videoId: "",
        videoTitle: "",
        videoComments: [],
        selectedCommentIndex: null,
        status: "idle",
      };
    case "SET_VIDEO_TITLE":
      return {
        ...state,
        videoTitle: action.payload,
      };
    case "SET_VIDEO_COMMENTS":
      return {
        ...state,
        videoComments: action.payload,
      };
    case "SET_SELECTED_COMMENT_INDEX":
      return {
        ...state,
        selectedCommentIndex: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        status: "error",
        errorMessage: action.payload,
        invalidURL: false,
        videoId: "",
        videoTitle: "",
        videoComments: [],
        selectedCommentIndex: null,
      };
    case "CLEAR_INVALID_URL":
      return {
        ...state,
        invalidURL: false,
        errorMessage: "",
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "CLEAR":
      return {
        ...initialYouTubeState,
      };
    default:
      return state;
  }
}

export default function useYouTubeData() {
  const [appState, dispatch] = useReducer(reducer, initialYouTubeState);

  const selectedComment = appState.selectedCommentIndex !== null ? appState.videoComments[appState.selectedCommentIndex] : {};

  const commentLoaded = Object.keys(selectedComment).length > 0;

  const handleFetchError = (message) => {
    dispatch({ type: "SET_ERROR", payload: message });
  };

  const getRandomComment = (comments) => {
    if (!Array.isArray(comments) || !comments.length) {
      dispatch({ type: "SET_SELECTED_COMMENT_INDEX", payload: null });
      return;
    }

    const rand = Math.floor(Math.random() * comments.length);
    dispatch({ type: "SET_SELECTED_COMMENT_INDEX", payload: rand });
  };

  const getVideoTitle = async (videoId) => {
    try {
      const { data: titleData } = await fetchVideoTitle(videoId);
      const videoTitle = titleData?.items?.[0]?.snippet?.title ?? "";

      dispatch({ type: "SET_VIDEO_TITLE", payload: videoTitle });
    } catch (error) {
      handleFetchError(error.name === "AbortError" ? "Request timed out. Check Netlify Dev." : "Video title fetch failed.");
    }
  };

  const getVideoComments = async (videoId) => {
    try {
      const { response, data: commentsData } = await fetchVideoComments(videoId);

      if (!response.ok || commentsData.error || !Array.isArray(commentsData.items)) {
        handleFetchError("Comments could not be loaded. Check Netlify Dev or your API key.");
        return;
      }

      const videoComments = commentsData.items.filter((item) => {
        const text = item.snippet?.topLevelComment?.snippet?.textDisplay ?? "";
        const lineBreak = text.includes("<br />") || text.includes("<br>");

        return !lineBreak;
      });

      dispatch({ type: "SET_VIDEO_COMMENTS", payload: videoComments });
      dispatch({ type: "SET_STATUS", payload: "success" });
      getRandomComment(videoComments);
    } catch (error) {
      handleFetchError(error.name === "AbortError" ? "Netlify request timed out." : "Comments fetch failed.");
    }
  };

  const loadVideoUrl = (videoURL) => {
    const videoId = youtubeParser(videoURL);

    if (!videoId) {
      dispatch({ type: "SET_INVALID_URL" });
      return;
    }

    dispatch({ type: "START_LOADING", payload: videoId });

    getVideoTitle(videoId);
    getVideoComments(videoId);
  };

  const handlePaste = (event) => {
    const videoURL = event.clipboardData.getData("text");
    loadVideoUrl(videoURL);
  };

  const clearInvalidURL = () => {
    dispatch({ type: "CLEAR_INVALID_URL" });
  };

  const clearData = () => {
    dispatch({ type: "CLEAR" });
  };

  return {
    appState,
    selectedComment,
    handlePaste,
    loadVideoUrl,
    getRandomComment,
    clearInvalidURL,
    clearData,
    commentLoaded,
  };
}
