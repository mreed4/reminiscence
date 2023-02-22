import { getVideoData } from "./youtubeAPI.js";
import { youtubeParser } from "./helpers.js";

const newCommentBtn = document.querySelector("#new-comment");
const inputURL = document.querySelector("#video-url");
const video = inputURL;

const commentAmount = 100;

function getComments(event) {
  getVideoData(youtubeParser(video.value), commentAmount);
  inputURL.value = "";
  newCommentBtn.disabled = false;
}

newCommentBtn.disabled = true;
inputURL.addEventListener("change", getComments);
