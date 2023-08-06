import { useRef, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../AppContext";

export default function Controls({ source }) {
  const { appState, handlePaste, getRandomComment } = useContext(AppContext);
  const { videoComments, randomComment, videoId } = appState;

  const inputRef = useRef();

  const commentLoaded = Object.keys(randomComment).length > 0;

  useEffect(() => {
    // inputRef.current.focus();

    if (videoId) {
      console.log("appState", appState);
      inputRef.current.value = "";
    }

    inputRef.current.value = "";
  }, [appState]);

  useEffect(() => {
    function handleSpacebar(event) {
      if (event.code === "Space") {
        getRandomComment(videoComments);
      }
    }

    if (commentLoaded) {
      inputRef.current.blur();
      window.addEventListener("keydown", handleSpacebar);
    }

    // window.addEventListener("keydown", handleSpacebar);

    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [commentLoaded]);

  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Youtube URL"
        ref={inputRef}
        onPaste={handlePaste}
        // style={{ display: !videoId ? "block" : "none" }}
        // value={videoURL}
        /* */
      />
      <button onClick={() => getRandomComment(videoComments)} disabled={!videoComments.length} type="button">
        <i className="fa-solid fa-arrows-rotate"></i>
      </button>
    </div>
  );
}

Controls.propTypes = {
  source: PropTypes.string,
};
