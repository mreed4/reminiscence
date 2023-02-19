import { youtubeParser } from "./helpers.js";

const key = YT_API;

const inputURL = document.querySelector("#video-url");
const ol = document.querySelector("ol");
const h1 = document.querySelector("h1");

const apiBase = "https://www.googleapis.com/youtube/v3";

let videoId;
const hideLongComments = true;
const commentAmount = 25;

inputURL.addEventListener(
  "change",
  (event) => {
    videoId = youtubeParser(event.target.value);
    getVideoData();
    inputURL.value = "";
    ol.innerHTML = "";
  },
  { once: false }
);

function getVideoTitle() {
  if (videoId) {
    fetch(`${apiBase}/videos?part=snippet&id=${videoId}&key=${key}`)
      .then((res) => res.json())
      .then((dat) => {
        if (dat) {
          // console.log(dat);
          const videoTitle = dat.items[0].snippet.title;
          h1.textContent = videoTitle;
        }
      })
      .catch((e) => console.log(e));
  }
}

function getComments() {
  if (videoId) {
    fetch(`${apiBase}/commentThreads?part=snippet&maxResults=${commentAmount}&order=relevance&videoId=${videoId}&key=${key}`)
      .then((res) => res.json())
      .then((dat) => {
        if (dat) {
          console.log(dat);
          dat.items.map((item) => {
            const comment = item.snippet.topLevelComment.snippet.textDisplay;
            const replies = item.snippet.totalReplyCount;

            if (hideLongComments && !comment.includes("<br>")) {
              ol.insertAdjacentHTML("beforeend", `<li>${replies} ${comment}</li>`);
            }
          });
        }
      });
  }
}

function getVideoData() {
  getVideoTitle();
  getComments();
}

export { getVideoData };
