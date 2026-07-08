// https://stackoverflow.com/a/8260383/15986695
function youtubeParser(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

// https://natclark.com/tutorials/javascript-relative-time/
function getRelativeTime(oldTimestamp) {
  const date = new Date();
  const timestamp = date.getTime();
  const seconds = Math.floor(timestamp / 1000);
  const difference = seconds - oldTimestamp;
  let relativeTime = "";
  if (difference < 60) {
    relativeTime = `${difference} seconds ago`;
  } else if (difference < 3600) {
    const mins = Math.floor(difference / 60);
    relativeTime = `${mins} minutes ago`;
  } else if (difference < 86400) {
    const hours = Math.floor(difference / 3600);
    relativeTime = `${hours === 1 ? hours + " hour" : hours + " hours"} ago`;
  } else if (difference < 2620800) {
    const days = Math.floor(difference / 86400);
    relativeTime = `${days === 1 ? days + " day" : days + " days"} ago`;
  } else if (difference < 31449600) {
    const months = Math.floor(difference / 2620800);
    relativeTime = `${months === 1 ? months + " month" : months + " months"} ago`;
  } else {
    const years = Math.floor(difference / 31449600);
    relativeTime = `${years === 1 ? years + " year" : years + " years"} ago`;
  }
  return relativeTime;
}

function getCommentData(randomComment) {
  return {
    commentId: randomComment.id,
    author: randomComment.snippet?.topLevelComment?.snippet?.authorDisplayName,
    authorChannelURL: randomComment.snippet?.topLevelComment?.snippet?.authorChannelUrl,
    publishedRaw: Date.parse(randomComment.snippet?.topLevelComment?.snippet?.publishedAt) / 1000,
    commentText: randomComment.snippet?.topLevelComment?.snippet?.textOriginal,
  };
}

function getCommentPresentation(commentText) {
  const normalizedText = commentText.replaceAll(" ", "");
  const words = commentText.split(" ");

  return {
    dynamicFontSize: normalizedText.length >= 200 ? "smaller" : normalizedText.length <= 15 ? "larger" : null,
    center: normalizedText.length <= 15 ? "center" : null,
    justify: normalizedText.length >= 150 ? "justify" : null,
    dynamicComment: words.length >= 50 ? words.slice(0, 50).join(" ") + "..." : commentText,
  };
}

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

export { youtubeParser, getRelativeTime, truncate, getCommentData, getCommentPresentation };
