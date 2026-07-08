import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import useControls from "./hooks/useControls";

import Comment from "./components/Comment";
import Footer from "./components/Footer";

function App() {
  const { appState, commentLoaded } = useContext(AppContext);
  const { errorMessage, invalidURL, status } = appState;
  const { inputRef, inputValue, handleInputChange, handlePaste, handleSubmit, isLoading } = useControls();

  const hasError = status === "error";

  return (
    <>
      <main>
        {isLoading ? (
          <p className="prompt loading">Loading comments...</p>
        ) : commentLoaded ? (
          <Comment />
        ) : (
          <form className="prompt-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Paste a YouTube URL here"
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onPaste={handlePaste}
              disabled={isLoading}
            />
            <button type="submit" disabled={!inputValue.trim() || isLoading} className="submit-button" aria-label="Load comments">
              Load
            </button>
          </form>
        )}
        {hasError && <p className="comments-error">{errorMessage || "Comments could not be loaded. Check Netlify Dev or your network."}</p>}
        {invalidURL && <p className="invalid-url">Invalid URL</p>}
      </main>
      <Footer />
    </>
  );
}

export default App;
