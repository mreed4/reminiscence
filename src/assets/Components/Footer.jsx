import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { truncate } from "../js/helpers";

import Controls from "./Controls";

import "../css/Footer.css";

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
