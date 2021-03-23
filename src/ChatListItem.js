import React, { useEffect, useState } from "react";

import { API, Auth, graphqlOperation } from "aws-amplify";
import "./SidebarChannel.css";
import { useDispatch, useSelector } from "react-redux";
import { messagesByChatRoom } from "./graphql/queries";
import { fetchMessages, setCurrentChatId } from "./store/all/action";

const ChatListItem = (props) => {
  const { chatRoom } = props;
  const [otherUser, setOtherUser] = useState(null);
  const data = useSelector((state) => state.allReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (chatRoom?.chatRoomUsers?.items.length > 2) {
        let nameOfChat = "";
        chatRoom.chatRoomUsers.items.map(
          (user) => (nameOfChat = nameOfChat.concat(user.user))
        );
        setOtherUser(nameOfChat);
      } else if (
        chatRoom?.chatRoomUsers?.items[0]?.user?.id ===
        userInfo?.attributes?.sub
      ) {
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
    };
    getOtherUser();
  }, [chatRoom?.chatRoomUsers?.items]);

  const onClick = () => {
    // navigation.navigate('ChatRoom', {
    //   id: chatRoom.id,
    //   name: otherUser.name,
    // })
  };

  if (!otherUser) {
    console.log("no otherUser");
    return null;
  }
  console.log("jslkdfjlskdfjs------->", chatRoom);
  return (
    <div
      className="sidebarChannel"
      onClick={() => {
        console.log("data wanted", props);
        console.log("data sent", props.chatRoom.id);
        dispatch(
          setCurrentChatId({
            currentChatId: props.chatRoom.id,
            otherUserName: otherUser.name,
          })
        );
        dispatch(fetchMessages({ data: props.chatRoom.id }));
      }}
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {otherUser.name}
      </h4>
    </div>
  );
};

export default ChatListItem;
