import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../AppContext";

import { getRelativeTime } from "../../assets/js/helpers";

import "../css/Comment.css";

export default function Comment() {
  const { appState } = useContext(AppContext);
  const { randomComment } = appState;

  useEffect(() => {}, [randomComment]);

  const publishedRaw = Date.parse(randomComment.snippet?.topLevelComment?.snippet?.publishedAt) / 1000;
  const author = randomComment.snippet?.topLevelComment?.snippet?.authorDisplayName;
  const commentText = randomComment.snippet?.topLevelComment?.snippet?.textOriginal;
  const published = getRelativeTime(publishedRaw);

  const dynamicFontSize = commentText.length >= 200 ? "smaller" : commentText.length <= 5 ? "larger" : null;

  const words = commentText.split(" ");

  const dynamicComment = words.length >= 50 ? words.slice(0, 50).join(" ") + "..." : commentText;

  return (
    <div className="comment">
      <p className={`comment-text ${dynamicFontSize}`}>{dynamicComment}</p>
      <div className="comment-details">
        <span className="comment-author">{author}</span>
        <span className="comment-published">{published}</span>
      </div>
    </div>
  );
}
