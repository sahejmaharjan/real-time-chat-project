import {
  CREATE_CHATROOM,
  CREATE_CHATROOM_SUCCESS,
  CREATE_CHATROOM_FAILED,
  FETCH_CHATROOMS,
  FETCH_CHATROOMS_SUCCESS,
  FETCH_CHATROOMS_FAILED,
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILED,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
} from "./constant";

export const fetchUser = () => {
  return {
    type: FETCH_USER,
  };
};
export const fetchUserSuccess = (payload) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload,
  };
};
export const fetchUserFailed = (payload) => {
  return {
    type: FETCH_USER_FAILED,
    payload,
  };
};
export const fetchMessages = (data) => {
  return {
    type: FETCH_MESSAGES,
    payload: { data },
  };
};
export const fetchMessagesSuccess = (payload) => {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload,
  };
};
export const fetchMessagesFailed = (payload) => {
  return {
    type: FETCH_MESSAGES_FAILED,
    payload,
  };
};

export const fetchChatRooms = () => {
  return {
    type: FETCH_CHATROOMS,
  };
};
export const fetchChatRoomsSuccess = (payload) => {
  return {
    type: FETCH_CHATROOMS_SUCCESS,
    payload,
  };
};
export const fetchChatRoomsFailed = (payload) => {
  return {
    type: FETCH_CHATROOMS_FAILED,
    payload,
  };
};

export const createChatRoom = (id) => {
  console.log("id should be", id);
  return {
    type: CREATE_CHATROOM,
    payload: { id },
  };
};
export const createChatRoomSuccess = (payload) => {
  return {
    type: CREATE_CHATROOM_SUCCESS,
    payload,
  };
};
export const createChatRoomFailed = (payload) => {
  return {
    type: CREATE_CHATROOM_FAILED,
    payload,
  };
};
