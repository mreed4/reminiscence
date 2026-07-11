import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { truncate } from "../utils/helpers";
import Controls from "./Controls";
import Modal from "./Modal";
import FavoritesDrawer from "./FavoritesDrawer";

export default function Header() {
  const { appState, favorites, clearAllFavorites, favoritesOpen, toggleFavoritesOpen } = useContext(AppContext);
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

          <div className="header-controls">
            <Controls onHelp={() => setHelpOpen(true)} />
          </div>
        </div>
      </header>

      <FavoritesDrawer favorites={favorites} open={favoritesOpen} onClose={toggleFavoritesOpen} onClear={clearAllFavorites} />

      <Modal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
