import { getVideoData } from "./youtubeAPI.js";
import { youtubeParser } from "./helpers.js";

const getCommentBtn = document.querySelector("#get-comments");
const inputURL = document.querySelector("#video-url");
const video = inputURL;

const commentAmount = 100;
const h1Count = document.querySelector("h1 span");
const pCount = document.querySelector("p span");

h1Count.textContent = commentAmount || 20;
pCount.textContent = commentAmount || 20;

function getComments(event) {
  getVideoData(youtubeParser(video.value), commentAmount);
  inputURL.value = "";
}

getCommentBtn.addEventListener("click", getComments);
