import { inputURL, getCommentsBtn, getComments, enableGetCommentsBtn, disablePlaceholderText, enablePlaceholderText } from "./inputs.js";

export function init() {
  inputURL.addEventListener("focusin", disablePlaceholderText);
  inputURL.addEventListener("focusout", enablePlaceholderText);
  inputURL.addEventListener("keyup", enableGetCommentsBtn);
  getCommentsBtn.addEventListener("click", getComments);
}
