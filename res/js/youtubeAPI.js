import { youtubeParser, getRelativeTime } from "./helpers.js";
import { config } from "./config.js";

const key = config.key;

const inputURL = document.querySelector("#video-url");
const ol = document.querySelector("#comments-list");
const h2 = document.querySelector("h2");
const getCommentsBtn = document.querySelector("#get-comments");
const h1Count = document.querySelector("h1 span");
const pCount = document.querySelector("p span");

const youtubeOrder = "relevance"; // relevance, time, orderUnspecified
const sortMethod = "comment-length"; // likes, date, replies, comment-length
const dateSort = "newest"; // newest, oldest

const apiBase = "https://www.googleapis.com/youtube/v3";

let videoId = "" || youtubeParser("https://youtu.be/n2MtEsrcTTs");
const commentAmount = 100;
h1Count.textContent = commentAmount || 20;
pCount.textContent = commentAmount || 20;

getCommentsBtn.addEventListener(
  "click",
  () => {
    videoId = youtubeParser(inputURL.value);
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
          h2.textContent = videoTitle;
        }
      })
      .catch((e) => console.log(e));
  }
}

function getComments() {
  if (videoId) {
    const params = `part=snippet&maxResults=${commentAmount}&order=${youtubeOrder}&videoId=${videoId}&key=${key}`;
    fetch(`${apiBase}/commentThreads?${params}`)
      .then((res) => res.json())
      .then((dat) => {
        if (dat) {
          // console.log(dat);
          dat.items
            .sort((a, b) => {
              if (sortMethod === "likes") {
                return b.snippet.topLevelComment.snippet.likeCount - a.snippet.topLevelComment.snippet.likeCount;
              } else if (sortMethod === "date") {
                if (dateSort === "oldest") {
                  return (
                    Date.parse(a.snippet.topLevelComment.snippet.publishedAt) - Date.parse(b.snippet.topLevelComment.snippet.publishedAt)
                  );
                } else if (dateSort === "newest") {
                  return (
                    Date.parse(b.snippet.topLevelComment.snippet.publishedAt) - Date.parse(a.snippet.topLevelComment.snippet.publishedAt)
                  );
                } else {
                  return;
                }
              } else if (sortMethod === "replies") {
                return b.snippet.totalReplyCount - a.snippet.totalReplyCount;
              } else if (sortMethod === "comment-length") {
                return b.snippet.topLevelComment.snippet.textDisplay.length - a.snippet.topLevelComment.snippet.textDisplay.length;
              } else {
                return b.snippet.topLevelComment.snippet.textDisplay.length - a.snippet.topLevelComment.snippet.textDisplay.length;
              }
            })
            .filter((item) => !item.snippet.topLevelComment.snippet.textDisplay.includes("<br>"))
            .map((item) => {
              const comment = item.snippet.topLevelComment.snippet;
              const likes = comment.likeCount;
              const text = comment.textDisplay;
              const date = Date.parse(comment.publishedAt) / 1000;
              const replies = item.snippet.totalReplyCount;
              const author = comment.authorDisplayName;
              const authorUrl = comment.authorChannelUrl;

              const li = `<li>
                <div class="comment-wrap">
                  <div class="comment-text">${text}</div>
                  <div class="comment-data">
                    <span><a href=${authorUrl}>${author}</a></span>
                    <span>${getRelativeTime(date)}</span>
                    <span>${likes} Likes</span>
                    <span>${replies} Replies</span>
                  </div>
                </div>
              </li>`;

              ol.insertAdjacentHTML("beforeend", li);
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
