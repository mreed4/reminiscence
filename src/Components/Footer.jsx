import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { truncate } from "../utils/helpers";

import Controls from "./Controls";

export default function Footer() {
  const { appState } = useContext(AppContext);
  const { videoId, videoTitle, invalidURL } = appState;

  const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";

  return (
    <footer>
      <h1>
        <i className="fa-brands fa-youtube"></i>
        <span>Reminiscence</span>
      </h1>
      {videoTitle && !invalidURL ? (
        <a className="video-title" href={videoUrl} target="_blank" rel="noreferrer">
          {truncate(videoTitle, 50)}
        </a>
      ) : (
        <span className="video-title">{!invalidURL && truncate(videoTitle, 50)}</span>
      )}
      <Controls />
    </footer>
  );
}
