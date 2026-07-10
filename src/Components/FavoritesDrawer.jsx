import { useEffect, useState } from "react";
import { getRelativeTime } from "../utils/helpers";
import "../styles/FavoritesDrawer.css";

export default function FavoritesDrawer({ favorites, open, onClose, onClear }) {
  const [selectedFavId, setSelectedFavId] = useState(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        if (selectedFavId) {
          setSelectedFavId(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose, selectedFavId]);

  const selectedFav = selectedFavId ? favorites.find((f) => f.id === selectedFavId) : null;

  return (
    <>
      <div className={`drawer-backdrop ${open ? "open" : ""}`} onClick={onClose}></div>
      <div className={`favorites-drawer ${open ? "open" : ""}`}>
        {selectedFav ? (
          // Detail View
          <>
            <div className="drawer-header">
              <button onClick={() => setSelectedFavId(null)} className="drawer-back" aria-label="Back to list">
                <span className="material-icons">arrow_back</span>
              </button>
              <h3>Comment Details</h3>
              <button onClick={onClose} className="drawer-close" aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="drawer-content detail-view">
              <div className="detail-header">
                <a href={`https://www.youtube.com/watch?v=${selectedFav.videoId}`} target="_blank" rel="noreferrer" className="video-link">
                  {selectedFav.videoTitle}
                </a>
                <div className="detail-meta">
                  <span className="author">{selectedFav.author}</span>
                  <div className="detail-dates">
                    <span className="posted-date">Posted: {getRelativeTime(new Date(selectedFav.publishedAt).getTime() / 1000)}</span>
                    <span className="added-date">Saved: {getRelativeTime(new Date(selectedFav.addedAt).getTime() / 1000)}</span>
                  </div>
                </div>
              </div>
              <p className="detail-text">{selectedFav.commentText}</p>
            </div>
          </>
        ) : (
          // List View
          <>
            <div className="drawer-header">
              <h3>Saved Comments ({favorites.length})</h3>
              <button onClick={onClose} className="drawer-close" aria-label="Close">
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className="drawer-content">
              {favorites.length === 0 ? (
                <p className="empty-state">No favorites yet. Heart a comment to save it!</p>
              ) : (
                <ul className="favorites-list">
                  {favorites.map((fav) => (
                    <li key={fav.id} className="favorite-item" onClick={() => setSelectedFavId(fav.id)}>
                      <a
                        href={`https://www.youtube.com/watch?v=${fav.videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="video-link"
                        onClick={(e) => e.stopPropagation()}>
                        {fav.videoTitle}
                      </a>
                      <p className="favorite-text">{fav.commentText}</p>
                      <div className="favorite-meta">
                        <span className="author">{fav.author}</span>
                        <span className="date">{getRelativeTime(new Date(fav.publishedAt).getTime() / 1000)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {favorites.length > 0 && (
              <div className="drawer-footer">
                <button onClick={onClear} className="clear-favorites-btn">
                  Clear All
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
