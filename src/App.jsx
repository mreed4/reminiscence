import { useContext, useEffect } from "react";
import { AppContext } from "./contexts/AppContext";
import useControls from "./hooks/useControls";

import Comment from "./Components/Comment";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const { appState, commentLoaded } = useContext(AppContext);
  const { errorMessage, invalidURL, status } = appState;
  const { inputRef, inputValue, handleInputChange, handlePaste, handleSubmit, isLoading } = useControls();

  const hasError = status === "error";

  useEffect(() => {
    document.body.classList.toggle("invalid-url-state", invalidURL);
    document.body.classList.toggle("comments-error-state", hasError);

    return () => {
      document.body.classList.remove("invalid-url-state", "comments-error-state");
    };
  }, [invalidURL, hasError]);

  return (
    <>
      <Header />
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
      </main>
      <Footer />
    </>
  );
}

export default App;
