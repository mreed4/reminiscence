export const ActionTypes = {
  START_LOADING: "START_LOADING",
  SET_INVALID_URL: "SET_INVALID_URL",
  SET_VIDEO_TITLE: "SET_VIDEO_TITLE",
  SET_VIDEO_COMMENTS: "SET_VIDEO_COMMENTS",
  SET_SELECTED_COMMENT_INDEX: "SET_SELECTED_COMMENT_INDEX",
  SET_SELECTED_COMMENT_INDEX_AND_HISTORY: "SET_SELECTED_COMMENT_INDEX_AND_HISTORY",
  SET_ERROR: "SET_ERROR",
  CLEAR_INVALID_URL: "CLEAR_INVALID_URL",
  SET_STATUS: "SET_STATUS",
  CLEAR: "CLEAR",
};

export const initialYouTubeState = {
  videoId: "",
  videoTitle: "",
  videoComments: [],
  selectedCommentIndex: null,
  recentCommentHistory: [],
  invalidURL: false,
  errorMessage: "",
  status: "idle",
};

export default function youTubeReducer(state, action) {
  switch (action.type) {
    case ActionTypes.START_LOADING:
      return {
        ...state,
        videoId: action.payload,
        invalidURL: false,
        errorMessage: "",
        status: "loading",
        videoComments: [],
        selectedCommentIndex: null,
        recentCommentHistory: [],
      };
    case ActionTypes.SET_INVALID_URL:
      return {
        ...state,
        invalidURL: true,
        errorMessage: "",
        videoId: "",
        videoTitle: "",
        videoComments: [],
        selectedCommentIndex: null,
        status: "idle",
      };
    case ActionTypes.SET_VIDEO_TITLE:
      return {
        ...state,
        videoTitle: action.payload,
      };
    case ActionTypes.SET_VIDEO_COMMENTS:
      return {
        ...state,
        videoComments: action.payload,
      };
    case ActionTypes.SET_SELECTED_COMMENT_INDEX:
      return {
        ...state,
        selectedCommentIndex: action.payload,
      };
    case ActionTypes.SET_SELECTED_COMMENT_INDEX_AND_HISTORY:
      return {
        ...state,
        selectedCommentIndex: action.payload,
        recentCommentHistory: [...state.recentCommentHistory.filter((index) => index !== action.payload), action.payload].slice(-10),
      };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        status: "error",
        errorMessage: action.payload,
        invalidURL: false,
        videoId: "",
        videoTitle: "",
        videoComments: [],
        selectedCommentIndex: null,
        recentCommentHistory: [],
      };
    case ActionTypes.CLEAR_INVALID_URL:
      return {
        ...state,
        invalidURL: false,
        errorMessage: "",
      };
    case ActionTypes.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case ActionTypes.CLEAR:
      return {
        ...initialYouTubeState,
      };
    default:
      return state;
  }
}
