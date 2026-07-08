import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { getRelativeTime, getCommentData, getCommentPresentation } from "../utils/helpers";

export default function useComment() {
  const { appState } = useContext(AppContext);
  const { selectedComment } = appState;
  const { commentId, author, authorChannelURL, publishedRaw, commentText } = getCommentData(selectedComment);

  const published = getRelativeTime(publishedRaw);
  const { dynamicFontSize, center, justify, dynamicComment } = getCommentPresentation(commentText);

  return {
    commentId,
    author,
    authorChannelURL,
    published,
    dynamicFontSize,
    center,
    justify,
    dynamicComment,
  };
}
