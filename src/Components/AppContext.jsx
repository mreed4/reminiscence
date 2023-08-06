import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { youtubeParser } from "../assets/js/helpers";

const netlify = "/.netlify/functions";

const AppContext = createContext();

const initialAppState = {
  videoId: "",
  videoTitle: "",
  videoComments: [],
  randomComment: {},
  invalidURL: false,
  commentError: false,
};

function AppProvider({ children }) {
  const [appState, setAppState] = useState({ ...initialAppState });
  const { randomComment } = appState;

  const commentLoaded = Object.keys(randomComment).length > 0;

  const handlePaste = (event) => {
    const videoURL = event.clipboardData.getData("text");
    const videoId = youtubeParser(videoURL);

    if (videoId) {
      setAppState((prev) => ({ ...prev, videoId, invalidURL: false, commentError: false })); // reset errors
      getVideoTitle(videoId);

      setAppState((prev) => ({ ...prev, videoComments: [], randomComment: {} })); // reset comments
      getVideoComments(videoId);
      /* */
    } else {
      setAppState((prev) => ({ ...prev, invalidURL: true, videoId: "", videoTitle: "", videoComments: [], randomComment: {} }));
    }
  };

  async function getVideoTitle(videoId) {
    const response = await fetch(`${netlify}/getVideoTitle?videoId=${videoId}`);
    const titleData = await response.json();

    const videoTitle = titleData.items[0].snippet.title;

    setAppState((prev) => ({ ...prev, videoTitle }));
  }

  async function getVideoComments(videoId) {
    const response = await fetch(`${netlify}/getVideoComments?videoId=${videoId}`);
    const commentsData = await response.json();

    if (commentsData.error) {
      setAppState((prev) => ({
        ...prev,
        commentError: true,
        invalidURL: false,
        videoId: "",
        // videoTitle: "",
        videoComments: [],
        randomComment: {},
      }));
      return;
    }

    const videoComments = commentsData.items.filter((item) => {
      const text = item.snippet.topLevelComment.snippet.textDisplay;
      const lineBreak = text.includes("<br />") || text.includes("<br>");

      return !lineBreak;
    });

    setAppState((prev) => ({ ...prev, videoComments }));

    getRandomComment(videoComments);
  }

  function getRandomComment(comments) {
    const rand = Math.floor(Math.random() * comments.length);
    const randomComment = comments[rand];

    setAppState((prev) => ({ ...prev, randomComment }));
  }

  const value = {
    appState,
    setAppState,
    handlePaste,
    getRandomComment,
    commentLoaded,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
