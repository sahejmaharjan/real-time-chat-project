import React, { useEffect, useState } from "react";

import { API, Auth, graphqlOperation } from "aws-amplify";
import "./SidebarChannel.css";
import { useDispatch, useSelector } from "react-redux";
import { messagesByChatRoom } from "./graphql/queries";
import { fetchMessages } from "./store/all/action";

const ChatListItem = (props) => {
  const { chatRoom } = props;
  const [otherUser, setOtherUser] = useState(null);
  const data = useSelector((state) => state.allReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
    };
    getOtherUser();
  }, [chatRoom.chatRoomUsers.items]);

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

  return (
    <div
      className="sidebarChannel"
      onClick={() => {
        console.log("data wanted", data);
        console.log("data sent", props.chatRoom.id);
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
