import { API, graphqlOperation, Auth } from "aws-amplify";
import React from "react";
import { useDispatch } from "react-redux";
import "./SidebarChannel.css";
import { createChatRoom } from "./store/all/action";

const SidebarChannel = ({ id, name, imageUri }) => {
  // console.log("id is ", id);
  const dispatch = useDispatch();
  return (
    <div
      className="sidebarChannel"
      onClick={() => {
        dispatch(createChatRoom({ id: id }));
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
