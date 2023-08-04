import { useContext, useEffect, useRef } from "react";
import { AppContext } from "./AppContext";

import "./App.css";

function App() {
  const { appState, handlePaste, getRandomComment } = useContext(AppContext);
  const { videoTitle, videoURL, randomComment, videoComments, commentError, videoId } = appState;

  const inputRef = useRef();

  useEffect(() => {
    // inputRef.current.focus();

    if (videoId) {
      console.log("appState", appState);
      inputRef.current.value = "";
    }
  }, [appState]);

  return (
    <>
      <input
        type="text"
        placeholder="Paste a Youtube URL here"
        ref={inputRef}
        onPaste={handlePaste}
        value={videoURL}
        /* */
      />
      <button onClick={() => getRandomComment(videoComments)} disabled={!videoComments.length}>
        Random Comment
      </button>
      {commentError ? <h1>Invalid Youtube URL</h1> : <h1>{videoTitle}</h1>}
      <div>
        <p>{randomComment.snippet?.topLevelComment?.snippet?.textOriginal}</p>
      </div>
    </>
  );
}

export default App;
