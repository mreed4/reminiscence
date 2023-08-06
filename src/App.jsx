import { useContext } from "react";
import { AppContext } from "./AppContext";

import Comment from "./assets/Components/Comment";
import Footer from "./assets/Components/Footer";

import "./App.css";

function App() {
  const { appState, commentLoaded } = useContext(AppContext);
  const { commentError, invalidURL } = appState;

  return (
    <>
      <main>
        {commentLoaded ? <Comment /> : <p className="prompt">Enter a video URL below.</p>}
        {commentError && <p className="comments-error">Comments could not be loaded</p>}
        {invalidURL && <p className="invalid-url">Invalid URL</p>}
      </main>
      <Footer />
    </>
  );
}

export default App;
