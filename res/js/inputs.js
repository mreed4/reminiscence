import { getVideoData } from "./youtubeAPI.js";
import { youtubeParser } from "./helpers.js";

const newCommentBtn = document.querySelector("#new-comment");
const getCommentsBtn = document.querySelector("#get-comments");
const inputURL = document.querySelector("#video-url");
const video = inputURL;

const commentAmount = 100;

getCommentsBtn.disabled = true;
newCommentBtn.disabled = true;

function getComments(event) {
  getVideoData(youtubeParser(video.value), commentAmount);
  inputURL.value = "";
  newCommentBtn.disabled = false;
  if (inputURL.value.length > 0) {
    getCommentsBtn.disabled = false;
  } else {
    getCommentsBtn.disabled = true;
  }
}
function enableGetCommentsBtn() {
  if (inputURL.value.length > 0) {
    getCommentsBtn.disabled = false;
  }
  if (inputURL.value.length > 0 && !newCommentBtn.disabled) {
    newCommentBtn.disabled = true;
  }
  if (inputURL.value.length === 0 /*|| !inputURL.value.includes("youtube") || !inputURL.value.includes("youtu.be") */) {
    getCommentsBtn.disabled = true;
    inputURL.placeholder = "Video URL";
  }
}

function disablePlaceholderText() {
  inputURL.placeholder = "";
}

function enablePlaceholderText() {
  inputURL.placeholder = "Video URL";
}

export { inputURL, getCommentsBtn, getComments, enableGetCommentsBtn, disablePlaceholderText, enablePlaceholderText };
