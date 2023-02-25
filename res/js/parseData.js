import { getRelativeTime } from "./helpers.js";

const h2 = document.querySelector("h2");
const ol = document.querySelector("#comments-list");
const newCommentBtn = document.querySelector("#new-comment");

export const parseData = {
  showVideoTitle: (data) => {
    const title = data.items[0].snippet.title;
    const videoId = data.items[0].id;
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    h2.style.visibility = "visible";
    h2.innerHTML = `<a href="${videoUrl}">${title.length > 60 ? `${title.slice(0, 60)}...` : title}</a>`;
  },
  listComments(data) {
    /*
    listComments() is called in youtubeAPI.js, with the APIs data as the argument. 
    It will add every comment as a formatted li to an ol in the DOM, though by default 
    each li will be set to "display: none", via a CSS class. 

    In this way, we do not have to re-fetch the data from the API every time we want 
    to show a new comment. We only manipulate the DOM, not the data.
    
    Eventually shown to the end user will be a single comment, randomly selected 
    from the list,  with its display set to "block". This is done in the 
    showRandomComment() method.
    */
    ol.innerHTML = ""; // Clear the list before adding new comments
    data.items
      .filter((item) => {
        // This will filter out any comments that contain line breaks
        const text = item.snippet.topLevelComment.snippet.textDisplay;
        return !text.includes("<br>");
      })
      .map((item) => {
        // Set up variables for each comment
        const comment = item.snippet.topLevelComment.snippet;
        const likes = comment.likeCount;
        const text = comment.textDisplay;
        const date = Date.parse(comment.publishedAt) / 1000;
        const replies = item.snippet.totalReplyCount;
        const author = comment.authorDisplayName;
        const authorUrl = comment.authorChannelUrl;

        // This will set the font size of the comment based on its length
        const dynamicFontSize = text.length >= 200 ? "smaller" : text.length <= 5 ? "larger" : "";

        // This will truncate the comment if it is too long
        const dynamicComment = text.length >= 500 ? text.slice(0, 500) + "..." : text;

        // Create the li to be used in the DOM
        const li = `<li class="single-comment ">
          <div class="comment-wrap">
            <div class="comment-text ${dynamicFontSize}">${dynamicComment}</div>
            <div class="comment-data">
              <span><a href=${authorUrl}>${author}</a></span>
              <span>${getRelativeTime(date)}</span>
              <span class="hide">${likes} Likes</span>
              <span class="hide">${replies} Replies</span>
            </div>
          </div>
        </li>`;

        // This will add each li to the DOM
        ol.insertAdjacentHTML("beforeend", li);
      });

    // This creates a NodeList of all the comments added the DOM
    // This must be done after the comments are added to the DOM
    const allComments = document.querySelectorAll(".single-comment");

    // This will show a random comment on page load
    parseData.showRandomComment(allComments);

    // This will show a random comment when the "New Comment" button is clicked
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
