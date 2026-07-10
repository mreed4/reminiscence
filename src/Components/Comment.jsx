import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import useComment from "../hooks/useComment";

export default function Comment() {
  const { appState, toggleFavorite, isFavorited } = useContext(AppContext);
  const { commentId, author, authorChannelURL, published, dynamicFontSize, center, justify, dynamicComment } = useComment();
  const { selectedComment, videoId, videoTitle } = appState;

  const handleToggleFavorite = () => {
    toggleFavorite(selectedComment, videoId, videoTitle);
  };

  return (
    <div className={`comment ${center}`} key={commentId}>
      <p className={`comment-text ${dynamicFontSize} ${justify}`}>{dynamicComment}</p>
      <div className="comment-details">
        <button
          type="button"
          className={`favorite-button ${isFavorited(selectedComment.id) ? "active" : ""}`}
          onClick={handleToggleFavorite}
          aria-label="Add to favorites">
          <span className="material-icons">{isFavorited(selectedComment.id) ? "favorite" : "favorite_outline"}</span>
        </button>
        <span className="comment-author">
          <a href={`${authorChannelURL}`} target="_blank" rel="noreferrer">
            {author}
          </a>
        </span>
        <span className="comment-published">{published}</span>
      </div>
    </div>
  );
}
