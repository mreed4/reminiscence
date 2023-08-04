import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { youtubeParser } from "./assets/js/helpers";

const netlify = "/.netlify/functions";

const AppContext = createContext();

const initialAppState = {
  videoId: "",
  videoTitle: "",
  videoComments: [],
  randomComment: {},
  commentError: false,
};

function AppProvider({ children }) {
  const [appState, setAppState] = useState({ ...initialAppState });

  const handlePaste = (event) => {
    const videoURL = event.clipboardData.getData("text");
    const videoId = youtubeParser(videoURL);

    if (videoId) {
      setAppState((prev) => ({ ...prev, videoId, commentError: false }));
      getVideoTitle(videoId);
      getVideoComments(videoId);
    } else {
      setAppState((prev) => ({ ...prev, commentError: true, videoId: "", videoTitle: "", videoComments: [], randomComment: {} }));
    }

    // console.log("videoId", videoId);
  };

  async function getVideoTitle(videoId) {
    const response = await fetch(`${netlify}/getVideoTitle?videoId=${videoId}`);
    const titleData = await response.json();

    const videoTitle = titleData.items[0].snippet.title;

    setAppState((prev) => ({ ...prev, videoTitle }));

    // console.log("titleData", titleData);
  }

  async function getVideoComments(videoId) {
    const response = await fetch(`${netlify}/getVideoComments?videoId=${videoId}`);
    const commentsData = await response.json();

    const videoComments = commentsData.items;

    setAppState((prev) => ({ ...prev, videoComments }));

    getRandomComment(videoComments);

    // console.log("commentsData", commentsData);
  }

  function getRandomComment(comments) {
    const rand = Math.floor(Math.random() * comments.length);
    const randomComment = comments[rand];

    // console.log("randomComment", randomComment);

    setAppState((prev) => ({ ...prev, randomComment }));
  }

  const value = {
    appState,
    setAppState,
    handlePaste,
    getRandomComment,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
