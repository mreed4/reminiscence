import { useState, useEffect } from "react";

const DB_NAME = "ReminiscenceDB";
const STORE_NAME = "favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => console.error("Failed to open IndexedDB");
    request.onsuccess = (event) => {
      const database = event.target.result;
      setDb(database);
      loadFavorites(database);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
        store.createIndex("commentId", "commentId", { unique: true });
      }
    };
  }, []);

  const loadFavorites = (database) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => setFavorites(request.result);
  };

  const toggleFavorite = (comment, videoId, videoTitle) => {
    if (!db) return;
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("commentId");
    const request = index.get(comment.id);

    request.onsuccess = () => {
      if (request.result) {
        store.delete(request.result.id);
        setFavorites((prev) => prev.filter((f) => f.commentId !== comment.id));
      } else {
        const favorite = {
          commentId: comment.id,
          videoId,
          videoTitle,
          author: comment.snippet?.topLevelComment?.snippet?.authorDisplayName,
          authorChannelURL: comment.snippet?.topLevelComment?.snippet?.authorChannelUrl,
          commentText: comment.snippet?.topLevelComment?.snippet?.textOriginal,
          publishedAt: comment.snippet?.topLevelComment?.snippet?.publishedAt,
          addedAt: new Date().toISOString(),
        };
        store.add(favorite);
        setFavorites((prev) => [...prev, favorite]);
      }
    };
  };

  const isFavorited = (commentId) => favorites.some((f) => f.commentId === commentId);

  const clearAllFavorites = () => {
    if (!db) return;
    const transaction = db.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).clear();
    setFavorites([]);
  };

  return { favorites, toggleFavorite, isFavorited, clearAllFavorites };
}
