import { useContext, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";

import "./App.css";

function App() {
  const { appState, handlePaste, getRandomComment } = useContext(AppContext);
  const { videoTitle, videoURL, randomComment, videoComments } = appState;

  const inputRef = useRef();

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      inputRef.current.focus();
    }

    if (appState.videoId) {
      console.log("appState", appState);
      inputRef.current.value = "";
    }
  }, [appState]);

  return (
    <>
      <input type="text" placeholder="Paste a Youtube URL here" ref={inputRef} onPaste={handlePaste} value={videoURL} />
      <h1>{videoTitle}</h1>
      <p>{randomComment.snippet?.topLevelComment?.snippet?.textOriginal}</p>
      <button onClick={() => getRandomComment(videoComments)}>Random Comment</button>
    </>
  );
}

export default App;
