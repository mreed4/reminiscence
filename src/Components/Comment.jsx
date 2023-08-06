import { useContext } from "react";
import { AppContext } from "./AppContext";

import { getRelativeTime } from "../assets/js/helpers";

import "../assets/css/Comment.css";

export default function Comment() {
  const { appState } = useContext(AppContext);
  const { randomComment } = appState;

  const publishedRaw = Date.parse(randomComment.snippet?.topLevelComment?.snippet?.publishedAt) / 1000;
  const author = randomComment.snippet?.topLevelComment?.snippet?.authorDisplayName;
  const commentText = randomComment.snippet?.topLevelComment?.snippet?.textOriginal;
  const published = getRelativeTime(publishedRaw);

  const dynamicFontSize = commentText.length >= 200 ? "smaller" : commentText.length <= 5 ? "larger" : null;

  const center = commentText.replaceAll(" ", "").length <= 15 ? "center" : null;
  const justify = commentText.replaceAll(" ", "").length >= 150 ? "justify" : null;

  const words = commentText.split(" ");

  const dynamicComment = words.length >= 50 ? words.slice(0, 50).join(" ") + "..." : commentText;

  return (
    <div className={`comment ${center}`}>
      <p className={`comment-text ${dynamicFontSize} ${justify}`}>{dynamicComment}</p>
      <div className="comment-details">
        <span className="comment-author">{author}</span>
        <span className="comment-published">{published}</span>
      </div>
    </div>
  );
}
