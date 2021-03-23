import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "./Message.css";

const Message = ({ timestamp, user, message }) => {
  // const Message = ({ message }) => {

  // console.log(message)
  const userAllData = useSelector((state) => state.allReducer.userData);
  console.log("usersal salkdfjlskdfj ---->", userAllData?.data?.getUser?.id);
  console.log("usersal salkdfjlskdfj test ---->", user?.id);

  return (
    <div
      className={`message ${
        userAllData?.data?.getUser?.id === user?.id ? " own_message" : ""
      }`}
    >
      <Avatar src={user?.imageUri} />
      <div className="message__info">
        <h4>
          {user?.name}
          <span className="message__timestamp">
            {new Date(timestamp).toString()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
