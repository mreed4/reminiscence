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
    // Less than a minute has passed:
    relativeTime = `${difference} seconds ago`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    const mins = Math.floor(difference / 60);
    relativeTime = `${mins} minutes ago`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    const hours = Math.floor(difference / 3600);
    relativeTime = `${hours === 1 ? hours + " hour" : hours + " hours"} ago`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    const days = Math.floor(difference / 86400);
    relativeTime = `${days === 1 ? days + " day" : days + " days"} ago`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    const months = Math.floor(difference / 2620800);
    relativeTime = `${months === 1 ? months + " month" : months + " months"} ago`;
  } else {
    // More than a year has passed:
    const years = Math.floor(difference / 31449600);
    relativeTime = `${years === 1 ? years + " year" : years + " years"} ago`;
  }
  return relativeTime;
}

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
}

export { youtubeParser, getRelativeTime, truncate };
