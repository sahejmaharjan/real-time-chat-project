import {
  all,
  call,
  cancelled,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import {
  createChatRoomSuccess,
  createChatRoomFailed,
  fetchUserFailed,
  fetchUserSuccess,
  fetchMessages,
  fetchMessagesSuccess,
  fetchMessagesFailed,
  fetchChatRoomsSuccess,
  fetchChatRoomsFailed,
} from "./action";
import {
  addMeInChat,
  addOtherUserInChat,
  createChatRoomApi,
  currentAuthenticatedUserApi,
  fetchUser,
  createUser,
  fetchChatRoomsApi,
  messagesData,
} from "./api";
import {
  CREATE_CHATROOM,
  FETCH_CHATROOMS,
  FETCH_MESSAGES,
  FETCH_USER,
} from "./constant";

function* handleCreateChatRoom({ payload }) {
  const { id, chatRooms } = payload;
  try {
    console.log("ok id now is ", id);
    chatRooms?.data?.getUser?.chatRoomUser?.items?.map((item) => {
      console.log("check this data", item.chatRoom.chatRoomUsers);
      item.chatRoom.chatRoomUsers.items.map((i) => {
        if (i.user.id === id) {
          console.log("equal id cant save the user again");
          return;
        }
      });
      // id===
    });
    const newChatRoomData = yield call(() => createChatRoomApi({ id }));
    if (!newChatRoomData.data) {
      console.log("failed to create a chat room");
      return;
    }
    console.log("yeta samma huncha", newChatRoomData.data.createChatRoom);
    const newChatRoom = newChatRoomData.data.createChatRoom;
    const addOtherChatRoomData = yield call(() =>
      addOtherUserInChat(newChatRoom, id)
    );
    const userInfo = yield call(() => currentAuthenticatedUserApi());

    const addMeChatRoomData = yield call(() =>
      addMeInChat(newChatRoom, userInfo)
    );
    yield put(createChatRoomSuccess(newChatRoom));
  } catch (error) {
    console.log("error is ", error);
    yield put(createChatRoomFailed(error));
  }
}

function* watchCreateChatRoom() {
  yield takeEvery(CREATE_CHATROOM, handleCreateChatRoom);
}

function* handleFetchUser() {
  try {
    const userInfo = yield call(() => currentAuthenticatedUserApi());
    const userData = yield call(() => fetchUser(userInfo));
    yield put(fetchUserSuccess(userData));
    if (userData.data.getUser) {
      console.log("user already registered in database");
      return;
    }
    const newUser = {
      id: userInfo.attributes.sub,
      name: userInfo.username,
      imageUri:
        "data:image/png;base64,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",
      status: "Hey, I am using Real Time Chat",
    };
    console.log("yeta samma thik chaa");
    yield call(() => createUser(newUser));
  } catch (error) {
    console.log("error is ", error);
    yield put(fetchUserFailed(error));
  }
}

function* watchFetchUser() {
  yield takeEvery(FETCH_USER, handleFetchUser);
}

function* handleFetchMessages({ payload }) {
  const { data } = payload;
  try {
    const messages = yield call(() => messagesData({ data }));
    console.log("messages is ", messages);
    yield put(fetchMessagesSuccess(messages));
  } catch (error) {
    console.log("error is ", error);
    yield put(fetchMessagesFailed(error));
  }
}

function* watchFetchMessages() {
  yield takeEvery(FETCH_MESSAGES, handleFetchMessages);
}

function* handleFetchChatRooms() {
  try {
    const userInfo = yield call(() => currentAuthenticatedUserApi());
    const userData = yield call(() => fetchChatRoomsApi(userInfo));
    console.log("userDastatata is ", userData);
    yield put(fetchChatRoomsSuccess(userData));
  } catch (error) {
    console.log("error is ", error);
    yield put(fetchChatRoomsFailed(error));
  }
}

function* watchFetchChatRooms() {
  yield takeEvery(FETCH_CHATROOMS, handleFetchChatRooms);
}

export default function* rootSaga() {
  yield all([
    fork(watchCreateChatRoom),
    fork(watchFetchUser),
    fork(watchFetchMessages),
    fork(watchFetchChatRooms),
  ]);
}
