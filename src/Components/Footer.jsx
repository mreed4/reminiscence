import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { truncate } from "../utils/helpers";

import Controls from "./Controls";

export default function Footer() {
  const { appState } = useContext(AppContext);
  const { videoTitle, invalidURL } = appState;

  return (
    <footer>
      <h1>
        <i className="fa-brands fa-youtube"></i>
        <span>Reminiscence</span>
      </h1>
      <span className={`video-title`}>{!invalidURL && truncate(videoTitle, 50)}</span>
      <Controls />
    </footer>
  );
}
