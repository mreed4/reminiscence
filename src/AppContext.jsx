import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { youtubeParser } from "./assets/js/helpers";

const netlify = "/.netlify/functions";

const AppContext = createContext();

function AppProvider({ children }) {
  const [appState, setAppState] = useState({
    videoId: "",
    videoTitle: "",
    videoComments: [],
  });

  const handlePaste = (event) => {
    const videoURL = event.clipboardData.getData("text");
    const videoId = youtubeParser(videoURL);

    setAppState((prev) => ({ ...prev, videoId }));

    getVideoTitle(videoId);
    getVideoComments(videoId);

    console.log("videoId", videoId);
  };

  async function getVideoTitle(videoId) {
    const response = await fetch(`${netlify}/getVideoTitle?videoId=${videoId}`);
    const titleData = await response.json();

    const videoTitle = titleData.items[0].snippet.title;

    setAppState((prev) => ({ ...prev, videoTitle }));

    console.log("titleData", titleData);
  }

  async function getVideoComments(videoId) {
    const response = await fetch(`${netlify}/getVideoComments?videoId=${videoId}`);
    const commentsData = await response.json();

    const videoComments = commentsData.items;

    setAppState((prev) => ({ ...prev, videoComments }));

    console.log("commentsData", commentsData);
  }

  const value = {
    appState,
    setAppState,
    handlePaste,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };