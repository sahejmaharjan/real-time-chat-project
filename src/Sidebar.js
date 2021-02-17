import React from "react";
import "./Sidebar.css";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import { Avatar } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listUsers } from "./graphql/queries";
import { getUser } from "./queries";
import ChatListItem from "./ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatRooms } from "./store/all/action";

const Sidebar = () => {
  const user = { displayName: "Sahej", uid: "123" };
  const [allUsers, setallUsers] = useState([]);
  // const [chatRooms, setChatRooms] = useState([]);
  const refresh = useSelector((state) => state.allReducer.refresh);
  const userAllData = useSelector((state) => state.allReducer.userData);
  const chatRooms = useSelector((state) => state.allReducer.chatRoomData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        console.log("list Users", usersData);
        setallUsers(usersData.data.listUsers.items);
      } catch (error) {}
    };
    fetchUsers();
  }, []);
  // useEffect(() => {
  //   setChatRooms(
  //     !!userAllData && userAllData.length > 0
  //       ? userAllData?.data.getUser.chatRoomUser.items
  //       : []
  //   );
  //   return () => {};
  // }, [userAllData]);
  useEffect(() => {
    // const fetchChatRooms = async () => {
    //   try {
    //     const userInfo = await Auth.currentAuthenticatedUser();

    //     const userData = await API.graphql(
    //       graphqlOperation(getUser, {
    //         id: userInfo.attributes.sub,
    //       })
    //     );
    //     console.log("object", userData);
    //     setChatRooms(userData.data.getUser.chatRoomUser.items);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    dispatch(fetchChatRooms());
  }, [refresh]);
  console.log("object", chatRooms);
  const handleAddChannel = (e) => {
    e.preventDefault();

    const channelName = prompt("Enter a new channel name");
    // if (channelName) {
    //   setallUsers([
    //     ...allUsers,
    //     {
    //       id: 1,
    //       channel: channelName,
    //     },
    //   ]);
    // }
    // if (channelName) {
    //     db.collection('allUsers').add({
    //         channelName: channelName
    //     })

    // }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Heading</h3>
        {/* <ExpandMoreIcon /> */}
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            {/* <ExpandMoreIcon /> */}
            <h4>All Users</h4>
          </div>

          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {allUsers?.map(({ id, name, imageUri, status }) => (
            <SidebarChannel
              key={id}
              id={id}
              name={name}
              imageUri={imageUri}
              status={status}
            />
          ))}
        </div>
        <div className="sidebar__chatHeader">
          <h4>Chat Users</h4>
        </div>
        <div>
          {!!chatRooms &&
            chatRooms.data?.getUser.chatRoomUser.items?.map((item) => {
              return <ChatListItem chatRoom={item.chatRoom} />;
            })}
        </div>
      </div>

      {/* <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcons"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div> */}
      <div className="sidebar__profile">
        <Avatar src={user.photo} onClick={() => {}} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          {/* <MicIcon />
          <HeadsetIcon />
          <SettingsIcon /> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
