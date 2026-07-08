import useComment from "../hooks/useComment";

import "../assets/css/Comment.css";

export default function Comment() {
  const { commentId, author, authorChannelURL, published, dynamicFontSize, center, justify, dynamicComment } = useComment();

  return (
    <div className={`comment ${center}`} key={commentId}>
      <p className={`comment-text ${dynamicFontSize} ${justify}`}>{dynamicComment}</p>
      <div className="comment-details">
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
