import React from "react";
import "./ChatHeader.css";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { AmplifySignOut } from "@aws-amplify/ui-react";

const ChatHeader = ({ channelName }) => {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>

      <div className="chatHeader__right">
        {/* <NotificationsIcon />
        <EditLocationRounded />
        <PeopleAltRounded /> */}

        {/* <div className="chatHeader__search">
          <input type="text" placeholder="Search" />
          <SearchRoundedIcon />
        </div> */}
        <div style={{ position: "absolute", right: "20px" }}>
          <AmplifySignOut />
        </div>
        {/* <SendRoundedIcon /> */}
        {/* <HelpRoundedIcon /> */}
      </div>
    </div>
  );
};

export default ChatHeader;
