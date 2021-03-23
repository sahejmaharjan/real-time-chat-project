import { Action } from "./action";
import {
  CREATE_CHATROOM,
  CREATE_CHATROOM_SUCCESS,
  CREATE_CHATROOM_FAILED,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILED,
  FETCH_CHATROOMS,
  FETCH_CHATROOMS_SUCCESS,
  FETCH_CHATROOMS_FAILED,
  NONE,
  SET_CURRENT_CHATID,
} from "./constant";

const InitialState = {
  loading: false,
  fetchUserLoading: false,
  messageLoading: false,
  chatRoomloading: false,
  data: [],
  userData: [],
  messageData: [],
  chatRoomData: [],
  error: null,
  refresh: 0,
  currentChatId: "",
  otherUserName: "#channelName",
};

export default function allReducer(state = InitialState, action) {
  switch (action.type) {
    case FETCH_USER: {
      return { ...state, loading: true, error: "" };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        fetchUserLoading: false,
        userData: action.payload,
        error: "",
      };
    }
    case FETCH_USER_FAILED: {
      return {
        ...state,
        fetchUserLoading: false,
        error: action.payload.message,
      };
    }
    case FETCH_MESSAGES: {
      return { ...state, messageLoading: true, error: "" };
    }
    case FETCH_MESSAGES_SUCCESS: {
      console.log("ok success message", action.payload);
      return {
        ...state,
        messageLoading: false,
        messageData: action.payload,
        error: "",
      };
    }
    case FETCH_MESSAGES_FAILED: {
      return {
        ...state,
        messageLoading: false,
        error: action.payload.message,
      };
    }
    case CREATE_CHATROOM: {
      return { ...state, loading: true, error: "" };
    }
    case CREATE_CHATROOM_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
        refresh: state.refresh + 1,
      };
    }
    case CREATE_CHATROOM_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    }
    case FETCH_CHATROOMS: {
      return { ...state, chatRoomloading: true, error: "" };
    }
    case FETCH_CHATROOMS_SUCCESS: {
      console.log("chatRoom Success", action.payload);
      return {
        ...state,
        chatRoomloading: false,
        chatRoomData: action.payload,
        error: "",
      };
    }
    case FETCH_CHATROOMS_FAILED: {
      return {
        ...state,
        chatRoomloading: false,
        error: action.payload.message,
      };
    }
    case SET_CURRENT_CHATID: {
      console.log("currentChatId", action.payload.currentChatId);
      return {
        ...state,
        currentChatId: action.payload.currentChatId,
        otherUserName: action.payload.otherUserName,
      };
    }
    default: {
      return state;
    }
  }
}
