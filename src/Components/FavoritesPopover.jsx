import { getRelativeTime } from "../utils/helpers";
import "../styles/FavoritesPopover.css";

export default function FavoritesPopover({ favorites, open, onClose, onClear }) {
  if (!open) return null;

  return (
    <>
      <div className="popover-backdrop" onClick={onClose}></div>
      <div className="favorites-popover">
        <div className="popover-header">
          <h3>Saved Comments ({favorites.length})</h3>
          <button onClick={onClose} className="popover-close" aria-label="Close">
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="popover-content">
          {favorites.length === 0 ? (
            <p className="empty-state">No favorites yet. Heart a comment to save it!</p>
          ) : (
            <ul className="favorites-list">
              {favorites.map((fav) => (
                <li key={fav.id} className="favorite-item">
                  <a href={`https://www.youtube.com/watch?v=${fav.videoId}`} target="_blank" rel="noreferrer" className="video-link">
                    {fav.videoTitle}
                  </a>
                  <p className="favorite-text">{fav.commentText}</p>
                  <div className="favorite-meta">
                    <span className="author">{fav.author}</span>
                    <span className="date">{getRelativeTime(new Date(fav.addedAt).getTime() / 1000)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {favorites.length > 0 && (
          <div className="popover-footer">
            <button onClick={onClear} className="clear-favorites-btn">
              Clear All
            </button>
          </div>
        )}
      </div>
    </>
  );
}
