import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";

import Comment from "./components/Comment";
import Footer from "./components/Footer";

function App() {
  const { appState, commentLoaded } = useContext(AppContext);
  const { errorMessage, invalidURL, status } = appState;

  const isLoading = status === "loading";
  const hasError = status === "error";

  return (
    <>
      <main>
        {isLoading ? (
          <p className="prompt loading">Loading comments...</p>
        ) : commentLoaded ? (
          <Comment />
        ) : (
          <p className="prompt">Paste a YouTube URL below.</p>
        )}
        {hasError && <p className="comments-error">{errorMessage || "Comments could not be loaded. Check Netlify Dev or your network."}</p>}
        {invalidURL && <p className="invalid-url">Invalid URL</p>}
      </main>
      <Footer />
    </>
  );
}

export default App;
