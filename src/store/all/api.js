import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  createChatRoom,
  createChatRoomUser,
  createUser as createUserFunction,
} from "../../graphql/mutations";
import { messagesByChatRoom } from "../../graphql/queries";
import { getUser } from "../../queries";

export const createChatRoomApi = (id) => {
  return API.graphql(
    graphqlOperation(createChatRoom, {
      input: {
        lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16",
      },
    })
  );
};

export const addOtherUserInChat = (newChatRoom, id) => {
  // console.log("----------------->", newChatRoom.id);
  // console.log("id is ----------------->");
  return API.graphql(
    graphqlOperation(createChatRoomUser, {
      input: {
        userID: id,
        chatRoomID: newChatRoom.id,
      },
    })
  );
};

export const currentAuthenticatedUserApi = () => {
  return Auth.currentAuthenticatedUser();
};

export const addMeInChat = (newChatRoom, userInfo) => {
  return API.graphql(
    graphqlOperation(createChatRoomUser, {
      input: {
        userID: userInfo.attributes.sub,
        chatRoomID: newChatRoom.id,
      },
    })
  );
};

export const fetchUser = (userInfo) => {
  return API.graphql(
    graphqlOperation(getUser, { id: userInfo.attributes.sub })
  );
};
export const createUser = (newUser) => {
  console.log("new User is ", newUser);
  return API.graphql(graphqlOperation(createUserFunction, { input: newUser }));
};

export const messagesData = ({ data }) => {
  console.log("data is ", data);
  return API.graphql(
    graphqlOperation(messagesByChatRoom, {
      chatRoomID: data.data,
      sortDirection: "ASC",
    })
  );
};

export const fetchChatRoomsApi = (userInfo) => {
  return API.graphql(
    graphqlOperation(getUser, {
      id: userInfo.attributes.sub,
    })
  );
};
