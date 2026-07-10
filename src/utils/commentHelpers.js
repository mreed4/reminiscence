export function normalizeCommentText(item) {
  const snippet = item.snippet?.topLevelComment?.snippet;
  if (!snippet) return item;

  const textOriginal = snippet.textOriginal ?? "";
  const textDisplay = snippet.textDisplay ?? "";

  return {
    ...item,
    snippet: {
      ...item.snippet,
      topLevelComment: {
        ...item.snippet.topLevelComment,
        snippet: {
          ...snippet,
          textOriginal: textOriginal.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim(),
          textDisplay: textDisplay
            .replace(/<br\s*\/?>/gi, " ")
            .replace(/\s+/g, " ")
            .trim(),
        },
      },
    },
  };
}
