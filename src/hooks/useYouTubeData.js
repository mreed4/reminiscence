import { useReducer } from "react";

import { youtubeParser } from "../utils/helpers";
import { normalizeCommentText } from "../utils/commentHelpers";
import { pickNextCommentIndex } from "../utils/commentSelection";
import { fetchVideoTitle, fetchVideoComments } from "../services/youtubeService";
import youTubeReducer, { ActionTypes, initialYouTubeState } from "./youTubeReducer";

export default function useYouTubeData() {
  const [appState, dispatch] = useReducer(youTubeReducer, initialYouTubeState);

  const selectedComment = appState.selectedCommentIndex !== null ? appState.videoComments[appState.selectedCommentIndex] : {};

  const commentLoaded = Object.keys(selectedComment).length > 0;

  const handleFetchError = (message) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: message });
  };

  const getRandomComment = (comments) => {
    if (!Array.isArray(comments) || !comments.length) {
      dispatch({ type: ActionTypes.SET_SELECTED_COMMENT_INDEX, payload: null });
      return;
    }

    const chosenIndex = pickNextCommentIndex(comments.length, appState.recentCommentHistory, appState.selectedCommentIndex);

    dispatch({
      type: ActionTypes.SET_SELECTED_COMMENT_INDEX_AND_HISTORY,
      payload: chosenIndex,
    });
  };

  const getVideoTitle = async (videoId) => {
    try {
      const { data: titleData } = await fetchVideoTitle(videoId);
      const videoTitle = titleData?.items?.[0]?.snippet?.title ?? "";

      dispatch({ type: ActionTypes.SET_VIDEO_TITLE, payload: videoTitle });
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

      const videoComments = commentsData.items.map((item) => normalizeCommentText(item));

      dispatch({ type: ActionTypes.SET_VIDEO_COMMENTS, payload: videoComments });
      dispatch({ type: ActionTypes.SET_STATUS, payload: "success" });
      getRandomComment(videoComments);
    } catch (error) {
      handleFetchError(error.name === "AbortError" ? "Netlify request timed out." : "Comments fetch failed.");
    }
  };

  const loadVideoUrl = (videoURL) => {
    const videoId = youtubeParser(videoURL);

    if (!videoId) {
      dispatch({ type: ActionTypes.SET_INVALID_URL });
      return;
    }

    dispatch({ type: ActionTypes.START_LOADING, payload: videoId });
    getVideoTitle(videoId);
    getVideoComments(videoId);
  };

  const handlePaste = (event) => {
    const videoURL = event.clipboardData.getData("text");
    loadVideoUrl(videoURL);
  };

  const clearInvalidURL = () => {
    dispatch({ type: ActionTypes.CLEAR_INVALID_URL });
  };

  const clearData = () => {
    dispatch({ type: ActionTypes.CLEAR });
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
