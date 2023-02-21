import { getVideoData } from "./youtubeAPI.js";
import { youtubeParser } from "./helpers.js";

const getCommentBtn = document.querySelector("#get-comments");
const inputURL = document.querySelector("#video-url");
const video = inputURL;

const commentAmount = 100;

function getComments(event) {
  getVideoData(youtubeParser(video.value), commentAmount);
  inputURL.value = "";
}

getCommentBtn.addEventListener("click", getComments);
