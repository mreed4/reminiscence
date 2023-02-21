import { getRelativeTime } from "./helpers.js";

const h2 = document.querySelector("h2");
const ol = document.querySelector("#comments-list");
const newCommentBtn = document.querySelector("#new-comment");

export const parseData = {
  showVideoTitle: (data) => {
    const title = data.items[0].snippet.title;
    const channel = data.items[0].snippet.channelTitle;
    const channelUrl = `https://www.youtube.com/channel/${data.items[0].snippet.channelId}`;
    h2.style.visibility = "visible";
    h2.textContent = title.length > 60 ? `${title.slice(0, 60)}...` : title;
  },
  listComments(data) {
    ol.innerHTML = "";
    data.items
      .filter((item) => !item.snippet.topLevelComment.snippet.textDisplay.includes("<br>"))
      .map((item) => {
        const comment = item.snippet.topLevelComment.snippet;
        const likes = comment.likeCount;
        const text = comment.textDisplay;
        const date = Date.parse(comment.publishedAt) / 1000;
        const replies = item.snippet.totalReplyCount;
        const author = comment.authorDisplayName;
        const authorUrl = comment.authorChannelUrl;

        const li = `<li class="single-comment">
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

    const allComments = document.querySelectorAll(".single-comment");
    parseData.showRandomComment(allComments);

    newCommentBtn.addEventListener("click", () => {
      allComments.forEach((comment) => (comment.style.display = "none"));
      parseData.showRandomComment(allComments);
    });
  },
  showRandomComment(comments) {
    // console.log(comments);
    const rand = Math.floor(Math.random() * comments.length);
    comments[rand].style.display = "block";
  },
};

// .sort((a, b) => {
//   if (sortMethod === "likes") {
//     return b.snippet.topLevelComment.snippet.likeCount - a.snippet.topLevelComment.snippet.likeCount;
//   } else if (sortMethod === "date") {
//     if (dateSort === "oldest") {
//       return Date.parse(a.snippet.topLevelComment.snippet.publishedAt) - Date.parse(b.snippet.topLevelComment.snippet.publishedAt);
//     } else if (dateSort === "newest") {
//       return Date.parse(b.snippet.topLevelComment.snippet.publishedAt) - Date.parse(a.snippet.topLevelComment.snippet.publishedAt);
//     } else {
//       return;
//     }
//   } else if (sortMethod === "replies") {
//     return b.snippet.totalReplyCount - a.snippet.totalReplyCount;
//   } else if (sortMethod === "comment-length") {
//     return b.snippet.topLevelComment.snippet.textDisplay.length - a.snippet.topLevelComment.snippet.textDisplay.length;
//   } else {
//     return b.snippet.topLevelComment.snippet.textDisplay.length - a.snippet.topLevelComment.snippet.textDisplay.length;
//   }
// })

// ,
//   getRandomComment: (data) => {
//     const comments = data.items.filter((item) => !item.snippet.topLevelComment.snippet.textDisplay.includes("<br>"));
//     const rand = Math.floor(Math.random() * data.items.length);
//     const comment = comments[rand].snippet.topLevelComment.snippet;
//     const likes = comment.likeCount;
//     const text = comment.textDisplay;
//     const date = Date.parse(comment.publishedAt) / 1000;
//     const replies = comments[rand].snippet.totalReplyCount;
//     const author = comment.authorDisplayName;
//     const authorUrl = comment.authorChannelUrl;

//     const div = `<div class="comment-wrap">
//     <div class="comment-text">${text}</div>
//     <div class="comment-data">
//       <span><a href=${authorUrl}>${author}</a></span>
//       <span>${getRelativeTime(date)}</span>
//       <span>${likes} Likes</span>
//       <span>${replies} Replies</span>
//     </div>`;

//     singleComment.innerHTML = div;
//   },
