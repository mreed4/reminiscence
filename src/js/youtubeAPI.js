import { parseData } from "./parseData.js";

const netlify = "/.netlify/functions";

function getVideoTitle(videoId) {
  if (videoId) {
    fetch(`${netlify}/getVideoTitle?videoId=${videoId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          parseData.showVideoTitle(data);
        } else {
          console.error("No data");
        }
      })
      .catch((e) => console.log(e));
  } else {
    console.error("No videoId");
  }
}

function getComments(videoId, commentAmount = 20) {
  if (videoId) {
    fetch(`${netlify}/getVideoComments?videoId=${videoId}&commentAmount=${commentAmount}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const numComments = data.items.length;
          // console.log("Number of comments: " + numComments);
          parseData.listComments(data);
        }
      })
      .catch((e) => console.log(e));
  } else {
    console.log("No videoId");
  }
}

function getVideoData(videoId, commentAmount) {
  getVideoTitle(videoId);
  getComments(videoId, commentAmount);
}

export { getVideoData };
