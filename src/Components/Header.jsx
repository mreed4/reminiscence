import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { truncate } from "../utils/helpers";
import Controls from "./Controls";
import Modal from "./Modal";

export default function Header() {
  const { appState } = useContext(AppContext);
  const { videoId, videoTitle, invalidURL } = appState;
  const [helpOpen, setHelpOpen] = useState(false);

  const videoUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : "";

  return (
    <>
      <header className="app-header">
        <div className="header-row">
          <div className="header-brand">
            <h1>
              <i className="fa-brands fa-youtube"></i>
              <span>Reminiscence</span>
            </h1>
          </div>

          <div className="header-title">
            {invalidURL ? (
              <span className="video-title invalid-url">Invalid URL</span>
            ) : videoTitle ? (
              <a className="video-title" href={videoUrl} target="_blank" rel="noreferrer">
                {truncate(videoTitle, 50)}
              </a>
            ) : (
              <span className="video-title"></span>
            )}
          </div>

          <Controls onHelp={() => setHelpOpen(true)} />
        </div>
      </header>

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
