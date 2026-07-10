export function pickNextCommentIndex(commentsLength, recentHistory = [], currentIndex = null) {
  if (commentsLength <= 0) return null;
  if (commentsLength === 1) return 0;

  const recentSet = new Set(recentHistory);
  if (currentIndex !== null) {
    recentSet.add(currentIndex);
  }

  const availableIndexes = Array.from({ length: commentsLength }, (_, index) => index).filter((index) => !recentSet.has(index));

  if (availableIndexes.length > 0) {
    return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  }

  const fallbackIndexes = Array.from({ length: commentsLength }, (_, index) => index).filter((index) => index !== currentIndex);

  return fallbackIndexes.length ? fallbackIndexes[Math.floor(Math.random() * fallbackIndexes.length)] : currentIndex;
}
