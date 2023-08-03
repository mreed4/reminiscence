import { useContext, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";

import "./App.css";

function App() {
  const { appState, handlePaste } = useContext(AppContext);
  const { videoTitle, videoURL, videoComments } = appState;

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();

    if (appState.videoId) {
      console.log("appState", appState);
      inputRef.current.value = "";
    }
  }, [appState]);

  return (
    <>
      <input type="text" placeholder="Paste a Youtube URL here" ref={inputRef} onPaste={handlePaste} value={videoURL} />
      <h1>{videoTitle}</h1>
      <ol>
        {videoComments.map((comment) => (
          <li key={comment.id}>{comment.snippet.topLevelComment.snippet.textOriginal}</li>
        ))}
      </ol>
    </>
  );
}

export default App;
