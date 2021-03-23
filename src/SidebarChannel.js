import { API, graphqlOperation, Auth } from "aws-amplify";
import React from "react";
import { useDispatch } from "react-redux";
import "./SidebarChannel.css";
import { createChatRoom } from "./store/all/action";

const SidebarChannel = ({ id, name, imageUri, chatRooms }) => {
  console.log("id is ", chatRooms);
  const dispatch = useDispatch();
  return (
    <div
      className="sidebarChannel"
      onClick={() => {
        dispatch(createChatRoom({ id: id, chatRooms: chatRooms }));
      }}
    >
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {name}
      </h4>
    </div>
  );
};

export default SidebarChannel;
