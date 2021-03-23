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
  NONE,
  SET_CURRENT_CHATID,
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

export const createChatRoom = ({ id, chatRooms }) => {
  console.log("id should be", id);
  console.log("chatRooms is ", chatRooms);
  let returnBoolean = false;
  chatRooms?.data?.getUser?.chatRoomUser?.items?.map((item) => {
    // console.log("check this data", item.chatRoom.chatRoomUsers);
    item.chatRoom.chatRoomUsers.items.map((i) => {
      if (i.user.id === id) {
        console.log("same so returned :)");
        returnBoolean = true;
        return null;
      }
    });

    // id===
  });
  console.log("not returned :(");
  if (returnBoolean) {
    return { type: NONE };
  }
  return {
    type: CREATE_CHATROOM,
    payload: { id, chatRooms },
  };
  return;
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
export const setCurrentChatId = (payload) => {
  console.log("props.chatRoomId", payload);
  return {
    type: SET_CURRENT_CHATID,
    payload,
  };
};
