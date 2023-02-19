import { youtubeParser, getRelativeTime } from "./helpers.js";
import { config } from "./config.js";

const key = config.key;

const inputURL = document.querySelector("#video-url");
const ol = document.querySelector("ol");
const h1 = document.querySelector("h1");

const apiBase = "https://www.googleapis.com/youtube/v3";

let videoId;
const commentAmount = 100;

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
          dat.items
            .sort((a, b) => {
              return b.snippet.topLevelComment.snippet.likeCount - a.snippet.topLevelComment.snippet.likeCount;
            })
            .map((item) => {
              const comment = item.snippet.topLevelComment.snippet;
              const likes = comment.likeCount;
              const text = comment.textDisplay;
              const date = Date.parse(comment.publishedAt) / 1000;

              const li = `<li>${text} ${getRelativeTime(date)} (${likes})</li>`;

              // console.log(comment.length);
              if (!text.includes("<br>")) {
                ol.insertAdjacentHTML("beforeend", li);
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
